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
}
