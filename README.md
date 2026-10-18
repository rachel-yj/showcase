# SHOWCASE — Rachel Li's portfolio

A one-page site styled as an early-2000s desktop. The music player is the navigation: on the home page it sits over the giant name and the page scrolls down into About Me; on every other page it docks on the left, the page title moves to the top, and desktop icons open that page's windows.

## Files

```
index.html          the whole site (pages are #home, #about, #experience, #interests, #projects, #contact)
assets/rl-base.css  design tokens and shared components (windows, buttons, icons)
assets/site.css     layout for the home page, inner pages and transitions
assets/site.js      player navigation, page transitions, icon desktops, windows,
                    and the PAGES list at the top, where all page content lives
```

To change content, edit the `PAGES` list near the top of `assets/site.js`. Each icon has a `file` name, an icon `type` (exe, txt, pdf, htm, ppt, jpg, mp3, dir) and the HTML `body` of its window. All copy is a [bracketed placeholder]; replace each one with your own words. The home and About copy is in `index.html`. Closed About windows go to the trash can in the About header, where they can be restored.

## Publish free on GitHub Pages

1. Create a GitHub account if you don't have one.
2. Make a new **public** repository. Naming it `yourusername.github.io` gives you the address `https://yourusername.github.io`; any other name gives `https://yourusername.github.io/repo-name`.
3. In the repository, choose **Add file → Upload files** and drag in `index.html`, `README.md` and the whole `assets` folder. Commit.
4. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick the `main` branch and the `/ (root)` folder, and save.
5. After a minute or two the site is live at the address shown on that page.

To update the site later, upload the changed files again (same names) and commit.
