using backend.Models;
using Microsoft.Extensions.Caching.Memory;

namespace backend.Services;


public class BoardCacheService
{

   private readonly IMemoryCache _cache;
   public BoardCacheService(IMemoryCache cache)
   {
      _cache = cache;
   }

   public void SetBoardCache(string boardName, List<Topic> topics)
   {
     _cache.Set($"board_{boardName}_topics", topics,  TimeSpan.FromMinutes(5));
   }
   public List<Topic>? GetBoardCache(string boardName)
   {
      if(_cache.TryGetValue($"board_{boardName}_topics", out List<Topic>? topics))
      {
         return topics;
      }

      return null;
   }
   public void InvalidateBoardCache(string boardName)
   {
     _cache.Remove($"board_{boardName}_topics");
   }
}
