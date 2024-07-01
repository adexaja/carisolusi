export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cari Solusi",
  description: "Cari Solusi dengan Ayat Al-Quran.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      disabled: false,
    },
    {
      title: "About",
      href: "/about",
      disabled: false,
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
