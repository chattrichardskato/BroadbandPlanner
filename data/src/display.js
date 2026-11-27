// src/display.js
// Functions that print formatted output to the terminal using three npm packages
// written by other developers:
//   - figlet     : draws large ASCII-art banner text
//   - chalk      : adds colors and bold text to terminal output
//   - cli-table3 : draws tables with borders and aligned columns

import chalk from "chalk";
import figlet from "figlet";
import Table from "cli-table3";

/**
 * Prints the program title as a large ASCII-art banner in cyan.
 */
export function showBanner(title) {
  const art = figlet.textSync(title, { font: "Standard" });
  console.log(chalk.cyan(art));
}

/**
 * Prints a colored section heading so each demo is easy to find in the output.
 */
export function showHeading(text) {
  console.log("\n" + chalk.bgBlue.white.bold(` ${text} `));
}

/**
 * Formats a number as Naira with thousands separators, e.g. 25000 -> "₦25,000".
 * Uses the built-in Intl number formatter.
 */
export function naira(amount) {
  return "₦" + new Intl.NumberFormat("en-NG").format(amount);
}

/**
 * Prints a list of plans as a table. If the plans have a costPerMbps field,
 * an extra column is shown for it.
 */
export function showPlanTable(plans) {
  const showCost = plans.some((p) => p.costPerMbps !== undefined);
  const head = ["Plan", "Provider", "Type", "Speed", "Price/month", "Data"];
  if (showCost) head.push("₦ per Mbps");

  const table = new Table({ head: head.map((h) => chalk.yellow(h)), style: { head: [] } });
  plans.forEach((p) => {
    const row = [
      p.name,
      p.provider,
      p.type,
      `${p.speedMbps} Mbps`,
      naira(p.priceNaira),
      p.dataCapGB === null ? chalk.green("Unlimited") : `${p.dataCapGB} GB`,
    ];
    if (showCost) row.push(naira(p.costPerMbps));
    table.push(row);
  });
  console.log(table.toString());
}

/**
 * Prints a label and value on one line, with the label dimmed and the value bold.
 */
export function showFact(label, value) {
  console.log(`  ${chalk.dim(label + ":")} ${chalk.bold(String(value))}`);
}