// src/arrayTools.js
// Functions that demonstrate native ES6+ array methods:
// filter, map, reduce, sort, find, findIndex, some, every, includes, flatMap and Array.from.
// None of these functions change the original array; they return new values.

/**
 * Returns only the plans that match a connection type (fiber, wireless, satellite).
 * Demonstrates: Array.prototype.filter with an arrow function.
 */
export function filterByType(plans, type) {
  return plans.filter((plan) => plan.type === type);
}

/**
 * Returns plans whose monthly price is at or below the budget.
 * Demonstrates: filter combined with destructuring in the parameter.
 */
export function plansWithinBudget(plans, budget) {
  return plans.filter(({ priceNaira }) => priceNaira <= budget);
}

/**
 * Adds a calculated "costPerMbps" field to every plan.
 * Demonstrates: map with the object spread operator (...) so originals are not changed.
 */
export function addCostPerMbps(plans) {
  return plans.map((plan) => ({
    ...plan,
    costPerMbps: Math.round(plan.priceNaira / plan.speedMbps),
  }));
}

/**
 * Sorts plans by any numeric field, ascending by default.
 * Demonstrates: sort on a copy made with the spread operator, because sort() mutates.
 */
export function sortByField(plans, field, descending = false) {
  const direction = descending ? -1 : 1;
  return [...plans].sort((a, b) => (a[field] - b[field]) * direction);
}

/**
 * Calculates the average monthly price of a list of plans.
 * Demonstrates: reduce to add up values, with a guard for an empty list.
 */
export function averagePrice(plans) {
  if (plans.length === 0) return 0;
  const total = plans.reduce((sum, plan) => sum + plan.priceNaira, 0);
  return Math.round(total / plans.length);
}

/**
 * Groups plans into an object keyed by connection type, e.g. { fiber: [...], wireless: [...] }.
 * Demonstrates: reduce building an object instead of a number.
 */
export function groupByType(plans) {
  return plans.reduce((groups, plan) => {
    groups[plan.type] = groups[plan.type] ?? [];
    groups[plan.type].push(plan.name);
    return groups;
  }, {});
}

/**
 * Finds the first plan that offers at least the requested speed.
 * Demonstrates: find (returns the element) and findIndex (returns its position).
 */
export function firstPlanAtSpeed(plans, minSpeed) {
  const sorted = sortByField(plans, "speedMbps");
  const plan = sorted.find((p) => p.speedMbps >= minSpeed);
  const position = sorted.findIndex((p) => p.speedMbps >= minSpeed);
  return { plan, position };
}

/**
 * Answers quick yes/no questions about the whole list.
 * Demonstrates: some (at least one matches), every (all match) and includes.
 */
export function planFacts(plans) {
  const providers = plans.map((p) => p.provider);
  return {
    anyUnlimited: plans.some((p) => p.dataCapGB === null),
    allAtLeast20Mbps: plans.every((p) => p.speedMbps >= 20),
    offersOrbitNet: providers.includes("OrbitNet"),
  };
}

/**
 * Returns a list of unique provider names in alphabetical order.
 * Demonstrates: Array.from with a Set to remove duplicates, then sort on strings.
 */
export function uniqueProviders(plans) {
  return Array.from(new Set(plans.map((p) => p.provider))).sort();
}

/**
 * Builds short "tags" for every plan and flattens them into one list.
 * Demonstrates: flatMap, which maps each item to an array and flattens the result one level.
 */
export function planTags(plans) {
  return plans.flatMap((p) => [`#${p.type}`, p.dataCapGB === null ? "#unlimited" : "#capped"]);
}