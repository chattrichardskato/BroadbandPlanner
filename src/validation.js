// src/validation.js
// Functions that demonstrate throwing and handling exceptions.
// A custom error class lets the caller tell "bad input" apart from unexpected bugs.
import chalk from "chalk";

/**
 * A custom error type for invalid user input or invalid data.
 * Extending the built-in Error class keeps the message and stack trace.
 */
export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

/**
 * Turns text such as "25000" into a positive number.
 * Throws a ValidationError if the text is not a number or is not above zero.
 */
export function parseBudget(text) {
  const budget = Number(text);
  if (Number.isNaN(budget)) {
    throw new ValidationError(`"${text}" is not a number.`, "budget");
  }
  if (budget <= 0) {
    throw new ValidationError("Budget must be greater than zero.", "budget");
  }
  return budget;
}

/**
 * Checks that a plan object has every required field with a sensible value.
 * Throws a ValidationError naming the first field that fails.
 */
export function validatePlan(plan) {
  const required = ["name", "provider", "type", "speedMbps", "priceNaira"];
  const missing = required.find((field) => plan[field] === undefined);
  if (missing) {
    throw new ValidationError(`Plan is missing "${missing}".`, missing);
  }
  if (!["fiber", "wireless", "satellite"].includes(plan.type)) {
    throw new ValidationError(`Unknown connection type "${plan.type}".`, "type");
  }
  if (plan.speedMbps <= 0) {
    throw new ValidationError("Speed must be greater than zero.", "speedMbps");
  }
  return true;
}

/**
 * Runs any function inside try...catch...finally and reports what happened.
 * ValidationErrors are expected and handled; any other error is re-thrown.
 * Returns the function's result, or null if a ValidationError was caught.
 */
export function tryRun(label, action, log = console.log) {
  try {
    const result = action();
    log(`  ✔ ${label}: OK`);
    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      log(`  ✘ ${label}: ${error.message} (field: ${error.field})`);
      return null;
    }
    throw error; // Not an error we know how to handle, so pass it up.
  } finally {
    log(chalk.dim(`    finished checking ${label}`));
  }
}