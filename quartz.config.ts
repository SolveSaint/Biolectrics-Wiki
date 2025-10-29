import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// pull your dark palette into constants so we can use them below
const DARK_BG = "#161618"   // config.configuration.theme.colors.darkMode.light
const DARK_TEXT = "#ebebec" // config.configuration.theme.colors.darkMode.dark

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Biolectrics Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "plausible" },
    locale: "en-US",

    baseUrl: "solvesaint.github.io/Biolectrics-Wiki",
    // `canonicalUrl` isn’t required by Quartz and may be ignored; harmless to keep:
    canonicalUrl: "https://solvesaint.github.io/Biolectrics-Wiki",

    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: DARK_BG,
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: DARK_TEXT,
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({ theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),

      // Dark-mode OG cards
      Plugin.CustomOgImages({
        banner: "/static/biolectrics-banner.png",
        fontFamily: "Schibsted Grotesk",
        backgroundColor: DARK_BG,
        textColor: DARK_TEXT,
        colorScheme: "darkMode",
        size: { width: 1200, height: 630 },
      }),
    ],
  },
}

export default config