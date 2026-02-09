# Dynamic Menu System - Implementation Guide

## Overview
The Dynamic Menu System allows you to manage all site navigation from the Admin Dashboard without touching code. Menus are stored in Firestore and rendered dynamically on the client site.

## Architecture

### Data Flow
1. **Admin creates/edits menu** → Saved to Firestore (`menus` collection)
2. **Client requests menu** → API route fetches from Firestore
3. **DynamicMenu component** → Renders menu items based on type

### Key Components

#### Admin Side
- **MenuEditor** (`apps/admin/components/menus/MenuEditor.tsx`): Drag-and-drop menu builder
- **Menu Pages** (`apps/admin/app/dashboard/menus/`): CRUD interface for menus

#### Client Side
- **DynamicMenu** (`apps/client/components/menus/DynamicMenu.tsx`): Fetches and renders menus
- **MenuItemRenderer** (`apps/client/components/menus/MenuItemRenderer.tsx`): Renders individual items
- **API Route** (`apps/client/app/api/menus/route.ts`): Server-side menu fetching

## Usage

### 1. Creating a Menu in Admin

```typescript
// Navigate to: /dashboard/menus/new

// Fill in:
- Name: "Main Navigation"
- Location: "header_main"
- Active: ✓

// Add items:
- Type: "link" → Standard navigation link
- Type: "dropdown" → Nested submenu (future)
- Type: "mega_menu" → Complex layout (Emirates Grid, etc.)
- Type: "button" → CTA-style link
- Type: "action" → Special actions (WhatsApp, scroll to top)
```

### 2. Using DynamicMenu in Components

```tsx
import { DynamicMenu } from '@/components/menus/DynamicMenu';

// In your component:
<DynamicMenu 
  menuLocation="header_main"
  className="nav-menu"
  itemClassName="nav-link"
/>
```

### 3. Available Menu Locations

| Location | Description | Typical Use |
|----------|-------------|-------------|
| `header_main` | Main header navigation | Primary site menu |
| `header_top` | Top bar links | Contact, Login, etc. |
| `footer_col_1` | Footer column 1 | Company info |
| `footer_col_2` | Footer column 2 | Services |
| `footer_col_3` | Footer column 3 | Resources |
| `footer_col_4` | Footer column 4 | Legal |
| `mobile_main` | Mobile drawer menu | Full mobile nav |
| `mobile_bottom_nav` | Mobile bottom bar | App-style navigation |

### 4. Menu Item Types

#### Link
```typescript
{
  type: 'link',
  label: 'About Us',
  url: '/about',
  target: '_self'
}
```

#### Button (CTA)
```typescript
{
  type: 'button',
  label: 'Calculate Now',
  url: '/#calculator',
  badge: 'Free',
  badgeColor: 'success'
}
```

#### Mega Menu
```typescript
{
  type: 'mega_menu',
  label: 'Locations',
  megaMenuContext: 'emirates_grid' // or 'calculators_list', 'services_columns'
}
```

#### Action
```typescript
{
  type: 'action',
  label: 'WhatsApp Support',
  actionType: 'whatsapp',
  url: 'https://wa.me/971501234567'
}
```

## Integration Examples

### Replace Hardcoded Header Links

**Before:**
```tsx
<nav>
  <Link href="/">Home</Link>
  <Link href="/about">About</Link>
  <Link href="/contact">Contact</Link>
</nav>
```

**After:**
```tsx
<DynamicMenu 
  menuLocation="header_main"
  className="navbar-nav"
  itemClassName="nav-link"
/>
```

### Replace Footer Columns

**Before:**
```tsx
<div className="footer-column">
  <h5>Company</h5>
  <Link href="/about">About Us</Link>
  <Link href="/careers">Careers</Link>
</div>
```

**After:**
```tsx
<div className="footer-column">
  <h5>Company</h5>
  <DynamicMenu 
    menuLocation="footer_col_1"
    className="footer-links"
    itemClassName="footer-link"
  />
</div>
```

## Advanced Features

### Mega Menu Contexts

When `type: 'mega_menu'`, the `megaMenuContext` determines the layout:

- **`emirates_grid`**: Displays UAE emirates in a grid with areas/free zones
- **`calculators_list`**: Shows all calculator types
- **`services_columns`**: Multi-column service listing
- **`custom_html`**: Future: Custom HTML content

### Badges

Add visual indicators to menu items:

```typescript
{
  label: 'New Feature',
  badge: 'Beta',
  badgeColor: 'warning' // 'primary', 'success', 'danger', 'warning'
}
```

### Icons

Include SVG icons inline:

```typescript
{
  label: 'WhatsApp',
  icon: '<svg>...</svg>'
}
```

## API Reference

### GET /api/menus

**Query Parameters:**
- `location` (required): Menu location identifier

**Response:**
```json
{
  "id": "menu_123",
  "name": "Main Navigation",
  "location": "header_main",
  "isActive": true,
  "items": [
    {
      "id": "item_1",
      "label": "Home",
      "url": "/",
      "type": "link"
    }
  ],
  "updatedAt": "2026-02-09T..."
}
```

## Performance Considerations

1. **Caching**: Menus are fetched client-side and cached in component state
2. **SSR**: For better SEO, consider server-side fetching in layout components
3. **Revalidation**: Set `revalidate` in API route for ISR

## Future Enhancements

- [ ] Nested dropdown support (children array)
- [ ] Visual mega menu builder in admin
- [ ] Menu preview in admin
- [ ] A/B testing for different menu configurations
- [ ] Analytics integration (track menu clicks)
- [ ] Conditional rendering (show/hide based on user role)

## Troubleshooting

### Menu not appearing
1. Check menu is marked as "Active" in admin
2. Verify `location` matches exactly
3. Check browser console for API errors

### Items not rendering correctly
1. Ensure `type` is valid
2. For mega menus, verify `megaMenuContext` is set
3. Check `url` is properly formatted

### Styling issues
1. Pass appropriate `className` and `itemClassName` props
2. Ensure your CSS modules are imported
3. Check for CSS specificity conflicts

## Migration Checklist

- [ ] Create menus in admin for each location
- [ ] Replace hardcoded links with `<DynamicMenu>`
- [ ] Test all menu locations
- [ ] Verify mobile responsiveness
- [ ] Update documentation for content editors
- [ ] Train team on menu management
