import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

/** Helper: normalize slugs and exclude special pages */
const isNormalPage = (slugLike: unknown) => {
  const s =
    typeof slugLike === "string"
      ? slugLike
      : Array.isArray(slugLike)
        ? slugLike.join("/")
        : ""
  // drop leading slashes and trailing /index
  const norm = s.replace(/^\/+/, "").replace(/\/index$/, "")
  return (
    norm !== "recent-notes" &&         // exclude the Recent Notes page itself
    !norm.startsWith("tags/") &&
    !norm.startsWith("folders/")
  )
}

// ---------------------------------------------------------------------------
// components shared across all pages
// ---------------------------------------------------------------------------
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Biolectrics Discord": "https://discord.gg/AZHPuPykMn",
    },
  }),
}

// ---------------------------------------------------------------------------
// components for pages that display a single page (e.g. a single note)
// ---------------------------------------------------------------------------
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    // Recent Notes widget first, but hide it on /recent-notes
    Component.ConditionalRender({
      component: Component.RecentNotes({
        showTags: false,
        limit: 3,
        linkToMore: "recent-notes",
        filter: (f) => isNormalPage(f.slug) && Boolean(f.frontmatter?.title),
      }),
      condition: (page) => {
        const s =
          typeof page.fileData.slug === "string"
            ? page.fileData.slug
            : Array.isArray(page.fileData.slug)
              ? page.fileData.slug.join("/")
              : ""
        const norm = s.replace(/^\/+/, "").replace(/\/index$/, "")
        return norm !== "recent-notes"
      },
    }),

    // Then TOC and Backlinks
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),

    // Component.Graph(), // optional
  ],
}

// ---------------------------------------------------------------------------
// components for pages that display lists of pages (e.g. tags or folders)
// ---------------------------------------------------------------------------
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        showTags: false,
        limit: 3,
        linkToMore: "recent-notes",
        filter: (f) => isNormalPage(f.slug) && Boolean(f.frontmatter?.title),
      }),
      condition: (page) => {
        const s =
          typeof page.fileData.slug === "string"
            ? page.fileData.slug
            : Array.isArray(page.fileData.slug)
              ? page.fileData.slug.join("/")
              : ""
        const norm = s.replace(/^\/+/, "").replace(/\/index$/, "")
        return norm !== "recent-notes"
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// ---------------------------------------------------------------------------
// Dedicated layout for /recent-notes page
//   - Body shows the full Recent Notes list
//   - Sidebar is empty on this page
//   - The page excludes itself from the list
// ---------------------------------------------------------------------------
export const recentNotesPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  pageBody: Component.RecentNotes({
    title: "All Recent Notes",
    limit: 100,
    showTags: true,
    sort: Component.byDateAndAlphabetical, // newest, then A→Z
    filter: (f) => isNormalPage(f.slug) && Boolean(f.frontmatter?.title),
  }),
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [], // keep empty to avoid duplication on this page
}

// Map the specific slug to the dedicated layout
export const pageLayout: Record<string, PageLayout> = {
  "recent-notes": recentNotesPageLayout,
}
