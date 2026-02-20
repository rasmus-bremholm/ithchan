using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[ApiController]
[Route("api/boards/{boardName}/topics")]
public class TopicsController : ControllerBase
{
   private readonly ApplicationDbContext _context;
   private readonly FileUploadService _fileUploadService;

   private const long MaxFileSizeBytes = 3 * 1024 * 1024;

   public TopicsController(ApplicationDbContext context, FileUploadService fileUploadService)
   {
      _context = context;
      _fileUploadService = fileUploadService;
   }

   // GET all topics on a board
   [HttpGet]
   public async Task<ActionResult<List<Topic>>> GetTopicsForBoard(string boardName)
   {
      var topics = await _context.Topics
      .Where(t => t.BoardName == boardName)
      .Include(t => t.Posts.OrderBy(p => p.CreatedAt).Take(6))
      .ToListAsync();

      return Ok(topics);
   }
   // CREATE new topic
   [HttpPost]
public async Task<ActionResult<Topic>> CreateTopic(
    [FromRoute] string boardName,
    [FromForm] CreateTopicRequest request)  // Use DTO instead of Topic
{
    var board = await _context.Boards.FindAsync(boardName);
    if(board == null)
    {
        return NotFound(new {error = $"Board '{boardName}' not found"});
    }

    // Create the Topic from the DTO
    var topic = new Topic
    {
        BoardName = boardName,
        Subject = request.Subject,
        IsLocked = request.IsLocked,
        IsPinned = request.IsPinned,
        CreatedAt = DateTime.UtcNow,
        LastBumpedAt = DateTime.UtcNow
    };

    _context.Topics.Add(topic);
    await _context.SaveChangesAsync();

    ImageData? image = null;

    if(request.Image != null)
      {
         if(request.Image.Length > MaxFileSizeBytes)
         {
            return BadRequest(new {error = "Filesize is too large, 3Mb maximum"});
         }
         image = await _fileUploadService.SaveImageAsync(request.Image);
      }

    var firstPost = new Post
    {
         TopicId = topic.Id,
         Name = request.Name,
         Content = request.Content,
         ImageData = image,
         CreatedAt = DateTime.UtcNow
      };

      _context.Posts.Add(firstPost);
      topic.Posts = new List<Post>{firstPost};
      await _context.SaveChangesAsync();

    return Ok(topic);
}

   // Get a single topic, WITH all its posts
   [HttpGet("{id}")]
   public async Task<ActionResult<Topic>> GetTopic(string boardName, int id)
   {
      var topic = await _context.Topics
      .Include(t => t.Posts)
      .FirstOrDefaultAsync(t => t.Id == id && t.BoardName == boardName);

      if(topic == null)
      {
         return NotFound();
      }
      return Ok(topic);
   }

   // Post a reply to a topic
   [HttpPost("{id}/reply")]
   public async Task<ActionResult<Post>> CreateReply([FromRoute] string boardName, [FromRoute] int id, [FromForm] CreatePostRequest request)
   {
      var topic = await _context.Topics.FindAsync(id);
      if(topic == null || topic.BoardName != boardName)
      {
         return NotFound(new {error = "Thread not found"});
      }

      if(topic.IsLocked)
      {
         return BadRequest(new {error= "Cannot reply to a locked thread"});
      }

      //Thread bumping
      topic.LastBumpedAt = DateTime.UtcNow;

      ImageData? image = null;

    if(request.Image != null)
      {
         if(request.Image.Length > MaxFileSizeBytes)
         {
            return BadRequest(new {error = "Filesize is too large, 3Mb maximum"});
         }
         image = await _fileUploadService.SaveImageAsync(request.Image);
      }

      var post = new Post
      {
         TopicId = id,
         Name = request.Name,
         Content = request.Content,
         ImageData = image,
         CreatedAt = DateTime.UtcNow
      };

      _context.Posts.Add(post);
      await _context.SaveChangesAsync();

      return Ok(post);
   }

   //Honestly just copy this method for the pinned post.
   // Delete POST
   [HttpDelete("{topicId}/posts/{postId}")]
   [Authorize(Roles = "Moderator,Admin")]
   public async Task<ActionResult> DeletePost(
      [FromRoute] string boardName,
      [FromRoute] int topicId,
      [FromRoute] int postId)
   {
      var post = await _context.Posts.FindAsync(postId);

      if(post == null)
      {
         return NotFound(new {error="Post not found"});
      }

      var topic = await _context.Topics.FindAsync(topicId);
      if(topic == null || topic.BoardName != boardName || post.TopicId != topicId)
      {
         return NotFound(new {error="Post not found in this topic"});
      }

      post.IsDeleted = true;
      await _context.SaveChangesAsync();

      return Ok(new {message = "Post deleted"});
   }
   // Delete TOPIC
   [HttpDelete("{id}")]
   [Authorize(Roles = "Admin")]
   public async Task<ActionResult> DeleteTopic(
      [FromRoute] string boardName,
      [FromRoute] int id)
   {
      var topic = await _context.Topics.FindAsync(id);

      if(topic == null || topic.BoardName != boardName)
      {
         return NotFound(new{error= "Topic cant be found"});
      }

      _context.Topics.Remove(topic);
      await _context.SaveChangesAsync();

      return Ok(new {message = "Topic Deleted"});
   }
   // LOCK AND PIN
   [HttpPut("{id}/lock")]
   [Authorize(Roles = "Admin,Moderator")]
   public async Task<ActionResult> LockTopic(
      [FromRoute] string boardName,
      [FromRoute] int id,
      [FromBody] LockTopicRequest request)
   {
      var topic = await _context.Topics.FindAsync(id);

      if(topic == null || topic.BoardName != boardName)
      {
         return NotFound(new{error="Topic not found"});
      }

      topic.IsLocked = request.IsLocked;
      await _context.SaveChangesAsync();

      return Ok(new{message = topic.IsLocked ? "Topic Locked" : "Topic unlocked"});
   }
   [HttpPut("{id}/pin")]
   [Authorize(Roles = "Admin,Moderator")]
   public async Task<ActionResult> PinTopic(
      [FromRoute] string boardName,
      [FromRoute] int id,
      [FromBody] PinTopicRequest request)
   {
      var topic = await _context.Topics.FindAsync(id);

      if(topic == null || topic.BoardName != boardName)
      {
         return NotFound(new{error="Topic not found"});
      }

      topic.IsPinned = request.IsPinned;
      await _context.SaveChangesAsync();

      return Ok(new{message = topic.IsPinned ? "Topic Pinned" : "Topic Unpinned"});
   }
}

// These are like typescript types. Like prop types.
public class CreateTopicRequest
{
   [Required(ErrorMessage = "Subject is required")]
   [MaxLength(200, ErrorMessage = "Subject cant be longer than 200 chars")]
   [MinLength(1, ErrorMessage = "Subject can't be empty")]

    public string Subject { get; set; } = string.Empty;
    public bool IsLocked { get; set; } = false;
    public bool IsPinned { get; set; } = false;

    // OP post fields
    [MaxLength(50, ErrorMessage = "Name can't be more than 50 chars")]
    public string Name {get; set;} = "Anonymous";
    [Required(ErrorMessage = "Content is required")]
    [MaxLength(2000, ErrorMessage = "Write shorter posts")]
    [MinLength(1, ErrorMessage = "Content can't be empty")]
    public string Content {get; set;} = string.Empty;
    public IFormFile? Image {get; set;}
}

public class CreatePostRequest
{
   [MaxLength(50, ErrorMessage = "Name can't be more than 50 chars")]
   public string Name {get; set;} = "Anonymous";
   [Required(ErrorMessage = "Content is required")]
   [MaxLength(2000, ErrorMessage = "Write shorter posts")]
   [MinLength(1, ErrorMessage = "Content can't be empty")]
   public string Content {get; set;} = string.Empty;
   public IFormFile? Image {get; set;}
}

public class LockTopicRequest
{
   public bool IsLocked {get; set;}
}

public class PinTopicRequest
{
   public bool IsPinned {get; set;}
}
