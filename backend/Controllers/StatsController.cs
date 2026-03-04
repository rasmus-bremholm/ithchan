using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Services;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace backend.Controllers;

[ApiController]
[Route("api/stats")]

public class StatsController: ControllerBase
{
   private readonly ApplicationDbContext _context;

   public StatsController(ApplicationDbContext context)
   {
      _context = context;
   }


   [HttpGet]
   public async Task<ActionResult<StatsResponse>> GetStats()
   {
      var postCount = await _context.Posts
      .CountAsync();

      var stats = new StatsResponse();



      var popularTopics = await _context.Topics
      .OrderByDescending(t => t.Posts.Count)
      .ThenByDescending(t => t.LastBumpedAt)
      .Take(10)
      .ToListAsync();

      var topicIds = popularTopics.Select(t => t.Id).ToList();

      var posts = await _context.Posts
      .Where(p => topicIds.Contains(p.TopicId))
      .Include(p => p.ImageData)
      .ToListAsync();

      foreach(var topic in popularTopics)
      {
         topic.Posts = posts.Where(p => p.TopicId == topic.Id)
         .OrderBy(t => t.CreatedAt)
         .Take(1)
         .ToList();
      }


      stats.TotalPosts = postCount;
      stats.PopularTopics = popularTopics;
      return stats;
   }
}

public class StatsResponse
{
   public List<Topic> PopularTopics {get; set;} = new();

   public int TotalPosts {get; set;}
}
