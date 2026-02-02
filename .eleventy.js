import eleventyImg from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { minify } from "html-minifier";

export default function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Image shortcode (lazy loading)
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, sizes = "100vw") {
    if (!src) {
      throw new Error(`Missing \`src\` on image from: ${this.page.inputPath}`);
    }

    let metadata = await eleventyImg(src, {
      widths: [300, 600, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/",
      filenameFormat: function (id, src, width, format, options) {
        let extension = format;
        return `${id}-${width}w.${extension}`;
      },
    });

    let lowsrc = metadata.jpeg[0];
    let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

    return `<picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat
            .map((entry) => `${entry.url} ${entry.width}w`)
            .join(", ")}" sizes="${sizes}">`;
        })
        .join("\n")}
        <img
          src="${highsrc.url}"
          alt="${alt}"
          loading="lazy"
          decoding="async"
          style="max-width: 100%; height: auto;">
      </picture>`;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content) {
    if (process.env.ELEVENTY_ENV === "production" && this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      });
    }
    return content;
  });

  // Collections
  eleventyConfig.addCollection("consoles", function (collection) {
    return collection.getFilteredByGlob("src/consoles/**/*.md").sort((a, b) => {
      return (a.data.tier || "B").localeCompare(b.data.tier || "B");
    });
  });

  eleventyConfig.addCollection("guides", function (collection) {
    return collection.getFilteredByGlob("src/guides/**/*.md");
  });

  eleventyConfig.addCollection("accessories", function (collection) {
    return collection.getFilteredByGlob("src/accessories/**/*.md");
  });

  // Pass-through copy
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/EdithLa/.htaccess");

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Backwards-compatible date filter used in some templates
  eleventyConfig.addFilter("dateFilter", (dateObj, locale = "fr") => {
    try {
      const d = dateObj ? new Date(dateObj) : new Date();
      return d.toLocaleDateString(locale === "fr" ? "fr-FR" : locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateObj;
    }
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Pass through files and directories
  eleventyConfig.addPassthroughCopy("src/assets/css/");
  eleventyConfig.addPassthroughCopy("src/assets/images/");
  eleventyConfig.addPassthroughCopy("src/assets/js/");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.njk");

  // Config object
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/",
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
