My component can be mentally divided into five layers.

Layer 1 — Input
dw
onSelect

↓

Layer 2 — Derived presentation data
const { dest, score, loading, error } = dw;

const meta = getScoreLabel(score.score);

↓

Layer 3 — UI state
loading?
   ↓
skeleton

error?
   ↓
error card

Layer 4 — Normal rendering
destination
temperature
conditions
stats
score
reasons
warnings
description
tags

↓

Layer 5 — User interaction
onSelect(dest.city)

That is a very clean component pipeline.



  
