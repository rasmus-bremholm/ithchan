using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Board
{
   [Key]
   [MaxLength(4)]
   public string Name {get; set;} = string.Empty;
   public string Title {get; set;} = string.Empty;
   public string Description {get; set;} = string.Empty;

   public List<Topic> Topics {get; set;} = new();
}
