# ⛳ Golf Game Companion App

A web based companion app for golfers to play and track a variety of golf game formats in real time while out on the course. Supports casual game formats as well as tournament style play.

> **Note:** This project is currently under active development. Features and game formats are being added incrementally.

---

## Features

- Play and track a variety of golf game formats in real time
- Tournament style play support
- More game formats coming soon (Chicago, Best 9, and others)

---

## Tech Stack

- **Frontend:** Next.js (javascript)
- **Database:** Supabase

---

## Getting Started

### Prerequisites

- Node.js installed
- A Supabase account and project set up

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AjayPaterson/golf-app.git
   cd golf-app
```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env.local` file in the root of the project:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Roadmap

- [ ] Additional game formats (Chicago, Best 9, etc.)
- [ ] Individual and group scoring history
- [ ] Leaderboards for tournament play
- [ ] User accounts and profiles

---

## Contributing

This is a personal project and is not currently open to outside contributions
