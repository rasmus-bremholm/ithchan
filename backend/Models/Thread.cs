namespace backend.Models;

public class Thread
{
   public int Id {get; set;}
   public int BoardId {get; set;}
   public string Subject {get; set;} = string.Empty;
   public bool isLocked {get; set;} = false;
   public bool isPinned {get; set;} = false;
   public DateTime CreatedAt {get; set;}
   public DateTime LastBumpedAt {get; set;}

   public Board Board {get; set;} = null!;
   public List<Post> Posts {get; set;} = new();

}
