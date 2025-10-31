import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
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

// components for pages that display a single page (e.g. a single note)
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
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
	Component.DesktopOnly(Component.TableOfContents()),
	Component.Backlinks(),
	Component.RecentNotes({
  showTags: false,
  limit: 3,
  linkToMore: "recent-notes",
  filter: (f) => {
    const slug = Array.isArray(f.slug) ? f.slug.join("/") : (f.slug ?? "")
    return (
      !slug.startsWith("tags/") &&
      !slug.startsWith("folders/") &&
      Boolean(f.frontmatter?.title)
    )
  },
}),

//  Component.Graph(),
],

}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}

export const recentNotesPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),        // optional
    Component.TagList(),            // optional
  ],
  pageBody: Component.RecentNotes({
    title: "All Recent Notes",
    limit: 100,
    showTags: true,
    // Quartz already defaults to date then lexicographic; keep or remove this:
    sort: Component.byDateAndAlphabetical,
    filter: (f) => {
      const slug = Array.isArray(f.slug) ? f.slug.join("/") : (f.slug ?? "")
      return (
        !slug.startsWith("tags/") &&
        !slug.startsWith("folders/") &&
        Boolean(f.frontmatter?.title)
      )
    },
  }),

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
  right: [],
}

export const pageLayout = {
  "recent-notes": recentNotesPageLayout,
}
