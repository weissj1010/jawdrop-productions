export const onRequest: PagesFunction = async (context) => {
  const ua = (context.request.headers.get("user-agent") || "").toLowerCase();
  const bots = ["facebookexternalhit", "twitterbot", "linkedinbot", "slackbot", "discordbot", "whatsapp", "telegrambot", "googlebot"];
  const isBot = bots.some((bot) => ua.includes(bot));

  if (!isBot) {
    return context.next();
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>The Schleys | JAW Drop Productions</title>
  <meta property="og:type" content="video.other" />
  <meta property="og:title" content="The Schleys" />
  <meta property="og:description" content="A JAW Drop Productions Film" />
  <meta property="og:image" content="https://jawdropproductions.com/schleys-og.png" />
  <meta property="og:url" content="https://jawdropproductions.com/schleys" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="The Schleys" />
  <meta name="twitter:description" content="A JAW Drop Productions Film" />
  <meta name="twitter:image" content="https://jawdropproductions.com/schleys-og.png" />
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
};
