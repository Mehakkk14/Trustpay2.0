# Trust Pay Escrow - Premium UI Quick Start Guide

## ⚡ Quick Start (2 minutes)

### Run Development Server

```bash
npm run dev
# Runs on http://localhost:3001 (or next available port)
```

### Build for Production

```bash
npm run build
# Creates optimized production bundle
```

### Start Production Server

```bash
npm start
# Runs built-in Next.js server
```

---

## 📁 New Components Summary

### Import & Use

All new components are ready to import and use immediately:

```tsx
// Containers
import { PremiumCard } from "@/components/shared/PremiumCard";
import {
  DashboardPageHeader,
  DashboardStatCard,
} from "@/components/shared/DashboardComponents";

// Buttons & Actions
import { PremiumButton } from "@/components/shared/PremiumButton";
import { PremiumBadge } from "@/components/shared/PremiumBadge";
import { PremiumAccordion } from "@/components/shared/PremiumAccordion";

// Forms
import {
  PremiumInput,
  PremiumTextarea,
  PremiumForm,
} from "@/components/shared/PremiumForm";

// Typography
import { GradientText } from "@/components/shared/GradientText";

// Job Cards
import { PremiumJobCard } from "@/components/escrow/PremiumJobCard";

// Animations
import { AnimatedContainer } from "@/components/shared/AnimatedContainer";
```

---

## 🎨 Design System Access

### Global CSS Classes

```tsx
// Typography
<h1 className="text-title-lg">Large Heading</h1>
<p className="text-body-lg">Body text</p>

// Glass Effects
<div className="glass">Subtle glass</div>
<div className="glass-elevated">Premium glass</div>

// Gradients
<span className="gradient-text">Colorful gradient text</span>
<span className="gradient-text-primary">Indigo to purple</span>

// Animations
<div className="animate-float">Floats up and down</div>
<div className="animate-pulse-glow">Breathing glow effect</div>

// Utilities
<div className="hover-lift">Lifts on hover</div>
```

---

## 🎯 Component Examples

### Basic Card

```tsx
<PremiumCard variant="elevated" hover="lift">
  <h3>Title</h3>
  <p>Content here</p>
</PremiumCard>
```

### Action Button

```tsx
<PremiumButton
  variant="primary"
  size="lg"
  onClick={() => console.log("clicked")}
>
  Click Me
</PremiumButton>
```

### Badge with Status

```tsx
<PremiumBadge variant="success" icon={<CheckIcon />}>
  Completed
</PremiumBadge>
```

### Dashboard Stat

```tsx
<DashboardStatCard
  label="Total Revenue"
  value="$24,500"
  change="+12% from last month"
  changeType="positive"
  icon={<TrendingUpIcon className="h-8 w-8" />}
/>
```

### Form Input

```tsx
<PremiumInput
  label="Email"
  placeholder="you@example.com"
  type="email"
  icon={<MailIcon />}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Job Card

```tsx
<PremiumJobCard
  title="Build E-commerce Site"
  description="Full-stack React + Node.js application"
  budget="$8,000 USDC"
  status="in-progress"
  progressAmount={45}
  freelancer="Jane Developer"
  timeCreated="3 days ago"
  onClick={() => navigate(`/job/${id}`)}
/>
```

### Animated Container

```tsx
<AnimatedContainer type="slideIn" delay={0.2}>
  <p>This content slides in on view</p>
</AnimatedContainer>
```

---

## 🚀 Common Patterns

### Staggered List Animation

```tsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      <PremiumCard>{item.content}</PremiumCard>
    </motion.div>
  ))}
</motion.div>;
```

### Page Header with Action

```tsx
<DashboardPageHeader
  title="My Jobs"
  description="Manage and monitor your job postings"
  icon={<BriefcaseIcon className="h-8 w-8 text-indigo-400" />}
  badge="5 Active"
  action={<PremiumButton>Post New Job</PremiumButton>}
/>
```

### Form with Multiple Fields

```tsx
<PremiumForm onSubmit={handleSubmit}>
  <PremiumInput label="Job Title" required />
  <PremiumTextarea label="Description" rows={6} required />
  <PremiumInput label="Budget (USDC)" type="number" />
  <PremiumButton type="submit">Create Job</PremiumButton>
</PremiumForm>
```

---

## 📋 Documentation Files

1. **DESIGN_SYSTEM.md** - Complete design system reference
   - Color system, typography, components usage
   - Animation patterns, best practices
   - Responsive design guidelines

2. **IMPLEMENTATION_CHECKLIST.md** - What was delivered
   - All 8 new components listed
   - Files modified/created
   - Deployment checklist

3. **This file** - Quick start guide

---

## 🎬 Animation Tips

### Make animations feel premium:

✅ **DO:**

- Use easing: `[0.23, 1, 0.32, 1]`
- Duration: 0.2-0.5s for micro, 0.5-1s for macro
- Spring physics: `stiffness: 300, damping: 30`
- Stagger children: `0.1s` delay

❌ **DON'T:**

- Animate every element (too busy)
- Use `transform: all` (performance)
- Duration > 800ms for micro-interactions
- Animate position + scale simultaneously

---

## 🔧 Customization

### Change Primary Colors

Edit `globals.css`:

```css
/* Change from indigo/purple to blue/cyan */
.gradient-text-primary {
  @apply bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent;
}
```

### Adjust Animation Speed

Edit component or create CSS:

```css
.animate-fast {
  animation: float 3s ease-in-out infinite; /* 3s instead of 6s */
}
```

### Modify Card Styling

```tsx
<PremiumCard
  className="p-12" // Increase padding
  hover="glow" // Change hover effect
/>
```

---

## ✅ Deployment Checklist

- ✅ Build passes: `npm run build`
- ✅ No console errors in dev mode
- ✅ Responsive on mobile (test breakpoints)
- ✅ Animations smooth (60fps)
- ✅ All links working
- ✅ Forms submitting correctly
- ✅ Dark theme applied everywhere
- ✅ Environment variables set

---

## 🐛 Troubleshooting

### **Build fails with CSS error**

```bash
# Clear Next.js cache
rm -r .next
npm run build
```

### **Animations not playing**

- Check Framer Motion is imported: `import { motion } from 'framer-motion'`
- Verify components are wrapped in `<motion.div>`
- Check browser supports CSS transforms

### **Components not importing**

```bash
# Verify paths are correct
# Use @/ alias (configured in tsconfig.json)
import { PremiumCard } from '@/components/shared/PremiumCard';
```

### **Dev server won't start**

```bash
# Kill process on port 3000/3001
lsof -i :3000
kill -9 <PID>

# Try again
npm run dev
```

---

## 📚 Next Steps

1. **Review DESIGN_SYSTEM.md** for detailed component docs
2. **Check IMPLEMENTATION_CHECKLIST.md** for what's included
3. **Start using components** in your pages
4. **Customize colors/animations** as needed
5. **Test responsiveness** on mobile devices
6. **Deploy to production** with `npm run build && npm start`

---

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Patterns](https://react-patterns.dev)

---

## 📞 Support

**All components are:**

- ✅ TypeScript typed
- ✅ Responsive (mobile-first)
- ✅ Accessibility-ready
- ✅ Production-optimized
- ✅ Documented with examples

For questions, refer to:

1. Component file JSDoc comments
2. DESIGN_SYSTEM.md
3. Example usage in `/src/app/page.tsx` and `/src/app/select-role/page.tsx`

---

**Version:** 1.0  
**Updated:** April 17, 2026  
**Status:** ✅ Production Ready
