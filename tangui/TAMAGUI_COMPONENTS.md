# Tamagui Component Index

A comprehensive catalog of Tamagui components for adaptation into TanGui.

**Source**: [Tamagui UI Documentation](https://tamagui.dev/ui/intro)

---

## 📦 Core Primitives

### Layout Components

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **XStack** | Horizontal stack layout | Auto-aligns content along X axis, replaces View/div | ✅ Implemented (HStack) |
| **YStack** | Vertical stack layout | Auto-aligns content along Y axis, replaces View/div | ✅ Implemented (VStack) |
| **ZStack** | Z-axis stack layout | Layers elements on top of each other | ✅ Implemented (ZStack) |
| **Stack** | Generic stack component | Base for directional stacks | ✅ Implemented |
| **Group** | Horizontal/vertical groups | Natural spacing, disabled props, auto-orientation | ❌ Not implemented |

### Text & Typography

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Text** | Base text primitive | Themeable, size prop, media queries, hover/press/focus styles | ✅ Implemented |
| **SizableText** | Text with size variants | Auto-matches theme values | ⚠️ Partial (Text has size support) |
| **Paragraph** | Paragraph text | Extends SizableText | ⚠️ Can use Text with `as="p"` |
| **Headings (H1-H6)** | Semantic headings | H1, H2, H3, H4, H5, H6 tags | ⚠️ Can use Text with `as="h1"` etc |
| **Anchor** | Link component | Extends SizableText, href/target/rel attrs | ❌ Not implemented |

### Shape Primitives

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Square** | Square shape container | Fixed aspect ratio | ❌ Not implemented |
| **Circle** | Circle shape container | Fixed circular aspect ratio | ❌ Not implemented |

---

## 🎨 UI Components

### Buttons & Controls

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Button** | Interactive button | Variants, sizes, styling, animations | ✅ Implemented (7 variants) |
| **Switch** | Toggle switch | Accessible, controllable, sizable, animatable frame & thumb | ✅ Implemented |
| **Checkbox** | Checkbox input | Accessible, composable, sizable, controlled/uncontrolled, indeterminate state | ✅ Implemented |
| **RadioGroup** | Radio button group | Accessible, exclusive selection | ✅ Implemented |
| **Slider** | Range slider | Accessible, sizable, themeable | ✅ Implemented |
| **ToggleGroup** | Toggle button group | Multiple toggle buttons in a group | ❌ Not implemented |

### Form Components

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Input** | Text input field | Multiple types, validation states | ✅ Implemented (basic) |
| **Textarea** | Multi-line text input | Resizable, validation states | ⚠️ Partial (basic textarea) |
| **Form** | Form container | Native & web support, accessible outputs | ❌ Not implemented |
| **Label** | Form label | Accessibility support, nested controls, aria-labelledby | ✅ Implemented |
| **Select** | Dropdown select | Accessible, customizable | ✅ Implemented (with search support) |

### Display Components

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Card** | Content card | Sizable, themeable, elevate prop, background handling | ✅ Implemented (3 variants) |
| **Avatar** | Profile image | Aspect-fixed, fallback support, size prop sync | ❌ Not implemented |
| **Image** | Image component | SSR support, native & web, Tamagui style props | ❌ Not implemented |
| **Progress** | Progress bar | Sizable, themeable, animatable, compound API | ⚠️ Partial (in HUD/test) |
| **Separator** | Divider line | Horizontal/vertical dividers | ❌ Not implemented |
| **ListItem** | List item component | Pre-styled list items | ❌ Not implemented |
| **LinearGradient** | Gradient background | Native & web support, theme colors, Tamagui props | ❌ Not implemented |

### Overlay Components

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Dialog** | Modal dialog | Floating window, themeable, animatable, size props | ⚠️ Partial (DialogueBox is game-specific) |
| **AlertDialog** | Alert prompt | Native iOS AlertDialog support when true | ❌ Not implemented |
| **Popover** | Popover menu | Trigger-based, floating, mobile Sheet adaptation | ❌ Not implemented |
| **Tooltip** | Tooltip hover | Web-only, accessibility on native, mouse-stop trigger | ❌ Not implemented |
| **Sheet** | Bottom sheet | Mobile-friendly slide-up panel | ❌ Not implemented |
| **Toast** | Notification toast | Auto-close, pause on hover/focus, swipe gesture | ❌ Not implemented |

### Navigation Components

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Tabs** | Tab navigation | Accessible, composable, animatable, controlled/uncontrolled | ❌ Not implemented |
| **Accordion** | Collapsible sections | Keyboard navigation, expand one/multiple, controlled/uncontrolled | ❌ Not implemented |

---

## 🔧 Utility Components

| Component | Description | Features | TanGui Status |
|-----------|-------------|----------|---------------|
| **Spinner** | Loading indicator | Small/large sizes, theme colors | ❌ Not implemented |
| **ScrollView** | Scroll container | React Native ScrollView + Tamagui props | ❌ Not implemented |
| **VisuallyHidden** | Screen reader only | Visually hidden but accessible content | ⚠️ Partial (have .sr-only CSS) |
| **Unspaced** | Remove spacing | Removes spacing in layouts | ❌ Not implemented |
| **FocusScope** | Focus management | Keyboard focus control | ❌ Not implemented |
| **Spacer** | Flexible spacer | Auto-spacing in stacks | ✅ Implemented |

---

## 🌐 HTML Semantic Elements

| Component | Description | TanGui Status |
|-----------|-------------|---------------|
| **Section** | `<section>` element | ⚠️ Can use Box with `as="section"` |
| **Article** | `<article>` element | ⚠️ Can use Box with `as="article"` |
| **Main** | `<main>` element | ⚠️ Can use Box with `as="main"` |
| **Header** | `<header>` element | ⚠️ Can use Box with `as="header"` |
| **Aside** | `<aside>` element | ⚠️ Can use Box with `as="aside"` |
| **Footer** | `<footer>` element | ⚠️ Can use Box with `as="footer"` |
| **Nav** | `<nav>` element | ⚠️ Can use Box with `as="nav"` |

---

## 🎮 TanGui Game-Specific Components

These components are unique to TanGui for game development:

| Component | Description | Status |
|-----------|-------------|--------|
| **DialogueBox** | Game dialogue with typewriter effect | ✅ Implemented |
| **HUD** | Heads-up display | ✅ Implemented |
| **Menu** | Game menu with keyboard nav | ✅ Implemented |
| **HealthBar** | Animated health indicator | ⚠️ Part of HUD |
| **Inventory** | Grid-based item display | ❌ Planned |

---

## 🎯 Priority Components to Implement

Based on Tamagui's library and game UI needs:

### High Priority (Core Form Controls) ✅ COMPLETED
1. ✅ **Switch** - Common UI pattern
2. ✅ **Checkbox** - Essential form control
3. ✅ **RadioGroup** - Form selection
4. ✅ **Label** - Form accessibility
5. ✅ **Select** - Dropdown selection
6. ✅ **Slider** - Range input

### Medium Priority (Enhanced UI)
7. **Tabs** - Navigation pattern
8. **Accordion** - Collapsible content
9. **Toast** - User feedback
10. **Avatar** - User representation
11. **Progress** - Standalone component
12. **Separator** - Visual divider
13. **Tooltip** - Contextual help

### Lower Priority (Advanced Features)
14. **Sheet** - Mobile UX
15. **Popover** - Advanced menus
16. **AlertDialog** - Confirmations
17. **LinearGradient** - Visual enhancement
18. **Spinner** - Loading states
19. **Group** - Layout enhancement
20. **Square/Circle** - Shape primitives

---

## 📊 Implementation Status Summary

- ✅ **Fully Implemented**: 16 components
- ⚠️ **Partially Implemented**: 7 components
- ❌ **Not Implemented**: 31 components

**Total Tamagui Components Cataloged**: 54

---

## 📚 Sources

- [Tamagui UI Intro](https://tamagui.dev/ui/intro)
- [Tamagui HTML Elements](https://tamagui.dev/ui/html-elements)
- [Tamagui Button](https://tamagui.dev/ui/button)
- [Tamagui Checkbox](https://tamagui.dev/ui/checkbox)
- [Tamagui Switch](https://tamagui.dev/docs/components/switch)
- [Tamagui Form](https://tamagui.dev/ui/form)
- [Tamagui Dialog](https://tamagui.dev/ui/dialog)
- [Tamagui Tooltip](https://tamagui.dev/ui/tooltip)
- [Tamagui Toast](https://tamagui.dev/ui/toast)
- [Tamagui Tabs](https://tamagui.dev/ui/tabs)
- [Tamagui Accordion](https://tamagui.dev/ui/accordion)
- [Tamagui Card](https://tamagui.dev/ui/card)
- [Tamagui Avatar](https://tamagui.dev/docs/components/avatar)
- [Tamagui Progress](https://tamagui.dev/docs/components/progress)
- [Tamagui Linear Gradient](https://tamagui.dev/ui/linear-gradient)
- [Tamagui Stacks](https://tamagui.dev/ui/stacks)
- [Tamagui Input & Textarea](https://tamagui.dev/ui/inputs)

---

**Last Updated**: 2026-01-08
