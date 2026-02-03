using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
// I really need to comment more to remember everything.
namespace backend.Services;

public class FileUploadService
{
   // Private Vars
   private readonly string _uploadsPath;
   private readonly string _thumbnailsPath;

   //Constructor
   public FileUploadService(IWebHostEnvironment env)
   {

   }
}
