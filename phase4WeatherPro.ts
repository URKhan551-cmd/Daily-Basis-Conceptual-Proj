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

