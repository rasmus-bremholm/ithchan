namespace backend.Models;

public class Report
{
   public int Id {get; set;}
   // Im going to have to guard in the Controller in the case both of these end up null
   public int? TopicId {get; set;}
   public Topic? Topic {get; set;}
   public int? PostId {get; set;}
   public Post? Post {get; set;}
   public string Reason {get; set;} = string.Empty;
   public DateTime CreatedAt {get; set;}
   public DateTime? ResolvedAt {get; set;}
   public bool Resolved {get; set;}
}
