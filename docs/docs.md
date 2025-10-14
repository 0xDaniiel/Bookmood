Nice — here’s a clear, step-by-step features breakdown for **BookMood**, including the **swipe-card** UX you want. I’ll organize it by priority (MVP → enhancements → long-term), then dive into how the swipe card works, what UI pieces you need, and the minimal API/flow (no database).

# 1) Feature list — prioritized

## MVP (build this first)

1. **Mood Input (text)** — single input box where users type how they feel.
2. **Keyword mood detection** — simple keyword → mood mapping (no AI).
3. **Book fetcher** — call Google Books / Open Library to return matching books.
4. **Results list / grid** — show cover, title, author, short blurb, and external link.
5. **Swipe Cards UX** — a deck of mood cards users can swipe to find the mood that fits them.
6. **Client-side state only** — everything ephemeral; no DB. Use local state or localStorage for saved items.
7. **Responsive UI + basic accessibility** — keyboard support for swiping and readable text.

## Important UX additions (still early)

8. **Manual mood selection** — choose mood from a small list (fallback when keyword fails).
9. **“Show me books” button** — fetch books for the selected mood.
10. **Loading & empty states** — friendly messages and retry options.

## Nice-to-have (Phase 2)

11. **Save favorites to localStorage** — user can bookmark books locally.
12. **Mood history (local only)** — last N moods stored client-side.
13. **Mood → multiple genre mapping** — map a mood to several genres for variety.
14. **Share a recommendation** — share book on socials / copy link.

## Long-term / optional (Phase 3)

15. **Account & sync (with a DB)** — optional if you later add auth and persistent favorites.
16. **Community picks & ratings** — show what others chose for similar moods.
17. **Smart suggestions** — upgrade to AI emotion detection later (when budget allows).

---

# 2) Swipe card feature — detailed spec

## Purpose

Let users **browse short mood descriptions** on cards and swipe until they find the one that best matches how they feel. This makes mood selection playful and quick.

## Deck contents

- Each card = short mood text + emoji/icon + 1-line explanation.
  Examples:

  - “Feeling lost 😕 — I need direction”
  - “Curious 🤓 — I want something mind-bending”
  - “Anxious 😰 — Need calm, soothing reads”
  - “Bored 😒 — Want something exciting”

## Gestures & interactions

- **Swipe Right** = select this mood (confirm).
- **Swipe Left** = skip this mood (move to next card).
- **Tap** = flip / expand card to show suggested short genres and a “Show books” CTA.
- **Up swipe** (optional) = more details / example book picks preview.
- **Keyboard alternatives**:

  - Right Arrow = select; Left Arrow = skip; Enter = show books.

- **Undo**: small “undo” button appears for a few seconds after a swipe to bring back the previous card.

## Visual/UX details

- Smooth physics-based card animation (use Framer Motion or CSS transitions).
- Top of the screen shows progress: e.g., “2 / 12 moods seen”.
- Animated microcopy: when user selects a mood show a small toast: “Selected: Curious — finding books…”.
- Accessible labeling for screen readers for each gesture; make the tap fallback available.

## Data/state on swipe

- Keep deck and current index in frontend state.
- When user selects a mood (swipe right): call `/api/books` with `mood` or `keyword` payload to fetch books.
- If you want to show preview books on the card flip, prefetch 1–3 books when card comes into focus to reduce wait time.

---

# 3) UI components (frontend pieces you’ll build)

- `MoodSwipeDeck` — the swipe card container + gesture handlers.
- `MoodCard` — single card UI (collapsed/expanded states).
- `MoodInput` — text area for typing mood (MVP alternative to swipe).
- `BookList` / `BookCard` — grid/list of result cards.
- `Header` — app name, optional manual mood selector, favorites button.
- `Toast` / `Loader` / `EmptyState` — UX helpers.
- `LocalFavorites` — client UI to view locally-saved books.

---

# 4) Minimal API & request flow (no DB)

### Endpoint (one)

- `POST /api/books`

  - Payload: `{ text?: string, mood?: string }`
  - Server logic:

    1. If `mood` provided, use it. Else, run keyword detection on `text`.
    2. Map mood → 1–3 genres/subjects.
    3. Query Google Books or Open Library for those subjects (combine results or pick top).
    4. Return normalized array: `{ mood, genres, books: [{title, authors, description, thumbnail, infoLink}] }`.

### Client flow

- User swipes and selects mood → client sends `{ mood: "curious" }` → shows loader → display results.
- Optional: if user typed a phrase, send `{ text: "..." }`.

---

# 5) Example mood → genres mapping (start simple)

- `lost` → [`philosophy`, `self-help`]
- `curious` → [`science-fiction`, `popular-science`]
- `anxious` → [`mindfulness`, `wellness`]
- `sad` → [`inspirational`, `memoir`]
- `bored` → [`adventure`, `thriller`]
- `happy` → [`romance`, `humor`]

You can store this mapping as a JSON object in the frontend or backend.

---

# 6) Local saving strategy (since no DB)

- Use `localStorage` (or IndexedDB for larger needs).
- Save favorites as an array of normalized book objects.
- Provide “Export” (download JSON) if user wants to preserve across devices.

---

# 7) Accessibility & performance notes

- Always provide keyboard alternatives & aria labels for swiping actions.
- Limit API calls: prefetch only when needed and debounce if user types quickly.
- Use image placeholders and lazy load thumbnails for performance.

---

# 8) Minimal roadmap (next actionable steps)

1. Design MoodCard content and make a static deck (hardcoded mood list).
2. Build `MoodSwipeDeck` UI with left/right swipe animations (no backend yet).
3. Add `/api/books` endpoint that returns fake sample books (mock).
4. Wire select → call API and show BookList.
5. Replace mock with Google Books / Open Library fetch.
6. Add local favorites and undo/keyboard controls.
7. Polish: loading states, accessibility, small animations.

---

Want me to now:

- produce the **exact list of 12 mood cards** (short lines + emoji) for your deck, **or**
- write the **swipe-card UI component plan** (props, events, state) you can hand straight to a front-end dev?
