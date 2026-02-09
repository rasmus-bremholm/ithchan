# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ithchan is an imageboard application (like 4chan) with a .NET 9 API backend and a Next.js 15 frontend. The data model is: **Boards** contain **Topics**, and Topics contain **Posts**. Posts can have image attachments with auto-generated thumbnails.

## Architecture

**Monorepo with two independent apps:**

- `backend/` — .NET 9 Web API with Entity Framework Core + SQLite (`Data/ithchan.db`)
- `frontend/` — Next.js 15 (App Router, Turbopack, TypeScript, MUI 7)

The frontend calls the backend REST API via server actions in `frontend/app/actions/`. These use `NEXT_PUBLIC_BASE_URL` (set in `frontend/.env.local`) to reach the API at routes like `/api/boards` and `/api/boards/{boardName}/topics`.

**Backend structure:**
- `Controllers/` — API endpoints: `BoardsController` (`/api/boards`), `TopicsController` (`/api/boards/{boardName}/topics`), `AuthController` (`/api/auth`)
- `Models/` — EF Core entities: Board (PK: string Name, max 4 chars), Topic, Post, User (with UserRole enum)
- `Services/` — AuthService (JWT + BCrypt), FileUploadService (ImageSharp thumbnails to `wwwroot/uploads/`)
- `Data/` — ApplicationDbContext, SQLite database file
- Request DTOs are defined inline at the bottom of controller files (e.g., `CreateTopicRequest`, `CreatePostRequest`)

**Frontend structure:**
- `app/page.tsx` — Homepage listing all boards
- `app/[board]/page.tsx` — Board page showing topics
- `app/[board]/[topic]/page.tsx` — Individual topic with posts (stub)
- `app/[board]/components/` — TopicList (server component), TopicCard, PostCard
- `app/actions/` — Server actions wrapping API fetch calls with revalidation
- `app/types/` — TypeScript interfaces matching backend models
- `app/utils/` — MUI theme system with 4 switchable variants (yotsuba, yotsuba_b, tomorrow, dracula) via React Context + localStorage
- `app/components/StyledLink.tsx` — Combined Next.js Link + MUI Link component

**Key patterns:**
- Server Components by default; `"use client"` only for theme system
- Path alias `@/*` maps to `frontend/*` (so `@/app/types/topics` works)
- Topic creation sends both topic metadata and first post as a single `[FromForm]` multipart request
- Image uploads stored at `wwwroot/uploads/`, thumbnails at `wwwroot/uploads/thumbnails/`
- Auth: JWT Bearer tokens, role-based authorization (User/Moderator/Admin). Registration is admin-only.
- Backend uses `ReferenceHandler.IgnoreCycles` for JSON serialization
- `next.config.ts` allows remote images from `localhost:5041` for the backend uploads

## Development Commands

### Frontend (from `frontend/`)
```bash
npm run dev          # Dev server with Turbopack (port 3000)
npm run build        # Production build with Turbopack
npm run lint         # ESLint
```

### Backend (from `backend/`)
```bash
dotnet run                    # Run API (default ports from launchSettings)
dotnet build                  # Build
dotnet ef migrations add <Name>   # Create new EF migration
dotnet ef database update         # Apply migrations
```

### Docker (backend only)
```bash
docker build -t ithchan-backend ./backend
# Exposes on port 5000
```

## Environment

Frontend requires `frontend/.env.local` with:
- `NEXT_PUBLIC_BASE_URL` — Backend API base URL (e.g., `http://localhost:5041/api`)
- `NEXT_PUBLIC_BACKEND_URL` — Backend root URL for image paths (e.g., `http://localhost:5041`)

Backend JWT config is in `backend/appsettings.json` under `Jwt:Key`, `Jwt:Issuer`, `Jwt:Audience`.
