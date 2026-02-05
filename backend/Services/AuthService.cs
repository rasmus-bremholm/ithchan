using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class AuthService
{
   // Reference to Database
   private readonly ApplicationDbContext _context;
   // Used for JWT secret reading
   private readonly IConfiguration _configuration;

   //Constructor
   public AuthService(ApplicationDbContext context, IConfiguration configuration)
   {
      _context=context;
      _configuration=configuration;
   }

   // Register Method MAY return a User, but no need to.
   public async Task<User?> RegisterAsync(string username, string password, UserRole role)
   {
      if(await _context.Users.AnyAsync(u => u.Username == username))
      {
         return null;
      }

      string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
      var user = new User
      {
        Username = username,
        PasswordHash = passwordHash,
        Role = role,
        CreatedAt = DateTime.UtcNow
      };

      _context.Users.Add(user);
      await _context.SaveChangesAsync();

      return user;
   }

   // Login Method
   public async Task<string?> LoginAsync(string username, string password)
   {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
      if(user == null)
      {
         return null;
      }

      if(!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
      {
         return null;
      }
      return GenerateJwtToken(user);
   }

   private string GenerateJwtToken(User user)
   {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? throw new Exception("JWT key not configed"));

      var tokenDescriptor = new SecurityTokenDescriptor
      {
         Subject = new ClaimsIdentity(new[]
         {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
         }),
         Expires = DateTime.UtcNow.AddDays(7),
         Issuer = _configuration["Jwt:Issuer"],
         Audience = _configuration["Jwt:Audience"],
         SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
   }
}
