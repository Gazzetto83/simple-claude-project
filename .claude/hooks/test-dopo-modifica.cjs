// Hook PostToolUse (Edit|Write): se cambia la logica della lista, esegue i test.
// Exit 2 = il messaggio su stderr torna a Claude, che vede l'errore e può correggerlo.
const { execSync } = require("child_process");

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const data = JSON.parse(input || "{}");
  const file = String(data.tool_input?.file_path ?? "").replace(/\\/g, "/");

  if (!/src\/todos(\.test)?\.js$/.test(file)) return; // altri file: non fare niente

  try {
    execSync("npm test", { cwd: process.env.CLAUDE_PROJECT_DIR || process.cwd(), stdio: "pipe" });
    console.log(JSON.stringify({ systemMessage: "✓ Test passati dopo la modifica a " + file.split("/").pop() }));
  } catch (err) {
    const output = (err.stdout?.toString() ?? "") + (err.stderr?.toString() ?? "");
    process.stderr.write("I test falliscono dopo la modifica a " + file + ":\n" + output.slice(-3000));
    process.exit(2);
  }
});
