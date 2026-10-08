# TrailPicker mobile builder layout

Based on your latest export, Pasted text(20261008-010239).txt. Extract mobile-update into your project root. Stop the dev server and run:

```cmd
node mobile-update/install.mjs
npm run build
npm run dev
```

No new packages, database changes, or reset. Installer checks all originals before writing, backs them up with .before-mobile-layout, and refuses to overwrite unexpected edits. Delete the extracted mobile-update folder after successful installation if desired. To undo, copy the .before-mobile-layout files back over their originals.

Changes apply only below 768px. Laptop screens retain the original table columns, spacing, text sizes, and controls. The layout at 768px and above is unchanged.

On mobile, BuildRow stacks the category name above its selections. Product names wrap, including long unbroken custom names. Quantity/category controls remain beside or below the name as space allows and have larger tap targets. Weight and price have mobile labels, followed by Buy/Remove. Add Gear and custom-item forms wrap within the available width. The table-wide heading is hidden on phones because each item carries its own labels. Total Cost uses a two-column layout. The share link, compatibility bar, and weight statistics wrap without forcing horizontal page scrolling; long build titles also wrap.

Actions, authorization, calculation logic, links, forms, and desktop appearance are preserved. No server actions, schema, or trip-planner internals were changed.

Verification: browser harness using the actual updated components and a mock catalog/actions. Screenshots were pixel-identical to the original components at 1024px and 1440px. Mobile checks passed at 320, 360, 390, 414, 600, and 767px, including open custom-item forms, long names, tap targets, quantity, worn/consumable, remove, and add payloads. These isolated checks do not replace running npm run build against your real generated Prisma client and environment.
