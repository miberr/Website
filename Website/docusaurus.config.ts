import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
require("dotenv").config();

const config: Config = {
    title: "Mikko Berg, senior Microsoft Power Platform consultant",
    tagline:
        "Power Platform consultant, trainer and all around tech enthusiast.",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://mikkoberg.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    plugins: [
        "docusaurus-plugin-sass",
        [
            "@docusaurus/plugin-ideal-image",
            {
                quality: 85,
                max: 2000,
                min: 500,
                steps: 4,
                disableInDev: false,
            },
        ],
        [
            "@microsoft/docusaurus-plugin-application-insights",
            {
                config: {
                    connectionString:
                        process.env
                            .APPLICATION_INSIGHTS_INSTRUMENTATION_CONNECTION_STRING,
                    autoTrackPageVisitTime: true,
                },
                enableClickAnalytics: true,
            },
        ],
    ],

    presets: [
        [
            "classic",
            {
                docs: false,
                blog: {
                    archiveBasePath: null,
                    authorsBasePath: "/authors",
                    blogTitle: "Fusion Development in Microsoft Power Platform",
                    blogDescription:
                        "Blogs about Microsoft Power Platform, especially fusion develoment angle.",
                    blogSidebarCount: "ALL",
                    blogSidebarTitle: "Recent Posts",
                    feedOptions: {
                        type: "all",
                        copyright: `Copyright © ${new Date().getFullYear()} Mikko Berg`,
                    },
                    // Useful options to enforce blogging best practices
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                    postsPerPage: 20,
                    routeBasePath: "/blog",
                    showLastUpdateTime: true,
                    showReadingTime: true,
                    tagsBasePath: "/tags",
                },
                sitemap: {
                    lastmod: "date",
                    changefreq: "weekly",
                    priority: 0.5,
                    ignorePatterns: ["/blog/tags/**"],
                    filename: "sitemap.xml",
                    createSitemapItems: async (params) => {
                        const { defaultCreateSitemapItems, ...rest } = params;
                        const items = await defaultCreateSitemapItems(rest);
                        return items.filter(
                            (item) => !item.url.includes("/page/")
                        );
                    },
                },
                theme: {
                    customCss: [require.resolve("./src/css/custom.scss")],
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: "img/social-card.png",
        metadata: [
            {
                name: "description",
                content:
                    "Power Platform consultant, trainer and all around tech enthusiast.",
            },
            {
                name: "keywords",
                content:
                    "microsoft, power platform, powerfx, c#, javascript, azure, power automate, power apps, power bi, dynamics 365, consultant, trainer, developer",
            },
        ],
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            hideOnScroll: false,
            title: "Mikko Berg",
            logo: {
                alt: "Mikko Berg Logo",
                src: "img/logo.svg",
            },
            items: [
                { to: "/blog", label: "Blog", position: "right" },
                { to: "/projects", label: "Projects", position: "right" },
            ],
        },
        footer: {
            style: "light",
            logo: {
                alt: "Logo",
                src: "img/logo.svg",
                href: "https://mikkoberg.com",
                width: 100,
                height: 25,
            },
            links: [
                {
                    label: "GitHub",
                    href: "https://github.com/miberr",
                },
                {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/miberr",
                },
                {
                    label: "About me",
                    to: "/",
                },
                {
                    label: "Blog",
                    to: "/blog",
                },
                {
                    label: "Projects",
                    to: "/projects",
                },
            ],

            copyright: `Copyright © ${new Date().getFullYear()} Mikko Berg`,
        },
        prism: {
            additionalLanguages: ["csharp"],
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
