using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Reflection;

namespace backend.Controllers;

[ApiController]
[Route("api/boards{boardName}/topics")]
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
   public async Task<ActionResult<Topic>> CreateTopic(string boardName, Topic topic)
   {
      var board = await _context.Boards.FindAsync(boardName);
      if(board == null)
      {
         return NotFound(new {error = $"Board '{boardName}' not found"});
      }

      topic.BoardName = boardName;
      topic.CreatedAt = DateTime.UtcNow;
      topic.LastBumpedAt = DateTime.UtcNow;

      _context.Topics.Add(topic);
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
   public async Task<ActionResult<Topic>> CreateReply(string boardName, int id, Post post)
   {
      var topic = await _context.Topics.FindAsync(id);
      if(topic == null || topic.BoardName != boardName)
      {
         return NotFound();
      }

      post.TopicId = id;
      post.CreatedAt = DateTime.UtcNow;

      _context.Posts.Add(post);
      await _context.SaveChangesAsync();

      return Ok(post);
   }
}
