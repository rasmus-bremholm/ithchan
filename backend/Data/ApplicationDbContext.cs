using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ApplicationDbContext : DbContext
{
   public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
      : base(options)
   {

   }
   public DbSet<Board> Boards {get; set;}
   public DbSet<Topic> Topics {get; set;}
   public DbSet<Post> Posts {get; set;}
   public DbSet<User> Users {get; set;}
}
