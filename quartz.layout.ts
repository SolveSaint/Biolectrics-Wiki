import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Shared
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: { "Biolectrics Discord": "https://discord.gg/AZHPuPykMn" },
  }),
}

// Helpers
const notSpecial = (slug: string) =>
  slug !== "recent-notes" && !slug.startsWith("tags/") && !slug.startsWith("folders/")

const hasTitle = (f: any) => Boolean(f.frontmatter?.title)
const slugOf = (f: any) => Array.isArray(f.slug) ? f.slug.join("/") : (f.slug ?? "")

// Single-note pages
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
    // Recent notes first
    Component.ConditionalRender({
      component: Component.RecentNotes({
        showTags: false,
        limit: 3,
        linkToMore: "recent-notes",
        filter: (f) => {
          const slug = slugOf(f)
          return notSpecial(slug) && hasTitle(f)
        },
      }),
      condition: (page) => {
        const slug = Array.isArray(page.fileData.slug) ? page.fileData.slug.join("/") : (page.fileData.slug ?? "")
        return slug !== "recent-notes"
      },
    }),

    // Then ToC and Backlinks below it
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// List pages (tags, folders, etc.)
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
  right: [],
}

// The /recent-notes page body
export const recentNotesPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  pageBody: Component.RecentNotes({
    title: "All Recent Notes",
    limit: 100,
    showTags: true,
    sort: Component.byDateAndAlphabetical,
    filter: (f) => {
      const slug = slugOf(f)
      return notSpecial(slug) && hasTitle(f)
    },
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
  right: [], // keep empty so the list is only in body
}

// Map slug to layout
export const pageLayout = {
  "recent-notes": recentNotesPageLayout,
}
