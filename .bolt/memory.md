# Project memory

## Product intent & audience

- Immersive, cinematic luxury Indian wedding invitation website for **Pushpa and Srikanth**.
- Audience: wedding guests receiving a digital invitation; experience should feel premium and memorable rather than functional/form-like.
- Flow is sequential/screen-based: temple door scene → “Open Invitation” → subsequent reveals.

## Brand personality & voice

- Royal, elegant, ceremonial; Indian wedding tradition meets cinematic presentation.
- Tone is reverent and celebratory; couple names are treated as hero text.

## Visual design & UX direction

- Palette: royal green + cream as primary luxury pairing.
- Key interactive components: interactive temple doors, heart-shaped scratch-off date reveal, horizontal wedding album.
- Door scene is a hero moment: doors should be prominent but must keep all critical content (title, names, “Open Invitation” button) within the visible viewport.
- Mobile is a primary surface — compositions must fit one screen without clipping CTAs; compress height on small screens while preserving cinematic feel on desktop.
- Use Lucide React for icons; JSX + Tailwind only unless explicitly requested otherwise.
- Import via `@/` alias to `src/`.

## Decisions, constraints & rationale

- Door scene mobile layout was too tall, causing the “Open Invitation” button to render below the clipped viewport (perceived as “next screen not working”). Fix: shorter doors, reduced spacing around title/names, slightly smaller name size on small screens, button brought into viewport; desktop layout kept larger/cinematic.
- Production build is expected to pass after changes.
- No UI/theme/icon packages beyond template defaults unless necessary.

## Open questions & assumptions

- Exact ordering/content of screens after the door scene is inferred; confirm sequence if further breaks occur.
- Scratch-off and horizontal album implementation details not yet visible; revisit when those screens are addressed.
- Accessibility (keyboard/AT support for scratch-off and door interactions) not yet discussed.