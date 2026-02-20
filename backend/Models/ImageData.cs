namespace backend.Models;

public class ImageData
{
   public int Id {get; set;}
   public string ImagePath {get; set;} = string.Empty;
   public string ThumbNailPath {get; set;} = string.Empty;
   public int ImageWidth {get; set;}
   public int ImageHeight {get; set;}
   public long ImageSize {get; set;}
   public string ImageFormat {get; set;} = string.Empty;
   public int PostId {get; set;}
   public Post Post {get; set;} = null!;
}
