using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;
using System.ComponentModel.DataAnnotations;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
   private readonly AuthService _authService;

   public AuthController(AuthService authService)
   {
      _authService = authService;
   }

   [HttpPost("register")]
   public async Task<ActionResult> Register(RegisterRequest request)
   {
      var user = await _authService.RegisterAsync(request.Username, request.Password, request.Role);

      if(user == null)
      {
         return BadRequest(new {error = "User already exists"});
      }
      return Ok(new{message = "User created", username= user.Username, role = user.Role});
   }

   [HttpPost("login")]
   public async Task<ActionResult> Login(LoginRequest request)
   {
      var token = await _authService.LoginAsync(request.Username, request.Password);

      if(token == null)
      {
         return Unauthorized(new{error = "Invalid username or password"});
      }
      return Ok(new {token});
   }

}

public class RegisterRequest
{
   [Required]
   public string Username {get; set;} = string.Empty;

   [Required]
   [MinLength(6)]
   public string Password {get;set;} = string.Empty;

   [Required]
   public UserRole Role {get; set;}
}

public class LoginRequest
{
   [Required]
   public string Username {get; set;} = string.Empty;

   [Required]
   public string Password {get; set;} = string.Empty;
}
