using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography.X509Certificates;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers;

[ApiController]
[Route("api/reports")]
// I stopped to think about this...and I think i have questions. So on the endpoint route parts im very unsure.
public class ReportsController: ControllerBase
{
   private readonly ApplicationDbContext _context;

   public ReportsController(ApplicationDbContext context)
   {
      _context = context;
   }

    [HttpPost]
   public async Task<ActionResult<Report>> CreateReport([FromBody] CreateReportRequest request)
   {
      if(request.TopicId == null && request.PostId == null)
      {
         return BadRequest(new {error = "Must provide either a TopicId or PostId"});
      }

      var report = new Report
      {
         TopicId = request.TopicId,
         PostId = request.PostId,
         Reason = request.Reason,
         CreatedAt = DateTime.UtcNow,
         Resolved = false
      };

      _context.Reports.Add(report);
      await _context.SaveChangesAsync();

      return Ok(report);
}

   [HttpGet]
   [Authorize(Roles = "Moderator, Admin")]
      public async Task<ActionResult<List<Report>>> GetReports()
      {
         return Ok();
      }

   [HttpPut("{id}/resolve")]
   [Authorize(Roles = "Moderator, Admin")]
      public async Task<ActionResult<Report>> ResolveReport(int id)
   {
      return Ok();
   }
}

public class CreateReportRequest
{
   [MaxLength(50, ErrorMessage = "Reason can't be more than 50 chars")]
   [Required(ErrorMessage = "Reason for report is required")]
   [MinLength(1, ErrorMessage = "Reason too short")]
   public string Reason {get; set;} = string.Empty;
   public int? TopicId { get; set; }
   public int? PostId { get; set; }
}
