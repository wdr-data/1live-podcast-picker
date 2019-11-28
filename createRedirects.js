const { writeFileSync } = require("fs");

const podcasts = require("./src/data/podcasts.json");

const REDIRECTS_FILE = "./build/_redirects";

const podcastRedirects = Object.entries(podcasts)
  .map(([podcastSlug, podcast]) =>
    podcast.platforms.map(platform =>
      Object.entries(platform).map(
        ([platformSlug, platformUrl]) =>
          `/${podcastSlug}/${platformSlug} ${platformUrl} 302`
      )
    )
  )
  .flat()
  .flat();

const allRedirect =
  "/alle https://www1.wdr.de/radio/1live/magazin/podcasts/index.html 302";
const pwaRedirect = "/* /index.html 200";

writeFileSync(
  REDIRECTS_FILE,
  [podcastRedirects.join(`\n`), allRedirect, pwaRedirect].join(`\n\n`)
);
