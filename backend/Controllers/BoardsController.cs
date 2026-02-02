using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Reflection;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BoardsController: ControllerBase
{
   private readonly ApplicationDbContext _context;

   public BoardsController(ApplicationDbContext context)
   {
      _context = context;
   }

   [HttpGet]
   public async Task<ActionResult<List<Board>>> GetAllBoards()
   {
      var boards = await _context.Boards.ToListAsync();
      return Ok(boards);
   }

   [HttpGet("{name}")]
   public async Task<ActionResult<Board>> GetBoard(string name)
   {
      var board = await _context.Boards.FindAsync(name);

      if(board == null)
      {
         return NotFound();
      }

      return Ok(board);
   }

   [HttpPost]
   public async Task<ActionResult<Board>> CreateBoard(Board board)
   {
      _context.Boards.Add(board);
      await _context.SaveChangesAsync();
      return Ok();
   }
}
