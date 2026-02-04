

namespace backend.Models;

public class UseHttpsRedirection
{
   public int Id {get; set;}
   public string Username {get; set;} = string.Empty;
   public string PasswordHash {get; set;} = string.Empty;
   public UserRole Role {get; set;} = UserRole.User;
   public DateTime CreatedAt {get; set;}

   public List<Post> Posts {get; set;} = new();
}

public enum UserRole
{
   User = 0,
   Moderator = 1,
   Admin = 2
}
