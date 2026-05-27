type Unit = "kg" | "lb";

interface Manifest {
  containerId: number;
  destination: string;
  weight: number;
  unit: string;
  hazmat: boolean;
}

type ValidationError = {
    containerId?: "Invalid" | "Missing";
    destination?: "invalid" | "Missing";
    weight?:  "Invalid" | "Missing";
    unit?: "Invalid" | "Missing";
    hazmat?: "Invalid" | "Missing";

}

function normalizeUnits(manifest: Manifest): Manifest {
  return manifest.unit === "lb" ? {
    ...manifest,
    weight: Math.round(manifest.weight * 0.45),\
    unit: "kg",
  } :
  {
    ...manifest
  }
}

function validateManifest(manifest: Partial<Manifest>): ValidationError {
    const error: ValidationError = {};
    if(manifest.destination === undefined) {
        error.destination = "Missing";
    } else if(
        typeof manifest.destination !== "string" ||
        manifest.destination === null ||
        manifest.destination.trim() === ""
    ) {
        error.destination = "Invalid";
    }

    if(manifest.containerId === undefined) {
        error.containerId = "Missing";
    } else if(
        !Number.isInteger(manifest.containerId) ||
        typeof manifest.containerId !== "number" ||
        manifest.containerId <= 0
    ) {
        error.containerId = "Invalid";
    }

    if(manifest.weight === undefined) {
        error.weight = "Missing";
    } else if(
        typeof manifest.weight !== "number" ||
        manifest.weight <= 0 ||
        Number.isNaN(manifest.weight)
    ) {
        error.weight = "Invalid";
    }

    if(manifest.unit === undefined) {
        error.unit = "Missing";
    } else if(
        typeof manifest.unit !== "string" ||
        (manifest.unit !== "kg" && manifest.unit !== "lb")
    ) {
        error.unit = "Invalid";
    }

    if(manifest.hazmat === undefined) {
        error.hazmat = "Missing";
    } else if(typeof manifest.hazmat !== "boolean") {
        error.hazmat = "Invalid";
    }

    return error;
}


function processManifest(manifest: Partial<Manifest>): void {
    const normalizedManifest = normalizeUnits(manifest as Manifest);
    const validatedManifest = validateManifest(manifest);

    if(Object.keys(validatedManifest).length === 0) {
        console.log(`Validation success: ${manifest.containerId}`);
        console.log(`Total weight: ${normalizedManifest.weight} kg`);
    } else {
        console.log(`Validation error: ${manifest.containerId}`);
        console.log(validatedManifest);
    }
}