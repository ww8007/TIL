import Main from "./main";

let main = new Main();

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app") as HTMLElement;
appDiv.innerHTML = `<h1>Factory Pattern</h1><h3>See console log</h3>`;
