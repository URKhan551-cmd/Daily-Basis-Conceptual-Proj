// const manifest = {
// containerId: 5,
// destination: "khan",
// weight: 98,
// unit: "lb",
// hazmat: true

// }
function normalizeUnits(manifest){
  return manifest.unit === "lb" ? 
  {
    ...manifest,
    weight: manifest.weight * 0.45,
    unit: "kg",
    } :
     {...manifest};
}




function validateManifest(manifest){
  const error = {};

  if(manifest.destination === undefined){
    error.destination = "Missing";
  } else if(typeof manifest.destination !== "string" ||
   manifest.destination === null || manifest.destination.trim() === ""){
    error.destination = "Invalid";
  };

  if(manifest.containerId === undefined){
    error.containerId = "Missing"
  } else if(
    !Number.isInteger(manifest.containerId) ||
    typeof manifest.containerId !== "number" || manifest.containerId === null ||
    manifest.containerId <= 0){
    error.containerId = "Invalid";
  }


  if(manifest.weight === undefined){
    error.weight = "Missing"
  } else if(typeof manifest.weight !== "number" || manifest.weight <= 0 ||
  Number.isNaN(manifest.weight)){
    error.weight = "Invalid";
  }

  if(manifest.unit === undefined){
    error.unit = "Missing"
  } else if(typeof manifest.unit !== "string" || manifest.unit !== "kg" && manifest.unit !== "lb"){
    error.unit = "Invalid";
  }

  if(manifest.hazmat === undefined){
    error.hazmat = "Missing";
  } else if(typeof manifest.hazmat !== "boolean"){
    error.hazmat = "Invalid";
  }

  return error;
}
// console.log(validateManifest(manifest));


 function processManifest(manifest){
  const normalizedManifest = normalizeUnits(manifest);
  const validatedManifest = validateManifest(manifest);
 
if(Object.keys(validatedManifest).length === 0){
   console.log(`Validation success: ${manifest.containerId}`)
    console.log(`Total weight: ${normalizedManifest.weight} kg`)
} else {
  console.log(`Validation error: ${manifest.containerId}`);
    console.log(validatedManifest);
}

}



 processManifest({ containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false });
 processManifest({ containerId: -88, destination: "Soledad", weight: NaN });