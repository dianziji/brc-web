export function sanitizeRichHtml(input: string): string {
  if (!input) return "";

  let output = input;

  // Remove comments first.
  output = output.replace(/<!--[\s\S]*?-->/g, "");

  // Remove high-risk tags and their contents.
  output = output.replace(
    /<\s*(script|style|iframe|object|embed|svg|math|form|input|button|textarea|select|option|link|meta|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,
    ""
  );

  // Remove standalone high-risk tags.
  output = output.replace(
    /<\s*(script|style|iframe|object|embed|svg|math|form|input|button|textarea|select|option|link|meta|base)\b[^>]*\/?>/gi,
    ""
  );

  // Remove inline event handlers.
  output = output.replace(/\son\w+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "");

  // Remove style attributes to avoid CSS-based injection vectors.
  output = output.replace(/\sstyle\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "");

  // Block javascript:/vbscript:/data:text/html URLs in href/src.
  output = output.replace(
    /\s(href|src)\s*=\s*(\"|')\s*(javascript:|vbscript:|data:text\/html)[\s\S]*?\2/gi,
    " $1=\"#\""
  );

  return output;
}
