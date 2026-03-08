using System.Threading.Channels;
using backend.Models;
using Microsoft.Extensions.Hosting;

namespace backend.Services;

public class PruningService : BackgroundService
{
   // Global Vars
   public Channel<Topic> PruningChannel;

   //Constructor
   public PruningService()
   {


   }

   protected override Task ExecuteAsync(CancellationToken stoppingToken)
   {
      throw new NotImplementedException();
   }
}
