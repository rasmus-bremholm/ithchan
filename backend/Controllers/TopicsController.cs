using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Reflection;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers;

[ApiController]
[Route("api/boards/{boardName}/topics")]
public class TopicsController : ControllerBase
{
   private readonly ApplicationDbContext _context;

   public TopicsController(ApplicationDbContext context)
   {
      _context = context;
   }

   // GET all topics on a board
   [HttpGet]
   public async Task<ActionResult<List<Topic>>> GetTopicsForBoard(string boardName)
   {
      var topics = await _context.Topics
      .Where(t => t.BoardName == boardName)
      .ToListAsync();

      return Ok(topics);
   }
   // CREATE new topic
   [HttpPost]
public async Task<ActionResult<Topic>> CreateTopic(
    [FromRoute] string boardName,
    [FromBody] CreateTopicRequest request)  // Use DTO instead of Topic
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

    var firstPost = new Post
    {
         TopicId = topic.Id,
         Name = request.Name,
         Content = request.Content,
         ImagePath = request.ImagePath,
         CreatedAt = DateTime.UtcNow
      };

      topic.Posts.Add(firstPost);
      await _context.SaveChangesAsync();

      topic.Posts = new List<Post>{firstPost};

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
   public async Task<ActionResult<Post>> CreateReply([FromRoute] string boardName, [FromRoute] int id, [FromBody] CreatePostRequest request)
   {
      var topic = await _context.Topics.FindAsync(id);
      if(topic == null || topic.BoardName != boardName)
      {
         return NotFound();
      }

      var post = new Post
      {
         TopicId = id,
         Name = request.Name,
         Content = request.Content,
         ImagePath = request.ImagePath,
         CreatedAt = DateTime.UtcNow
      };

      _context.Posts.Add(post);
      await _context.SaveChangesAsync();

      return Ok(post);
   }
}

// Add this at the bottom of TopicsController.cs, outside the class
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
    public string? ImagePath {get; set;}
}

public class CreatePostRequest
{
   [MaxLength(50, ErrorMessage = "Name can't be more than 50 chars")]
   public string Name {get; set;} = "Anonymous";
   [Required(ErrorMessage = "Content is required")]
   [MaxLength(2000, ErrorMessage = "Write shorter posts")]
   [MinLength(1, ErrorMessage = "Content can't be empty")]
   public string Content {get; set;} = string.Empty;
   public string? ImagePath {get; set;}
}
