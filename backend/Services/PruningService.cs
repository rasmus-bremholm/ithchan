using System.Threading.Channels;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace backend.Services;

public class PruningService : BackgroundService
{
   // Global Vars
   private readonly Channel<string> _channel;
   private readonly IServiceScopeFactory _scopeFactory;

   private const int MaxTopicsPerBoard = 200;

   //Constructor
   public PruningService(Channel<string> channel, IServiceScopeFactory scopeFactory)
   {
      _channel = channel;
      _scopeFactory = scopeFactory;

   }

   protected override async Task ExecuteAsync(CancellationToken stoppingToken)
   {
      while(!stoppingToken.IsCancellationRequested)
      {
         var boardName = await _channel.Reader.ReadAsync(stoppingToken);
         await using var scope = _scopeFactory.CreateAsyncScope();
         var fileUploadService = scope.ServiceProvider.GetRequiredService<FileUploadService>();
         var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

         var topicCountOnBoard = await context.Topics
         .Where(t => t.BoardName == boardName)
         .CountAsync();

         if(topicCountOnBoard >= MaxTopicsPerBoard)
         {
            var oldestTopic = await context.Topics
            .Where(t => t.BoardName == boardName)
               .Include(t => t.Posts)
                  .ThenInclude(p => p.ImageData)
            .OrderBy(t => t.LastBumpedAt)
            .FirstOrDefaultAsync();

            if(oldestTopic != null)
            {
               foreach(var post in oldestTopic.Posts)
               {
                 if(post.ImageData != null)
                  {
                     await fileUploadService.DeleteImageAsync(post.ImageData);
                  }
               }
               context.Topics.Remove(oldestTopic);
               await context.SaveChangesAsync();
            }
         }
      }
   }
}
