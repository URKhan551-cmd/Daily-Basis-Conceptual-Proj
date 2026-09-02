export function scoreDestination(
  dest:       Destination,
  temp:       number,
  uvIndex:    number,
  windSpeed:  number,
  precipProb: number,
): DestinationScore {
  let score = 60;
  const reasons:  string[] = [];
  const warnings: string[] = [];
 
  // Temperature
  
  if (dest.type === "mountain") {
    const estTemp = temp - 10;
    if (estTemp >= 18 && estTemp <= 28) { score += 20; reasons.push("Perfect mountain temperature"); }
    else if (estTemp > 28)              { score += 10; reasons.push("Cooler than the coast");         }
  } else if (dest.type === "beach") {
    if (temp >= 24 && temp <= 32)       { score += 20; reasons.push("Ideal beach temperature");             }
    else if (temp > 38)                 { score -= 25; warnings.push("Too hot — risk of heat exhaustion");  }
    else if (temp < 20)                 { score -= 10; warnings.push("Cool for swimming");                  }
  } else if (dest.type === "desert") {
    if (temp >= 22 && temp <= 30)       { score += 20; reasons.push("Perfect desert conditions");           }
    else if (temp > 42)                 { score -= 35; warnings.push("Dangerously hot for desert");         }
    else if (temp > 36)                 { score -= 15; warnings.push("Very hot — early morning only");      }
  } else {
    if (temp >= 20 && temp <= 32)       { score += 15; reasons.push("Comfortable sightseeing weather");     }
    else if (temp > 38)                 { score -= 10; warnings.push("Very hot for walking around");        }
  }
 
  // UV
  if (uvIndex >= 10)      { score -= 15; warnings.push(`Extreme UV ${uvIndex} — apply SPF 50+`);      }
  else if (uvIndex >= 7)  { score -= 5;  warnings.push(`High UV ${uvIndex} — sunscreen essential`);   }
  else if (uvIndex <= 4)  { score += 5;  reasons.push("Low UV — comfortable sun exposure");           }
 
  // Wind
  if (dest.type === "beach") {
    if (windSpeed > 35)   { score -= 20; warnings.push("Too windy — rough waves expected");            }
    else if (windSpeed > 20) { score -= 5; warnings.push("Moderate wind"); }
    else                  { score += 5;  reasons.push("Light breeze — perfect beach conditions");     }
  } else if (dest.type === "desert") {
    if (windSpeed > 40)   { score -= 20; warnings.push("Sandstorm risk — avoid open desert");         }
  }
 
  // Rain
  if (precipProb > 60)    { score -= 20; warnings.push(`${precipProb}% rain chance`);                 }
  else if (precipProb < 10) { score += 5; reasons.push("Rain-free day"); }
 
  // Oman bonus
  if (dest.omanBorder && temp < 34) { score += 10; reasons.push("Good conditions for the drive"); }
 
  return {
    id:       dest.id,
    score:    Math.max(0, Math.min(100, score)),
    reasons,
    warnings,
  };
}
 
