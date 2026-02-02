namespace backend.Models;

public class Post
{
   public int Id {get; set;}
   public int ThreadId {get; set;}
   public string Name {get; set;} = "Anonymous";
   public string Content {get; set;} = string.Empty;
   public string? ImagePath {get;set;}
   public string? ThumbnailPath {get; set;}
   public bool IsDeleted {get; set;} = false;
   public DateTime CreatedAt {get; set;}
   public Thread Thread {get; set;} = null!;
}
