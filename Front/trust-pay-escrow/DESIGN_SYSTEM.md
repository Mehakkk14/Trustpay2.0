# Trust Pay Escrow - Premium Design System & Component Guide

## Overview

This design system elevates Trust Pay to production-grade quality matching $10M+ SaaS platforms (Stripe, Linear, Vercel). All components feature:

- **Premium dark theme** with layered colors (220° 13% 4% base, not pure black)
- **Smooth animations** powered by Framer Motion
- **Superior visual hierarchy** with bold typography (font-weight 800-900)
- **Glass morphism** effects with optimized transparency
- **Consistent micro-interactions** across all elements

---

## Global Styles & CSS Updates

### Color System

**Dark Theme (Primary)**

```css
--background: 220 13% 4.7%; /* Soft dark base */
--foreground: 213 31% 91%; /* Clean white text */
--card: 220 13% 7%; /* Elevated cards */
--border: 217 33% 17%; /* Soft borders */
--muted: 217 33% 17%; /* Secondary elements */
```

### New Typography Classes

```css
.text-title-lg  /* text-5xl sm:text-6xl md:text-7xl font-[900] */
.text-title-md  /* text-3xl sm:text-4xl md:text-5xl font-[800] */
.text-title-sm  /* text-2xl sm:text-3xl font-[700] */
.text-body-lg   /* text-base sm:text-lg leading-relaxed */
.text-body-sm   /* text-sm leading-relaxed */
```

### Glass Morphism Variants

```css
.glass           /* border-white/10 bg-white/5 backdrop-blur-xl */
.glass-dark      /* border-white/5 bg-white/[0.02] backdrop-blur-xl */
.glass-elevated  /* border-white/10 bg-white/[0.08] backdrop-blur-2xl shadow-xl */
```

### Gradient Utilities

```css
.gradient-text          /* Colorful primary gradient */
.gradient-text-primary  /* Indigo to purple gradient */
.hover-lift             /* Scale & shadow on hover */
.animate-pulse-glow     /* Breathing glow animation */
```

---

## Core Components

### 1. PremiumCard (src/components/shared/PremiumCard.tsx)

**Purpose:** Versatile elevated container for all card-based content

**Variants:**

- `default` - Base glass styling
- `elevated` - Enhanced shadow for critical content
- `glass` - Maximum transparency
- `gradient` - Colorful gradient border

**Hover Effects:**

- `lift` - Scale up with shadow (default)
- `glow` - Pulsing color glow
- `border` - Border color animation
- `none` - No animation

**Usage:**

```tsx
<PremiumCard variant="elevated" hover="lift" interactive={true}>
  <h3>Card Title</h3>
  <p>Card content here</p>
</PremiumCard>
```

---

### 2. PremiumButton (src/components/shared/PremiumButton.tsx)

**Purpose:** Premium button component with multiple styles

**Variants:**

- `primary` - Gradient indigo-to-purple (primary CTAs)
- `secondary` - White/glass style
- `outline` - Indigo outline
- `ghost` - Minimal background

**Sizes:**

- `sm` - Small buttons
- `md` - Default/recommended
- `lg` - Large CTAs

**Features:**

- Smooth scale animations
- Built-in loading state with spinner
- Disabled state handling
- Icon support (left/right positioning)

**Usage:**

```tsx
<PremiumButton
  variant="primary"
  size="lg"
  loading={isLoading}
  onClick={handleClick}
>
  Get Started
</PremiumButton>
```

---

### 3. PremiumBadge (src/components/shared/PremiumBadge.tsx)

**Purpose:** Status indicators and labels with color variants

**Variants:**

- `primary` - Indigo (default)
- `success` - Emerald
- `warning` - Amber
- `error` - Red
- `info` - Cyan

**Features:**

- Optional icon support
- Animated pulse option
- Fully customizable

**Usage:**

```tsx
<PremiumBadge variant="success" icon={<CheckIcon />}>
  Completed
</PremiumBadge>
```

---

### 4. GradientText (src/components/shared/GradientText.tsx)

**Purpose:** Animated gradient text for headlines

**Variants:**

- `primary` - Indigo → Purple → Pink
- `secondary` - Indigo → Purple
- `success` - Emerald → Cyan
- `warning` - Amber → Orange

**Features:**

- Optional continuous animation
- Responsive text sizing
- Works with any heading level

**Usage:**

```tsx
<h1>
  The best <GradientText animate>crypto escrow</GradientText> platform
</h1>
```

---

### 5. PremiumJobCard (src/components/escrow/PremiumJobCard.tsx)

**Purpose:** Job listing card with status, progress, and rich features

**Features:**

- Dynamic status badges (open, in-progress, completed, disputed)
- Progress bar animation for active jobs
- Freelancer assignment display
- Budget highlight with icon
- Hover elevation effect

**Status Styling:**

- `open` - Green badge
- `in-progress` - Blue badge + progress bar
- `completed` - Green checkmark
- `disputed` - Red warning

**Usage:**

```tsx
<PremiumJobCard
  title="Website Redesign"
  description="Full UI/UX overhaul for SaaS platform"
  budget="$5,000 USDC"
  status="in-progress"
  progressAmount={65}
  freelancer="Alex Dev"
  timeCreated="2 days ago"
  onClick={() => navigate(`/job/${id}`)}
/>
```

---

### 6. PremiumAccordion (src/components/shared/PremiumAccordion.tsx)

**Purpose:** Expandable content sections with smooth animations

**Features:**

- Multiple/single open modes
- Icon support per item
- Optional badges
- Smooth height animation
- Keyboard accessible

**Usage:**

```tsx
<PremiumAccordion
  items={[
    {
      id: "faq1",
      title: "How does escrow work?",
      icon: <QuestionIcon />,
      badge: "Popular",
      content: <p>Explanation here...</p>,
    },
  ]}
  allowMultiple={false}
/>
```

---

### 7. Dashboard Components (src/components/shared/DashboardComponents.tsx)

#### DashboardPageHeader

Header with title, description, icon, and action buttons

```tsx
<DashboardPageHeader
  title="Hirer Dashboard"
  description="Manage your jobs and escrow funds"
  icon={<BriefcaseIcon className="h-8 w-8 text-indigo-400" />}
  badge="3 Active"
  action={<PremiumButton>New Job</PremiumButton>}
/>
```

#### DashboardSection

Premium container for dashboard sections

```tsx
<DashboardSection>
  <h2>Recent Activity</h2>
  {/* Content */}
</DashboardSection>
```

#### DashboardStatCard

Animated stat display with optional icons and change indicators

```tsx
<DashboardStatCard
  label="Total Earnings"
  value="$24,500"
  change="+12% from last month"
  changeType="positive"
  icon={<TrendingUpIcon className="h-8 w-8 text-emerald-400" />}
/>
```

---

### 8. Form Components (src/components/shared/PremiumForm.tsx)

#### PremiumInput

```tsx
<PremiumInput
  label="Email Address"
  placeholder="you@example.com"
  type="email"
  icon={<MailIcon className="h-5 w-5" />}
  error={emailError}
  required
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### PremiumTextarea

```tsx
<PremiumTextarea
  label="Project Description"
  placeholder="Describe your project..."
  rows={6}
  error={descError}
  onChange={(e) => setDescription(e.target.value)}
/>
```

#### PremiumForm

```tsx
<PremiumForm onSubmit={handleSubmit}>
  <PremiumInput {...props} />
  <PremiumTextarea {...props} />
  <PremiumButton type="submit">Submit</PremiumButton>
</PremiumForm>
```

---

## Animation Patterns

### Entry Animations (Container → Items)

**staggerChildren Pattern:**

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>;
```

### Hover Interactions

**Card Lift:**

```tsx
whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(..., 0.15)' }}
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```

**Icon Pulse:**

```tsx
animate={{ scale: [1, 1.05, 1] }}
transition={{ duration: 2, repeat: Infinity }}
```

**Text Slide:**

```tsx
animate={{ x: [0, 2, 0] }}
transition={{ duration: 1.5, repeat: Infinity }}
```

---

## Design Principles

### 1. Visual Hierarchy

- **Headlines:** 800-900 font-weight, use gradient for key terms
- **Body text:** 400-500 weight, 60-70% opacity for secondary
- **Interactive:** Use color to emphasize CTAs (primary gradient)

### 2. Spacing System

- **Cards:** 8px-10px padding (2rem-2.5rem)
- **Sections:** 24px (6rem) between sections
- **Grid gaps:** 6px-8px for items (1.5rem-2rem)

### 3. Color Usage

- **Primary actions:** Gradient indigo → purple
- **Success states:** Emerald green
- **Warnings:** Amber orange
- **Errors:** Red
- **Info:** Cyan blue
- **Neutral:** White/gray at 50-70% opacity

### 4. Micro-interactions

- All interactive elements scale 1.02-1.05 on hover
- Buttons animate down 2-4px on click
- Cards lift 8px with shadow expansion
- Smooth 0.2-0.3s transitions
- Stagger child animations by 0.1s

### 5. Dark Theme Best Practices

- Never use pure black (#000000)
- Use layered colors with transparency
- Soft glows instead of harsh borders
- High contrast text (91% lightness)
- Semi-transparent overlays (3-8% opacity)

---

## Layout Patterns

### Landing Page Structure

```
1. Sticky Navbar (16px height, glass morphism)
2. Hero Section (32px+ vertical padding)
3. Stats Strip (16px padding, thin border)
4. Features Grid (24px padding, 6px gap)
5. How It Works (24px padding, connectors)
6. CTA Section (24px padding, gradient background)
7. Footer (12px padding, minimal)
```

### Dashboard Structure

```
1. Navbar (same as landing)
2. Page Header (with icon, badge, action)
3. Stat Cards Grid (responsive 1-2-4 cols)
4. Content Sections (PremiumCard wrapped)
5. Data Tables (use PremiumCard for rows)
6. Modals/Overlays (use glass-elevated)
```

---

## Best Practices

### ✅ DO

- Use `text-title-*` classes for all headings
- Always wrap external links in `<Link>` component
- Use `whileInView` for sections entering viewport
- Nest animations in containers for stagger effect
- Test animations at 1.5x speed in slow motion
- Use semantic HTML (buttons, inputs, etc.)
- Add focus rings for keyboard navigation
- Keep animations under 500ms for micro-interactions
- Use `transition: { duration: 0.3 }` as default

### ❌ DON'T

- Use pure black or pure white backgrounds
- Add animations to every element
- Nest too many motion components (performance)
- Use hard-coded colors (use CSS vars)
- Animate scale + position simultaneously
- Add gloss/shine overlays to cards
- Use lowercase for section headers
- Add text shadows in dark theme
- Animate on page load without viewport trigger
- Use transform: all with expensive properties

---

## Component Integration Examples

### Creating a Job List Page

```tsx
import { PremiumJobCard } from "@/components/escrow/PremiumJobCard";
import {
  DashboardPageHeader,
  DashboardSection,
} from "@/components/shared/DashboardComponents";
import { PremiumButton } from "@/components/shared/PremiumButton";
import { motion } from "framer-motion";

export default function JobsPage() {
  return (
    <DashboardSection>
      <DashboardPageHeader
        title="Browse Jobs"
        description="Find and apply to available projects"
        action={<PremiumButton>Post Job</PremiumButton>}
      />

      <motion.div className="grid gap-6 mt-8">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <PremiumJobCard {...job} onClick={() => navigate(job.id)} />
          </motion.div>
        ))}
      </motion.div>
    </DashboardSection>
  );
}
```

---

## Responsive Design

### Breakpoints

- Mobile: 0-640px (sm)
- Tablet: 641-1024px (md)
- Desktop: 1025px+ (lg)

### Responsive Classes Used

```tsx
// Heading sizes
className = "text-3xl sm:text-4xl md:text-5xl";

// Grid layouts
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

// Padding
className = "px-4 sm:px-6 lg:px-8 py-16 sm:py-24";

// Hidden elements
className = "hidden md:flex";
```

---

## Performance Notes

- Framer Motion animations are GPU-accelerated (transform, opacity only)
- Glass morphism uses hardware acceleration (webkit-backdrop-filter)
- Staggered animations reduce janky perceived performance
- useInView prevents rendering off-screen elements
- Memoize heavy list components

---

## Future Enhancements

- Add dark mode CSS for light theme variants
- Create Storybook for component documentation
- Add E2E animation tests
- Implement haptic feedback for mobile
- Add page transition animations
- Create reusable animation variants library

---

**Last Updated:** April 2026  
**Design System Version:** 1.0  
**Framer Motion Version:** 12.38.0+
