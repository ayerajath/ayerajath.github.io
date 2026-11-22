// Build-time feature flags. Vite inlines these when the site is built, so a
// flag that is off ships none of its pages or routes.
//
// REDESIGN: the "systems that run on their own" homepage, the /log page and the
// new site description. Off by default.
//   Local preview: VITE_FLAG_REDESIGN=true npm run build   (or npm run dev)
//   Live site:     set the repository variable VITE_FLAG_REDESIGN to true in
//                  GitHub (Settings → Secrets and variables → Actions →
//                  Variables), then re-run the deploy workflow.
// eslint-disable-next-line no-undef -- defined in vite.config.js
export const REDESIGN = __FLAG_REDESIGN__;
