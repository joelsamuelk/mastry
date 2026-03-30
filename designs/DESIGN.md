# Design System Specification: The Personal OS

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is not a collection of UI widgets; it is a high-end, editorial environment designed to facilitate elite mentorship and career growth. Our Creative North Star is **The Digital Curator**. 

Unlike standard platforms that feel like cluttered "dashboards," this system feels like a bespoke operating system—quiet, intentional, and authoritative. We break the "template" look by utilizing extreme whitespace (The Spacing Scale), intentional asymmetry in layout, and a "Tonal Layering" philosophy that replaces traditional borders with depth and light. It is a fusion of Apple’s physical industrial design, Linear’s mathematical precision, and Notion’s spatial clarity.

---

## 2. Colors & Surface Philosophy

The palette is rooted in a monochromatic foundation with a singular, high-performance accent. We do not use color to decorate; we use it to direct focus.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Physical boundaries are defined strictly through background shifts. For example, a `surface-container-low` card sits on a `surface` background. The change in hex value is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of museum-grade paper.
- **Base Layer:** `surface` (#f9f9fb)
- **Secondary Tier:** `surface-container-low` (#f2f4f6) for large sectioning.
- **Interactive Tier:** `surface-container-lowest` (#ffffff) for primary cards and floating elements.
- **Deep Tier:** `surface-container-high` (#e4e9ee) for inset information like code snippets or AI insights.

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for navigation bars and floating action menus. Use `surface` colors at 80% opacity with a `20px` backdrop-blur. 
*Signature Texture:* Main CTAs should utilize a subtle linear gradient from `secondary` (#4e45e4) to `secondary-dim` (#4135d8) at a 145° angle to provide a sense of "lit" depth.

---

## 3. Typography: The Editorial Voice

We use a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision. Use `display-lg` and `headline-md` to create "Editorial Moments" where a single phrase dominates the screen.
*   **Body & Labels (Inter):** Chosen for its legibility at small scales. 
*   **The Hierarchy Rule:** We use high contrast in scale. A `display-sm` headline should often be paired with a `label-md` caption to create a professional, "published" feel rather than a "templated" one.

---

## 4. Elevation & Depth

### The Layering Principle
Hierarchy is achieved through **Tonal Stacking**. To make a mentor profile pop, do not add a shadow immediately; instead, place the white `surface-container-lowest` card against the `surface-container-low` background. This creates a "soft lift."

### Ambient Shadows
When a component must float (e.g., a modal or a primary dropdown), use the following shadow spec:
- **Y-Offset:** 12px
- **Blur:** 40px
- **Color:** `on-surface` (#2d3338) at **4% opacity**.
This mimics natural, ambient gallery lighting rather than a digital drop shadow.

### The "Ghost Border" Fallback
If accessibility requires a border (e.g., in high-contrast modes), use a **Ghost Border**: `outline-variant` (#acb3b8) at **15% opacity**. Never use 100% opaque lines.

---

## 5. Components

### High-End Mentor Cards (Investment Profile Style)
*   **Structure:** No borders. `surface-container-lowest` background. 
*   **Radius:** `lg` (2rem / 32px) for the outer container; `md` (1.5rem) for internal images.
*   **Content:** Use `title-lg` for names and `label-sm` (all caps, tracked out +5%) for "Investment Focus" or "Industry" tags.

### Structured AI Output Containers
*   **Concept:** Avoid chat bubbles. AI insights should appear as "Documents."
*   **Styling:** Use `surface-container-low` with a left-accented "Power Bar" in `secondary` (4px wide). Use `body-md` for the response to maintain a professional, analytical tone.

### Buttons
*   **Primary:** `secondary` (#4e45e4) background, `on-secondary` (#fbf7ff) text. Radius: `full`.
*   **Secondary:** `surface-container-highest` background. No border.
*   **Tertiary:** Ghost style. `primary` text, no background until hover (`surface-container-low`).

### Lists & Progress
*   **Lists:** Forbid dividers. Use `Spacing-8` (2.75rem) to separate items.
*   **Progress Rings:** Use a `2px` stroke width. The track should be `surface-container-high`, and the indicator should be `secondary`. It should feel like a fine Swiss watch complication.

---

## 6. Do’s and Don’ts

### Do
- **Use Asymmetric Grids:** Align text to the left but allow images or cards to bleed off-center to create a dynamic, "designed" feel.
- **Embrace White Space:** If you think there is enough space, add 20% more. Use `Spacing-16` and `Spacing-24` for section margins.
- **Micro-Transitions:** Every hover state should have a `200ms` ease-out transition on background color and a `2px` vertical lift.

### Don’t
- **Don’t use "Pure" Black for text:** Use `on-surface` (#2d3338) for body text to reduce eye strain and maintain a premium "ink on paper" look.
- **Don’t use Dividers:** Never use a horizontal rule `<hr>` to separate content. Use the Spacing Scale.
- **Don’t over-round small elements:** Use `sm` (0.5rem) for small chips to keep them from looking "bubbly" or childish. Keep `lg` and `xl` for large containers only.