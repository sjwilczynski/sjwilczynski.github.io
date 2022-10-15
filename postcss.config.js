const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    purgecss({
      content: [
        "src/**/*.astro",
        "src/**/*.tsx",
        "src/**/*.mdx",
        "src/data/**/*.json",
        "node_modules/react-vertical-timeline-component/**/*.js",
      ],
      css: [
        "src/**/*.scss",
        "node_modules/react-vertical-timeline-component/style.min.css",
      ],
      safelist: ["active", "collapsing"], // Some class names are listed here as they correspond to dynamically added styles.
      // active - added to make sure active links styling from bootstrap navitems is not removed.
      // collapsing - added to make sure the collapsing/expanding animation from bootstrap navigation toggle is not removed.
    }),
  ],
};
