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

   // Register Method MAY take in a User, but no need to.
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
}
