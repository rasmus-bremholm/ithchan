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

// Topics
   [HttpGet]
   public async Task<ActionResult<List<Topic>>> GetTopicsForBoard(string boardName)
   {
      var topics = await _context.Topics
      .Where(t => t.BoardName == boardName)
      .ToListAsync();

      return Ok(topics);
   }

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

   // Posts
   [HttpGet("{id}")]
   
}
