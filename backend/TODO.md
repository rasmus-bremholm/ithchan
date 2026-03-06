# ithchan Backend TODO

## In Progress

- [x] Add reply count to /stats. For catalog cards to render.

- [ ] Change SQlite to PostgreSQL
      Swap out SQLite for PostgreSQL. EF Core abstracts most of the difference so minimal code changes are needed - mainly swapping the provider package and updating the connection string. Gives a solid foundation for everything else on this list.

## Backlog

### Features

- [ ] Background Jobs for Thread Pruning
      Currently pruning runs synchronously inside `CreateTopic` on every request. Move this to a background job using ASP.NET Core's built in `IHostedService`. Cleaner separation of concerns and better performance under load.
- [ ] Response Caching
      Board pages and the stats endpoint are perfect candidates - they don't need to be fresh on every single request. ASP.NET Core has built in response caching middleware worth exploring. Similar concept to Next.js caching but on the server side.
