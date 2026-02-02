using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Topic
{
   public int Id {get; set;}
   [MaxLength(4)]
   public string BoardName {get; set;} = string.Empty;
   public string Subject {get; set;} = string.Empty;
   public bool isLocked {get; set;} = false;
   public bool isPinned {get; set;} = false;
   public DateTime CreatedAt {get; set;}
   public DateTime LastBumpedAt {get; set;}

   public Board Board {get; set;} = null!;
   public List<Post> Posts {get; set;} = new();

}
