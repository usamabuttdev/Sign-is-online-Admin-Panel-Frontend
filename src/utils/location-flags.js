const YES_VALUES = new Set(["y", "yes", "true", "1"]);
const NO_VALUES = new Set(["n", "no", "false", "0"]);

export function yesNoToFlag(value) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (typeof value === "boolean") {
    return value ? "Y" : "N";
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (YES_VALUES.has(normalized)) return "Y";
    if (NO_VALUES.has(normalized)) return "N";
  }

  if (value === 1) return "Y";
  if (value === 0) return "N";

  return undefined;
}

export function flagToBoolean(value) {
  return value === "Y" || value === "y" || value === true;
}
