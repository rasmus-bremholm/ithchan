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
      // Sets the uploadspath to be in the /uploads dir
      _uploadsPath = Path.Combine(env.WebRootPath, "uploads");
      _thumbnailsPath = Path.Combine(env.WebRootPath, "uploads", "thumbnails");

      Directory.CreateDirectory(_uploadsPath);
      Directory.CreateDirectory(_thumbnailsPath);
   }

   public async Task<(string imagePath, string thumnailPath)> SaveImagesAsync(IFormFile file)
   {
      // Basically generate a filename and file ending from the uploaded file.
      var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
      var fullPath = Path.Combine(_uploadsPath, fileName);
      var thumbnailFileName = $"thumb_{fileName}";
      var thumbnailFullPath = Path.Combine(_thumbnailsPath, thumbnailFileName);


      // Save Image to Disk
      using (var stream = new FileStream(fullPath, FileMode.Create))
      {
         await file.CopyToAsync(stream);
      }

      //Generate thumbnail
      using (var image = await Image.LoadAsync(fullPath))
      {
         image.Mutate(x => x.Resize(new ResizeOptions
         {
            Size = new Size(250, 250),
            Mode = ResizeMode.Max
         }));

         await image.SaveAsync(thumbnailFullPath);
      }

      return ($"uploads/{fileName}", $"uploads/thumbnails/{thumbnailFileName}");
   }
}
