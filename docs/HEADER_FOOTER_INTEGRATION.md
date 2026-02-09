# Header & Footer Integration Guide

## Quick Integration Steps

### 1. Header Integration

Replace the hardcoded navigation in `Header.tsx` with dynamic menus:

```tsx
// Add import at the top
import { DynamicMenu } from '@/components/menus/DynamicMenu';

// Replace the main navigation section with:
<DynamicMenu 
  menuLocation="header_main"
  className="navbar-nav d-none d-lg-flex gap-4"
  itemClassName="nav-link text-dark fw-medium"
/>

// For mobile menu:
<DynamicMenu 
  menuLocation="mobile_main"
  className="mobile-nav-list"
  itemClassName="mobile-nav-item"
/>
```

### 2. Footer Integration

Replace footer column links with:

```tsx
// Column 1
<DynamicMenu 
  menuLocation="footer_col_1"
  className="footer-links d-flex flex-column gap-2"
  itemClassName="text-white-50 text-decoration-none"
/>

// Column 2
<DynamicMenu 
  menuLocation="footer_col_2"
  className="footer-links d-flex flex-column gap-2"
  itemClassName="text-white-50 text-decoration-none"
/>

// And so on for columns 3 and 4...
```

### 3. Create Default Menus in Admin

Before the dynamic menus will appear, you need to create them in the admin panel:

1. Go to `/dashboard/menus`
2. Create a new menu for each location:
   - **Header Main**: Add Home, About, Blog, Contact, etc.
   - **Footer Columns**: Add relevant links for each column
   - **Mobile Menu**: Simplified version of header menu

### 4. Testing Checklist

- [ ] Create at least one menu in admin
- [ ] Verify menu appears on frontend
- [ ] Test dropdown functionality
- [ ] Test mega menu layouts
- [ ] Verify mobile responsiveness
- [ ] Check link targets (new tab vs same tab)

### 5. Fallback Strategy

If no menu is found for a location, the `DynamicMenu` component returns `null`. Consider adding fallback content:

```tsx
{/* Fallback if no dynamic menu exists */}
<DynamicMenu menuLocation="header_main" ... /> || (
  <nav className="navbar-nav">
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
  </nav>
)
```

## Advanced: Server-Side Rendering

For better SEO, fetch menus server-side in `layout.tsx`:

```tsx
// In layout.tsx
import { getMenuByLocation } from '@/lib/menus';

export default async function RootLayout({ children }) {
  const headerMenu = await getMenuByLocation('header_main');
  const footerMenus = await Promise.all([
    getMenuByLocation('footer_col_1'),
    getMenuByLocation('footer_col_2'),
    getMenuByLocation('footer_col_3'),
    getMenuByLocation('footer_col_4'),
  ]);

  return (
    <html>
      <body>
        <Header menu={headerMenu} />
        {children}
        <Footer menus={footerMenus} />
      </body>
    </html>
  );
}
```

Then update Header/Footer to accept menu props and render directly instead of fetching client-side.

## CSS for Mega Menus

Add these styles to support mega menu dropdowns:

```css
.mega-menu-dropdown .dropdown-menu {
  min-width: 600px;
  max-width: 900px;
}

.mega-menu {
  padding: 2rem;
}

@media (max-width: 768px) {
  .mega-menu-dropdown .dropdown-menu {
    min-width: 100%;
  }
}
```

## Next Steps

1. Create default menus in admin
2. Test on different screen sizes
3. Customize styling to match your design
4. Add analytics tracking to menu clicks
5. Consider A/B testing different menu structures
