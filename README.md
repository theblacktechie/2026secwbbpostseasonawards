# 2026 SEC Women's Basketball Postseason Awards
Interactive Scantron Data Visualization

---

## Concept

SEC WBB awards dropped on March 3, 2026. Instead of a standard stats thread, I wanted the format to be the story.

Awards season is a test. Everyone has an opinion. A scantron felt right because the answers are already filled in. You just have to tap to reveal who won.

Started sketching trading cards at 2PM. Scrapped it. Stepped away. Saw a scantron on my timeline at 8:30PM. That was it.

---

## Features

- 7 award categories across the full SEC postseason slate
- Tap the filled rectangle to trigger a pulse animation and expand the stat card
- Flip the card to reveal 6 verified stats in a 3x2 grid on the back
- School color system tied to each answer bubble
- Collapsible answer key at the bottom
- Narrow portrait proportions designed to mirror an actual scantron form

---

## Award Winners

| # | Award | Winner | School |
|---|-------|---------|--------|
| 01 | Scholar-Athlete of the Year | Karly Weathers | Alabama |
| 02 | Player of the Year | Mikayla Blakes | Vanderbilt |
| 03 | Freshman of the Year | Aubrey Galvan | Vanderbilt |
| 04 | Newcomer of the Year | Cotie McMahon | Ole Miss |
| 05 | Defensive Player of the Year | Raven Johnson | South Carolina |
| 06 | Sixth Woman of the Year | MiLaysia Fulwiley | LSU |
| 07 | Coach of the Year | Shea Ralph | Vanderbilt |

Vanderbilt swept Player of the Year, Freshman of the Year, and Coach of the Year. First time in SEC history a program has accomplished that in the same season.

---

## Tech Stack

- React (JSX)
- Barlow Condensed via Google Fonts, weights 400 / 500 / 600 / 700
- CSS 3D transforms for the flip animation via rotateY
- No external chart libraries. Layout is pure CSS Grid and Flexbox.

---

## School Color Reference

| Letter | School | Hex |
|--------|--------|-----|
| A | Alabama | #9E1B32 |
| B | LSU | #461D7C |
| C | Ole Miss | #CE1126 |
| D | South Carolina | #73000A |
| E | Vanderbilt | #B8960C |

---

## Data Sources

Stats verified through official athletic department sources current as of March 3, 2026.

- rolltide.com: Karly Weathers
- vucommodores.com: Mikayla Blakes, Aubrey Galvan, Shea Ralph
- olemisssports.com: Cotie McMahon
- gamecocksonline.com: Raven Johnson
- lsusports.net: MiLaysia Fulwiley
- SEC official awards release: March 3, 2026

---

## Getting Started

```bash
git clone https://github.com/yourusername/sec-wbb-awards-scantron.git
cd sec-wbb-awards-scantron
npm install
npm run dev
```

Drop `sec-awards-scantron.jsx` into your React project and import it as a default component. No additional dependencies required beyond React.

---

## Credits

Concept, Creative Direction and Design Strategy by Kris E. Smith, Atlanta, Georgia.
Data sourced from Ole Miss Athletics, Vanderbilt Athletics, Alabama Athletics, South Carolina Athletics, LSU Athletics and the SEC.
Built March 3, 2026, the night the awards dropped.
