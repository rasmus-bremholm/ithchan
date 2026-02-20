using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Post
{
   public int Id {get; set;}
   public int TopicId {get; set;}
   public int? UserId {get; set;}
   public string Name {get; set;} = "Anonymous";
   public string Content {get; set;} = string.Empty;
   public int? ImageDataId {get;set;}
   [ForeignKey("ImageDataId")]
   public ImageData? ImageData {get; set;}
   public bool IsDeleted {get; set;} = false;
   public DateTime CreatedAt {get; set;}
   public Topic Topic {get; set;} = null!;
   public User? User {get; set;}
}
