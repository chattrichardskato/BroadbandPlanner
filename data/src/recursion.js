// src/recursion.js
// Recursive functions that walk the network tree in data/network.js.
// Every recursive function has a base case (a site with no children) that stops the recursion,
// and a recursive case that calls the same function on each child site.

/**
 * Adds up the users at a site and at every site beneath it.
 * Base case: a site with no children returns just its own users.
 */
export function countUsers(site) {
  if (site.children.length === 0) {
    return site.users;
  }
  return site.users + site.children.reduce((sum, child) => sum + countUsers(child), 0);
}

/**
 * Counts how many sites are in the tree, including the starting site.
 */
export function countSites(site) {
  return 1 + site.children.reduce((sum, child) => sum + countSites(child), 0);
}

/**
 * Finds the deepest level of the tree. The root is depth 1.
 * Uses Math.max with the spread operator over the depths of the children.
 */
export function maxDepth(site) {
  if (site.children.length === 0) return 1;
  return 1 + Math.max(...site.children.map(maxDepth));
}

/**
 * Returns the chain of site names from the root down to the target site,
 * or null if the target is not in the tree.
 */
export function findPath(site, targetName) {
  if (site.name === targetName) {
    return [site.name];
  }
  for (const child of site.children) {
    const path = findPath(child, targetName);
    if (path !== null) {
      return [site.name, ...path];
    }
  }
  return null;
}

/**
 * Builds an array of text lines that draw the tree, one line per site.
 * The prefix string grows with each level so children are indented under parents.
 */
export function drawTree(site, prefix = "", isLast = true, lines = []) {
  const branch = prefix === "" ? "" : isLast ? "└── " : "├── ";
  lines.push(`${prefix}${branch}${site.name} (${site.users} users)`);
  const childPrefix = prefix === "" ? " " : prefix + (isLast ? "    " : "│   ");
  site.children.forEach((child, index) => {
    drawTree(child, childPrefix, index === site.children.length - 1, lines);
  });
  return lines;
}

/**
 * Calculates n! (n factorial) recursively. Included as the classic recursion example
 * and used to count the possible orders in which sites could be upgraded.
 */
export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}