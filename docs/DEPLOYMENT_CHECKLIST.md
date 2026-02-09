# Production Deployment Checklist

## 🚀 Pre-Deployment

### Code Review
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] No console.log statements in production code
- [ ] All imports optimized
- [ ] Dead code removed

### Testing
- [ ] All manual tests passed (see README.md)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on iOS and Android
- [ ] Tested with screen readers (accessibility)
- [ ] Performance tested (Lighthouse score > 90)

### Database
- [ ] Firestore indexes created (if needed)
- [ ] Firestore rules updated for MENUS collection
- [ ] Firestore rules updated for WIDGETS collection
- [ ] Backup current database

### Dependencies
- [ ] `@hello-pangea/dnd` installed in admin app
- [ ] All package.json files updated
- [ ] No security vulnerabilities (`npm audit`)
- [ ] All dependencies up to date

## 📝 Deployment Steps

### Step 1: Deploy Backend Changes
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes (if any)
firebase deploy --only firestore:indexes
```

### Step 2: Deploy Admin App
```bash
cd apps/admin
npm run build
# Deploy to your hosting (Vercel, etc.)
```

### Step 3: Deploy Client App
```bash
cd apps/client
npm run build
# Deploy to your hosting
```

### Step 4: Verify Deployment
- [ ] Admin dashboard accessible
- [ ] Menu management pages load
- [ ] Can create a test menu
- [ ] Test menu appears on client site
- [ ] API routes responding correctly

## 🎨 Content Setup

### Create Default Menus
Create these menus in the admin dashboard:

#### 1. Header Main Navigation
- **Location**: `header_main`
- **Items**:
  - Home → `/`
  - Calculators (Mega Menu) → Emirates Grid
  - Blog → `/blog`
  - About → `/about`
  - Contact → `/contact`

#### 2. Footer Column 1 - Company
- **Location**: `footer_col_1`
- **Items**:
  - About Us → `/about`
  - Our Team → `/team`
  - Careers → `/careers`
  - Contact → `/contact`

#### 3. Footer Column 2 - Services
- **Location**: `footer_col_2`
- **Items**:
  - Gratuity Calculator → `/`
  - MOHRE Calculator → `/mohre-calculator`
  - Unlimited Contract → `/unlimited-contract`
  - Limited Contract → `/limited-contract`

#### 4. Footer Column 3 - Resources
- **Location**: `footer_col_3`
- **Items**:
  - Blog → `/blog`
  - FAQ → `/faq`
  - Guides → `/guides`
  - News → `/news`

#### 4. Footer Column 4 - Legal
- **Location**: `footer_col_4`
- **Items**:
  - Privacy Policy → `/privacy-policy`
  - Terms of Use → `/terms-of-use`
  - Cookie Policy → `/cookie-policy`
  - Disclaimer → `/disclaimer`

#### 5. Mobile Main Menu
- **Location**: `mobile_main`
- **Items**: (Simplified version of header)
  - Home → `/`
  - Calculators (Dropdown) → with children
  - Blog → `/blog`
  - Contact → `/contact`

## 🔧 Integration Tasks

### Update Header Component
```tsx
// apps/client/components/layout/Header.tsx

// Add import
import { DynamicMenu } from '@/components/menus/DynamicMenu';
import '@/styles/menus.css';

// Replace hardcoded nav with:
<DynamicMenu 
  menuLocation="header_main"
  className="navbar-nav d-none d-lg-flex gap-4"
  itemClassName="nav-link text-dark fw-medium"
/>
```

### Update Footer Component
```tsx
// apps/client/components/layout/Footer.tsx

// Add import
import { DynamicMenu } from '@/components/menus/DynamicMenu';

// Replace each footer column with:
<div className="footer-column">
  <h5>Company</h5>
  <DynamicMenu 
    menuLocation="footer_col_1"
    className="footer-links d-flex flex-column gap-2"
    itemClassName="text-white-50 text-decoration-none"
  />
</div>
```

### Update Layout
```tsx
// apps/client/app/layout.tsx

// Add menu styles import
import '@/styles/menus.css';
```

## ✅ Post-Deployment Verification

### Functionality Checks
- [ ] All menus display correctly
- [ ] Links navigate properly
- [ ] Dropdowns work
- [ ] Mega menus render correctly
- [ ] Mobile menu functions
- [ ] Badges display
- [ ] New tab links work

### Performance Checks
- [ ] Page load time < 3s
- [ ] Menu fetch time < 200ms
- [ ] No console errors
- [ ] No 404 errors
- [ ] Lighthouse score maintained

### SEO Checks
- [ ] All links crawlable
- [ ] Proper HTML structure
- [ ] No broken links
- [ ] Sitemap updated (if needed)
- [ ] Robots.txt allows crawling

### Accessibility Checks
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Focus indicators visible
- [ ] Color contrast sufficient

## 📊 Monitoring

### Set Up Monitoring
- [ ] Error tracking (Sentry, etc.)
- [ ] Analytics tracking menu clicks
- [ ] Performance monitoring
- [ ] Uptime monitoring

### Metrics to Track
- Menu load time
- Menu interaction rate
- Most clicked menu items
- Dropdown usage
- Mobile vs desktop usage

## 🐛 Rollback Plan

If issues occur:

1. **Immediate Rollback**
   ```bash
   # Revert to previous deployment
   git revert <commit-hash>
   git push
   # Redeploy
   ```

2. **Disable Dynamic Menus**
   - Comment out `<DynamicMenu>` components
   - Restore hardcoded menus temporarily
   - Fix issues
   - Redeploy

3. **Database Rollback**
   - Restore from backup if needed
   - Verify data integrity

## 📚 Documentation Handoff

### For Development Team
- [ ] Share technical documentation
- [ ] Review MENU_SYSTEM.md
- [ ] Review HEADER_FOOTER_INTEGRATION.md
- [ ] Review IMPLEMENTATION_SUMMARY.md

### For Content Team
- [ ] Share MENU_QUICK_START.md
- [ ] Conduct training session
- [ ] Create example menus together
- [ ] Answer questions

### For Stakeholders
- [ ] Demo the new system
- [ ] Show admin interface
- [ ] Explain benefits
- [ ] Gather feedback

## 🎯 Success Criteria

Deployment is successful when:
- [ ] All menus created and active
- [ ] No errors in production
- [ ] Performance metrics maintained
- [ ] Content team trained
- [ ] Stakeholders satisfied
- [ ] Documentation complete

## 📞 Support Plan

### Week 1 Post-Launch
- Daily monitoring
- Quick response to issues
- Content team support
- Performance optimization

### Week 2-4 Post-Launch
- Weekly check-ins
- Gather user feedback
- Implement improvements
- Monitor analytics

### Ongoing
- Monthly reviews
- Feature enhancements
- Content updates
- Performance tuning

## 🎉 Launch Announcement

Once deployed successfully:

1. **Internal Announcement**
   - Email to team
   - Demo session
   - Q&A session

2. **User Communication**
   - Update help docs
   - Create tutorial videos
   - Send newsletter (if applicable)

3. **Celebrate!**
   - Team recognition
   - Document learnings
   - Plan next features

---

**Deployment Date**: _____________  
**Deployed By**: _____________  
**Verified By**: _____________  
**Status**: ⬜ Pending | ⬜ In Progress | ⬜ Complete

## Notes

_Add any deployment-specific notes here_
