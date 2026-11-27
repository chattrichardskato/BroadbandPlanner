// index.js
// Entry point for Broadband Planner.
// Run with:  node index.js            (uses the default budget of ₦40,000)
//       or:  node index.js 25000      (uses your own budget)
// The program runs three demos in order: array methods, recursion and exceptions,
// with all output formatted by the libraries in src/display.js.

import chalk from "chalk";
import { plans } from "./data/plans.js";
import { network } from "./data/network.js";
import * as arrays from "./src/arrayTools.js";
import * as tree from "./src/recursion.js";
import { parseBudget, validatePlan, tryRun, ValidationError } from "./src/validation.js";
import { showBanner, showHeading, showPlanTable, showFact, naira } from "./src/display.js";

const DEFAULT_BUDGET = 40000;

/**
 * Reads the budget from the command line. If it is missing or invalid,
 * the error is caught, explained to the user and the default budget is used instead.
 */
function getBudget() {
  const input = process.argv[2];
  if (input === undefined) return DEFAULT_BUDGET;
  try {
    return parseBudget(input);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(chalk.red(`Invalid budget: ${error.message} Using ${naira(DEFAULT_BUDGET)} instead.`));
      return DEFAULT_BUDGET;
    }
    throw error;
  }
}

/**
 * Demo 1: shows the plan catalogue and then answers questions about it
 * using filter, map, sort, reduce, find, some, every, includes, flatMap and Array.from.
 */
function arrayDemo(budget) {
  showHeading("1. ES6 ARRAY METHODS");

  console.log(chalk.bold("\nAll plans, with cost per Mbps (map) sorted cheapest first (sort):"));
  showPlanTable(arrays.sortByField(arrays.addCostPerMbps(plans), "costPerMbps"));

  const affordable = arrays.plansWithinBudget(plans, budget);
  console.log(chalk.bold(`\nPlans within your budget of ${naira(budget)} (filter):`));
  if (affordable.length > 0) {
    showPlanTable(arrays.sortByField(affordable, "speedMbps", true));
  } else {
    console.log("  No plans fit that budget.");
  }

  console.log(chalk.bold("\nQuick facts:"));
  showFact("Average price of all plans (reduce)", naira(arrays.averagePrice(plans)));
  showFact("Average price of fiber plans (filter + reduce)", naira(arrays.averagePrice(arrays.filterByType(plans, "fiber"))));
  showFact("Plans grouped by type (reduce)", JSON.stringify(arrays.groupByType(plans)));

  const { plan, position } = arrays.firstPlanAtSpeed(plans, 100);
  showFact("Slowest plan with at least 100 Mbps (find)", `${plan.name} at ${naira(plan.priceNaira)}`);
  showFact("Its position in the speed-sorted list (findIndex)", position);

  const facts = arrays.planFacts(plans);
  showFact("Any unlimited plans? (some)", facts.anyUnlimited);
  showFact("Every plan at least 20 Mbps? (every)", facts.allAtLeast20Mbps);
  showFact("OrbitNet in the list? (includes)", facts.offersOrbitNet);
  showFact("Unique providers (Array.from + Set)", arrays.uniqueProviders(plans).join(", "));
  showFact("First six tags (flatMap)", arrays.planTags(plans).slice(0, 6).join(" "));
}

/**
 * Demo 2: walks the network tree with recursive functions.
 */
function recursionDemo() {
  showHeading("2. RECURSION");

  console.log(chalk.bold("\nNetwork tree (drawTree):"));
  tree.drawTree(network).forEach((line) => console.log(chalk.green(line)));

  console.log("");
  showFact("Total users on the network (countUsers)", tree.countUsers(network));
  showFact("Total sites (countSites)", tree.countSites(network));
  showFact("Deepest level (maxDepth)", tree.maxDepth(network));

  const target = "3rd Avenue Tower";
  const path = tree.findPath(network, target);
  showFact(`Route to ${target} (findPath)`, path ? path.join(" → ") : "not found");
  showFact("Route to an unknown site (findPath)", tree.findPath(network, "Lagos POP") ?? "not found");

  const branches = network.children.length;
  showFact(`Ways to order upgrades of ${branches} distribution sites (factorial)`, tree.factorial(branches));
}

/**
 * Demo 3: throws and handles exceptions with a custom ValidationError class.
 */
function exceptionDemo() {
  showHeading("3. THROWING AND HANDLING EXCEPTIONS");

  console.log(chalk.bold("\nChecking budgets:"));
  ["30000", "abc", "-500"].forEach((text) => {
    tryRun(`budget "${text}"`, () => parseBudget(text));
  });

  console.log(chalk.bold("\nChecking new plan records before adding them:"));
  const newPlans = [
    { name: "Fiber 300", provider: "CityLink", type: "fiber", speedMbps: 300, priceNaira: 110000 },
    { name: "Mystery Plan", provider: "Unknown", speedMbps: 10, priceNaira: 5000 },
    { name: "Laser Link", provider: "BeamCo", type: "laser", speedMbps: 50, priceNaira: 30000 },
  ];
  const accepted = newPlans.filter((p) => tryRun(p.name, () => validatePlan(p)) === true);
  showFact("Plans accepted", accepted.map((p) => p.name).join(", ") || "none");
}

/**
 * Runs the whole program. The outer try...catch is a safety net for any
 * unexpected error so the user sees a clear message instead of a crash dump.
 */
function main() {
  try {
    showBanner("Broadband Planner");
    const budget = getBudget();
    arrayDemo(budget);
    recursionDemo();
    exceptionDemo();
    showHeading("DONE");
    console.log(chalk.dim("Output formatted with figlet, chalk and cli-table3.\n"));
  } catch (error) {
    console.error(chalk.red(`Unexpected error: ${error.message}`));
    process.exitCode = 1;
  }
}

main();