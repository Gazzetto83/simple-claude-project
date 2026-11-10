// Hook PreToolUse (Bash): blocca i comandi git rischiosi prima che vengano eseguiti.
// Exit 2 = il comando NON parte e il motivo su stderr viene mostrato a Claude.
let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const data = JSON.parse(input || "{}");
  const cmd = String(data.tool_input?.command ?? "");

  const isPush = /\bgit\s+push\b/.test(cmd);
  const force = isPush && /(\s--force(-with-lease)?\b|\s-f\b|\s\+\S+)/.test(cmd);
  const noVerify = /\bgit\b.*\s--no-verify\b/.test(cmd);

  if (force) {
    process.stderr.write("Bloccato dall'hook: 'git push --force' può cancellare commit su GitHub. Usa un push normale.");
    process.exit(2);
  }
  if (noVerify) {
    process.stderr.write("Bloccato dall'hook: '--no-verify' salta i controlli. Esegui il comando senza questa opzione.");
    process.exit(2);
  }
});
