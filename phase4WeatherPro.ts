New files:
  src/hooks/useDestinations.ts        ← fetches weather for multiple cities
  src/Component/DestinationCard.tsx   ← single destination weather card
  src/Component/ComparePanel.tsx      ← side by side comparison
  src/Component/RankingPanel.tsx      ← weather-based ranking
  src/Component/OmanTripPlanner.tsx   ← UAE ADD
  src/Component/DestinationIntel.tsx  ← master tab that holds all 4 panels

Modified files:
  src/App.tsx                         ← add Destinations tab + wire hook
  src/utils/destinations.ts           ← destination data + ranking logic


  src/
├── App.tsx                              ← REPLACE
├── utils/
│   └── destinations.ts                  ← NEW
├── hooks/
│   └── useDestinations.ts               ← NEW
└── Component/
    ├── DestinationCard.tsx              ← NEW
    ├── ComparePanel.tsx                 ← NEW
    ├── OmanTripPlanner.tsx              ← NEW
    └── DestinationIntel.tsx             ← NEW

User clicks "🧭 Explore" tab
          ↓
DestinationIntel renders with 6 sub-tabs:
  🏆 Ranked   → fetches ALL destinations in parallel
  🏖️ Beaches  → only beach type
  🏜️ Desert   → only desert type
  ⛰️ Mountain → only mountain type
  ⚖️ Compare  → user types 2 cities → side by side
  🇴🇲 Oman    → Oman border trip planner
          ↓
useDestinations.fetchDestinations()
  → Promise.allSettled() — parallel API calls
  → scoreDestination() — scores each 0–100
  → sorts by score descending
          ↓
DestinationCard renders each result
  → click card → fetches full weather → switches to "Now" tab
          ↓
ComparePanel — user types City A and City B
  → fetches both in parallel
  → shows winner banner + side by side stats
          ↓
OmanTripPlanner — UAE ADD
  → shows all Oman border destinations
  → drive times + border crossing info + visa tips
  → Navigate button → Google Maps directions


destinations.ts	       13 UAE + Oman destinations with scoring algorithm
useDestinations.ts	   Parallel API fetching with Promise.allSettled
DestinationCard.tsx	   Single destination card — click to view full weather
ComparePanel.tsx	     Side by side comparison with winner banner
OmanTripPlanner.tsx	   Oman border trips — drive times, visa info, navigate
DestinationIntel.tsx	 Master tab with 6 sub-tabs wiring everything together
App.tsx              	 Added Explore tab + handleDestinationSelect handler
