# ✨ WhimsyWorkshop

A tiny, slightly whimsical design-system workshop for building **themeable CSS components**.

WhimsyWorkshop lets you configure global design tokens and component styles, preview them live, and generate reusable CSS for your own projects.

The goal isn't to build the whole app for you.

It's to build the **design system underneath it**.

---

## 🌱 Current Status

WhimsyWorkshop is being built incrementally, starting with the core theme system and expanding into reusable components.

### 🎨 Theme

* Color system
* Typography
* Spacing
* Border radius
* Shadows
* Theme presets
* Custom theme editing
* Image-based theme generation
* Live preview
* Generated CSS
* Preset automatically switches to **Custom** when values are manually changed
* Generated CSS and live preview use the same resolved configuration

### 🔘 Buttons

* Small / Medium / Large sizes
* Padding linked to global spacing
* Typography linked to global typography
* Custom typography support
* Live preview for all sizes
* Theme-controlled colours and states
* Generated CSS

### 📝 Inputs

* Small / Medium / Large sizes
* Text inputs
* Textareas
* Padding linked to global spacing
* Typography linked to global typography
* Custom typography support
* Live preview
* Generated CSS

### 🃏 Cards

* Main Card
* Sub Card
* Padding linked to global spacing
* Header background linked to Theme colours
* Card background linked to Theme colours
* Radius linked to global radius
* Multi-select border sides
* Border colour inherited from Theme
* Small / Medium / Large / None shadows
* Main + Sub card preview
* Generated CSS

---

## 🧠 Design Philosophy

WhimsyWorkshop follows one very important rule:

> **A configuration should change the whole system, not just the preview.**

When a global value changes, components using that value should update with it.

For example:

```css
--space-md: 16px;
```

Buttons, Inputs and Cards can all reference that token rather than storing their own unrelated values.

Likewise, component colours should reference Theme tokens instead of introducing unnecessary custom colours.

This keeps the generated CSS:

* Consistent
* Reusable
* Themeable
* Easy to maintain
* Actually useful outside the Workshop

---

## 🧩 Component Architecture

Components are designed around global design tokens wherever possible.

```text
Theme
 ├── Colours
 ├── Typography
 ├── Spacing
 ├── Radius
 └── Shadows

Components
 ├── Buttons
 ├── Inputs
 ├── Cards
 └── Tabs
      ...
```

Components can add their own configuration where necessary, but should avoid duplicating values that already belong to the global Theme.

---

## 🛠️ Planned Components

### 🟢 Next

#### Tabs

* Presets
* Colour
* Border sides
* Border radius
* Shape / preset behaviour
* File-tab style
* Active tab without bottom border
* Preset → Custom when edited
* Complete preset implementation in generated CSS
* Live preview

### 🟢 After Tabs

#### Notices + Toasts

* Info
* Success
* Warning
* Error
* Shared notice styling
* Individual semantic colours
* Toast position
* Default timeout
* Button-triggered Toast preview

### 🟡 Stretch Goal

#### Layout

* Header on/off
* Sidebar on/off
* Layout presets
* 50/50, 70/30, etc.
* Add/remove columns
* Percentage-based sizing
* Automatic remaining-percentage calculation

---

## 🧹 CSS Generation

WhimsyWorkshop generates CSS from the resolved configuration.

Generated CSS is also passed through a lightweight formatter to keep the output readable and consistent.

The formatter handles things such as:

* Normalising line endings
* Removing tabs
* Cleaning excessive spaces
* Joining values split across lines after `:`
* Formatting braces
* Preserving intentional blank lines
* Keeping multi-value declarations readable

The goal is not to replace a full CSS parser, but to make generated CSS pleasant enough to actually use.

---

## 🚧 Project Status

This is very much a **build-as-I-go personal project**.

The first version is intentionally being developed component by component rather than trying to create a giant visual builder all at once.

Current focus:

```text
Theme       ✅
Buttons     ✅
Inputs      ✅
Cards       ✅
Tabs        🔜
Notices     🔜
Toasts      🔜
Layout      🟡
```

There will probably be questionable decisions, tiny disasters, and at least a few moments where something mysteriously disappears from the preview.

That's part of the workshop. ✨

---

## 🤝 Co-Collaborators

### WhimsyTinkly

**Creator / Builder**

The human responsible for the ideas, design decisions, implementation, debugging, and occasionally asking:

> "why did it poof"

### ChatGPT

**AI Coding Co-Collaborator / Development Buddy**

Helps with:

* Architecture brainstorming
* CSS and JavaScript implementation
* Debugging
* Refactoring
* Design-system decisions
* Feature planning
* Occasionally discovering why something poofed

Built collaboratively, one component at a time. 💜

---

## 🌟 Philosophy

WhimsyWorkshop is meant to be useful, but also fun.

Build the boring foundations properly.

Keep the design system consistent.

Make the generated code something you'd actually want to use.

---

✨ A note before entering the Workshop:
This project is built for fun, experimentation, and learning.
Seriousness not included. Side effects may include excessive tweaking, unnecessary excitement, and saying "hehe" when something finally works.

---

## 🔗 Live Project

[WhimsyTheme](https://whimsytinkly.github.io/ThemeBuilder/)

---

## 💜 Built With

* HTML
* CSS
* JavaScript
* CSS Custom Properties
* A suspicious amount of `${"`"}"` template literals
* And ✨ whimsy ✨
