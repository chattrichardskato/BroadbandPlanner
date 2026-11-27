# Overview

As a software engineer, I am working to strengthen my skills in modern JavaScript beyond the browser, so that I can build backend tools and services with Node.js. My goal with this project was to learn how JavaScript programs are organized into modules, how ES6+ array methods replace traditional loops, how recursion can be used to work with tree-shaped data, how to throw and handle custom exceptions, and how to use libraries written by other developers through npm.

Broadband Planner is a Node.js command-line program that compares broadband internet plans and analyzes a small network of sites. It uses native ES6 array methods such as `filter`, `map`, `sort`, `reduce`, `find`, `some`, `every` and `flatMap` to calculate the cost per Mbps of each plan, find the plans that fit a monthly budget, group plans by connection type, and answer quick questions about the list. It uses recursion to walk a network tree, drawing the tree, counting every user and site, finding the deepest level, and tracing the route from the core hub to any site. It also validates budgets and new plan records with a custom `ValidationError` class, using `throw` and `try...catch...finally` so that bad input is reported clearly instead of crashing the program. The user can pass a monthly budget when starting the program, for example `node index.js 25000`.

My purpose in writing this software was to practise the JavaScript features I expect to use most in real projects, using an example from the connectivity industry I work in, so that the code is meaningful to me and easy to explain to others.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

I developed the software in Visual Studio Code, using its built-in terminal to run the program with Node.js (v22) and npm to install and manage packages. I used Git for version control and GitHub to publish the code.

The program is written in JavaScript using ES modules (`import` and `export`) and runs on the Node.js runtime. It uses three npm packages: chalk, which adds colors and bold text to terminal output; cli-table3, which draws the plan comparison tables; and figlet, which draws the ASCII-art banner at the start of the program.

# Useful Websites

- [MDN Web Docs – JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN – Array Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN – Control Flow and Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN – JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js – Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Wikipedia – JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [npm – chalk](https://www.npmjs.com/package/chalk)
- [npm – cli-table3](https://www.npmjs.com/package/cli-table3)
- [npm – figlet](https://www.npmjs.com/package/figlet)

# Future Work

- Load plans from a JSON or CSV file instead of hard-coded sample data
- Add an interactive menu so the user can choose a demo and enter values while the program runs
- Let users add, edit and save new plans after they pass validation
- Add automated tests for the array and recursion functions
- Build a browser version that displays the plans and network tree on a web page