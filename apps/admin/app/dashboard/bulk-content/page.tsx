'use client';

import { useState } from 'react';
import { saveDocumentAction, getDocumentByIdAction } from '@/actions/firestore';
import { COLLECTIONS } from '@gratuity/firebase-config/firestore';

// Content updates - mapped from ~/workspace/your_files/uae-cms-content-pack/
// Each entry: { id, collection, slug, seoTitle, metaDescription, content }
const CONTENT_UPDATES = [
  // === CONTRACT PAGES (PAGES collection) ===
  {
    id: 'limited-contract',
    collection: COLLECTIONS.PAGES,
    slug: 'limited-contract',
    label: 'Limited Contract (/limited-contract)',
    seoTitle: 'Limited Contract Gratuity Calculator UAE 2026 | End of Service Benefits',
    metaDescription: 'Calculate your UAE gratuity for limited (fixed-term) contracts. Learn how end-of-service benefits work under Federal Decree-Law No. 33 of 2021, with examples, FAQs, and free calculator.',
    content: `## Introduction
A limited contract — also called a fixed-term contract — has a specific start and end date agreed between you and your employer. Under the current UAE Labour Law (Federal Decree-Law No. 33 of 2021), all new employment contracts are fixed-term, making this the standard contract type across the UAE private sector.

When your fixed-term contract ends, whether by reaching its natural expiry date or through early termination, you are entitled to end-of-service gratuity based on your basic salary and years of continuous service.

**Key update:** Under the current law, there is no difference in gratuity treatment between resignation and termination. If you complete at least 1 year of continuous service, you receive your full gratuity entitlement calculated with the standard 21/30-day formula.

## What is a Limited (Fixed-Term) Contract?
A fixed-term contract specifies a defined start date and end date, the job role and basic salary, terms for renewal or non-renewal, and notice period requirements (30–90 days). The maximum duration is typically 3 years, renewable by mutual agreement.

## Gratuity Calculation for Limited Contracts
**For the first 5 years:** (Basic Salary ÷ 30) × 21 days × Years of Service
**After 5 years:** (Basic Salary ÷ 30) × 30 days × Years of Service
**Maximum cap:** Total gratuity cannot exceed 2 years' basic salary.
**Eligibility:** Minimum 1 year of continuous service required.

## Calculation Examples
**Example 1 — 2-Year Contract:** Basic AED 8,000, 2 years. Daily rate: 8,000 ÷ 30 = AED 266.67. Gratuity: 266.67 × 21 × 2 = **AED 11,200**.

**Example 2 — 7-Year Service:** Basic AED 10,000. First 5 years: (10,000 ÷ 30) × 21 × 5 = AED 35,000. Next 2 years: (10,000 ÷ 30) × 30 × 2 = AED 20,000. **Total: AED 55,000**.

## Contract Expiry vs Early Termination
**Natural Expiry:** Full gratuity, no penalties. Employer must pay within 14 days.
**Resignation Before Expiry:** Full gratuity (1+ year service). The old reduction rules no longer apply. You must serve notice or pay compensation in lieu.
**Termination by Employer:** Full gratuity plus notice-period compensation.

## Frequently Asked Questions
**Q: Do I get gratuity if my limited contract is not renewed?** A: Yes — non-renewal is treated as contract completion. Full gratuity based on total continuous service.
**Q: Does my gratuity reset when my contract is renewed?** A: No. Renewals maintain continuous service.
**Q: Is there a difference between limited and unlimited contracts for gratuity now?** A: Under Decree-Law No. 33 of 2021, all new contracts are fixed-term. Gratuity is calculated the same way.

*Last reviewed: October 2026. Not legal advice. No MOHRE affiliation.*`,
  },
  {
    id: 'unlimited-contract',
    collection: COLLECTIONS.PAGES,
    slug: 'unlimited-contract',
    label: 'Unlimited Contract (/unlimited-contract)',
    seoTitle: 'Unlimited Contract Gratuity UAE 2026 | End of Service Calculator',
    metaDescription: 'UAE gratuity for unlimited contracts explained. Calculate your end-of-service benefits under Federal Decree-Law No. 33 of 2021. Free calculator, examples, and FAQs.',
    content: `## Introduction
Unlimited contracts were the traditional UAE employment format before labour law reforms. Under Federal Decree-Law No. 33 of 2021 (effective February 2022), all new contracts must be fixed-term, and existing unlimited contracts were converted.

**Critical legal change:** The old resignation reduction rules (1/3 for 1–3 years, 2/3 for 3–5 years) have been **abolished**. Resignation and termination are now treated identically.

## Gratuity Calculation (Current Law)
**First 5 years:** (Basic Salary ÷ 30) × 21 × Years | **After 5 years:** × 30 days | **Maximum:** 2 years' basic salary | **Minimum:** 1 year service.

| Aspect | Old Law | Current Law |
|--------|---------|-------------|
| Resignation 1–3 years | 1/3 of gratuity | **Full gratuity** |
| Resignation 3–5 years | 2/3 of gratuity | **Full gratuity** |
| Resignation 5+ years | Full | Full |

## Example: 3 Years, Resignation
Basic AED 9,000. Old law: AED 6,300. **New law: (9,000 ÷ 30) × 21 × 3 = AED 18,900** (full amount).

## Frequently Asked Questions
**Q: Do the old 1/3 and 2/3 resignation rules still apply?** A: No. Abolished by Decree-Law No. 33 of 2021.
**Q: My employer says I get less because I resigned. Is this correct?** A: No. File a complaint with MOHRE (800-60).

*Last reviewed: October 2026. Not legal advice. No MOHRE affiliation.*`,
  },
  // === EMIRATE LOCATIONS ===
  {
    id: 'dubai',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'dubai',
    label: 'Dubai (/dubai)',
    seoTitle: 'Gratuity Calculator Dubai 2026 | End of Service Benefits UAE',
    metaDescription: 'Calculate your Dubai gratuity instantly. Free end-of-service calculator for Dubai employees with 2026 UAE Labour Law rules, examples, and FAQs.',
    content: `## Gratuity in Dubai
Dubai is the UAE's largest employment hub. Most employees follow standard UAE gratuity rules, but **DIFC-registered** employers use the DEWS scheme instead.

## Standard Rules (Mainland + Most Free Zones)
(Basic ÷ 30) × 21 × years (first 5), × 30 (after 5). Max: 2 years' basic. Min: 1 year service.

## DIFC Exception
DIFC uses **DEWS**: 5.83% monthly (first 5 years), 8.33% after. Check your employer's registration — not just office location.

## Example
Basic AED 14,000, 4.5 years: (14,000 ÷ 30) × 21 × 4.5 = **AED 44,100**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'abu_dhabi',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'abu-dhabi',
    label: 'Abu Dhabi (/abu-dhabi)',
    seoTitle: 'Gratuity Calculator Abu Dhabi 2026 | End of Service Benefits',
    metaDescription: 'Free Abu Dhabi gratuity calculator. Calculate your end-of-service benefits under UAE Labour Law 2026, with ADGM exceptions explained.',
    content: `## Gratuity in Abu Dhabi
Most Abu Dhabi employees follow standard UAE gratuity rules. **ADGM-registered** employers (Al Maryah Island) use a separate savings-based framework.

## Standard Formula
(Basic ÷ 30) × 21 × years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 16,000, 6 years: First 5: (16,000÷30)×21×5 = AED 56,000. Year 6: (16,000÷30)×30 = AED 16,000. **Total: AED 72,000**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'sharjah',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'sharjah',
    label: 'Sharjah (/sharjah)',
    seoTitle: 'Gratuity Calculator Sharjah 2026 | End of Service Benefits',
    metaDescription: 'Free Sharjah gratuity calculator. Calculate UAE end-of-service benefits under Labour Law 2026 with examples and FAQs.',
    content: `## Gratuity in Sharjah
Sharjah employees follow standard UAE Federal Labour Law. No emirate-specific variations.

## Formula
(Basic ÷ 30) × 21 × years (first 5), × 30 (after 5). Max: 2 years' basic. Min: 1 year. Payment within 14 days.

## Example
Basic AED 7,000, 3 years: (7,000÷30)×21×3 = **AED 14,700**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'ajman',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'ajman',
    label: 'Ajman (/ajman)',
    seoTitle: 'Gratuity Calculator Ajman 2026 | End of Service Benefits UAE',
    metaDescription: 'Free Ajman gratuity calculator. Calculate your UAE end-of-service benefits under Federal Labour Law 2026.',
    content: `## Gratuity in Ajman
Ajman employees are covered by UAE Federal Labour Law (Decree-Law No. 33 of 2021).

## Formula
( Basic ÷ 30 ) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year. Paid within 14 days.

## Example
Basic AED 6,000, 2 years: (6,000÷30)×21×2 = **AED 8,400**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'fujairah',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'fujairah',
    label: 'Fujairah (/fujairah)',
    seoTitle: 'Gratuity Calculator Fujairah 2026 | End of Service Benefits UAE',
    metaDescription: 'Free Fujairah gratuity calculator. Calculate your UAE end-of-service benefits under Federal Labour Law 2026.',
    content: `## Gratuity in Fujairah
Fujairah employees follow UAE Federal Labour Law for end-of-service gratuity.

## Formula
(Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max: 2 years' basic salary. Min: 1 year continuous service.

## Example
Basic AED 6,000, 2 years: **AED 8,400**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'ras_al_khaimah',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'ras-al-khaimah',
    label: 'Ras Al Khaimah (/ras-al-khaimah)',
    seoTitle: 'Gratuity Calculator Ras Al Khaimah 2026 | End of Service UAE',
    metaDescription: 'Free Ras Al Khaimah gratuity calculator. Calculate UAE end-of-service benefits under Federal Labour Law 2026.',
    content: `## Gratuity in Ras Al Khaimah
RAK employees are covered by UAE Federal Labour Law (Decree-Law No. 33 of 2021).

## Formula
(Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 6,000, 2 years: **AED 8,400**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'umm_al_quwain',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'umm-al-quwain',
    label: 'Umm Al Quwain (/umm-al-quwain)',
    seoTitle: 'Gratuity Calculator Umm Al Quwain 2026 | End of Service UAE',
    metaDescription: 'Free Umm Al Quwain gratuity calculator. Calculate UAE end-of-service benefits under Federal Labour Law 2026.',
    content: `## Gratuity in Umm Al Quwain
UAQ employees follow UAE Federal Labour Law for gratuity.

## Formula
(Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max: 2 years' basic. Min: 1 year service.

## Example
Basic AED 6,000, 2 years: **AED 8,400**.

*Last reviewed: October 2026.*`,
  },
  // === AREA / FREE ZONE LOCATIONS ===
  {
    id: 'difc',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'difc',
    label: 'DIFC (/dubai/free-zones/difc)',
    seoTitle: 'DIFC Gratuity & DEWS 2026 | End of Service Guide',
    metaDescription: 'DIFC employees: understand DEWS (DIFC Employee Workplace Savings) — monthly contributions replacing traditional gratuity. Rates, rules, and FAQs.',
    content: `## DIFC Gratuity and DEWS
DIFC-registered employers do NOT pay traditional gratuity. Since February 2020, the **DEWS** (DIFC Employee Workplace Savings) scheme applies.

## How DEWS Works
- **5.83%** of basic salary monthly (first 5 years)
- **8.33%** after 5 years
- Goes into your individual account; access anytime via Equidam platform

## Critical
Check your employer's **DIFC registration** — not just office location. Mainland-registered companies in DIFC towers follow mainland gratuity rules.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'dmcc',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'dmcc',
    label: 'DMCC (/dubai/free-zones/dmcc)',
    seoTitle: 'DMCC Gratuity Calculator 2026 | Dubai Multi Commodities Centre',
    metaDescription: 'DMCC employee gratuity guide. Free calculator + UAE Labour Law rules for Dubai Multi Commodities Centre workers.',
    content: `## DMCC Gratuity
DMCC follows **standard UAE Labour Law** — no separate scheme.

## Rules
(Basic ÷ 30) × 21 × years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'jafza',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'jafza',
    label: 'JAFZA (/dubai/free-zones/jafza)',
    seoTitle: 'JAFZA Gratuity Calculator 2026 | Jebel Ali Free Zone',
    metaDescription: 'JAFZA employee gratuity explained. Free end-of-service calculator with UAE Labour Law 2026 rules.',
    content: `## JAFZA Gratuity
JAFZA follows **standard UAE Federal Labour Law**.

## Rules
(Basic ÷ 30) × 21 × years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year. Paid within 14 days.

**Note:** Verify your basic salary on the MOHRE contract — overtime and allowances don't count.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'dubai_marina',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'marina',
    label: 'Dubai Marina (/dubai/marina)',
    seoTitle: 'Gratuity Calculator Dubai Marina 2026 | End of Service Dubai',
    metaDescription: 'Free gratuity calculator for Dubai Marina, Dubai employees. UAE Labour Law 2026 rules, examples, FAQs.',
    content: `## Gratuity in Dubai Marina
Dubai Marina employees are covered by UAE Federal Labour Law. Work location doesn't change the formula.

## Formula
(Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max: 2 years' basic. Min: 1 year. Paid within 14 days.

## Example
Basic AED 10,000, 3 years: (10,000÷30)×21×3 = **AED 21,000**.

## Notes
- Only basic salary counts; old 1/3, 2/3 reductions abolished (Decree-Law 33/2021)
- MOHRE: 800-60

*Last reviewed: October 2026.*`,
  },
  {
    id: 'downtown_dubai',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'downtown',
    label: 'Downtown Dubai (/dubai/downtown)',
    seoTitle: 'Gratuity Calculator Downtown Dubai 2026 | End of Service',
    metaDescription: 'Free gratuity calculator for Downtown Dubai employees. UAE Labour Law 2026 rules, examples, FAQs.',
    content: `## Gratuity in Downtown Dubai
Covered by UAE Federal Labour Law. Location within Dubai doesn't affect the formula.

## Formula
(Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 10,000, 3 years = **AED 21,000**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'jumeirah',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'jumeirah',
    label: 'Jumeirah (/dubai/jumeirah)',
    seoTitle: 'Gratuity Calculator Jumeirah 2026 | End of Service Dubai',
    metaDescription: 'Free gratuity calculator for Jumeirah, Dubai employees. UAE Labour Law 2026 rules.',
    content: `## Gratuity in Jumeirah
UAE Federal Labour Law applies. Formula: (Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 10,000, 3 years = **AED 21,000**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'business_bay',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'business-bay',
    label: 'Business Bay (/dubai/business-bay)',
    seoTitle: 'Gratuity Calculator Business Bay 2026 | End of Service Dubai',
    metaDescription: 'Free gratuity calculator for Business Bay, Dubai employees. UAE Labour Law 2026.',
    content: `## Gratuity in Business Bay
UAE Federal Labour Law. (Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 10,000, 3 years = **AED 21,000**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'saadiyat_island',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'saadiyat-island',
    label: 'Saadiyat Island (/abu-dhabi/saadiyat-island)',
    seoTitle: 'Gratuity Calculator Saadiyat Island 2026 | Abu Dhabi',
    metaDescription: 'Free gratuity calculator for Saadiyat Island, Abu Dhabi employees. UAE Labour Law 2026.',
    content: `## Gratuity on Saadiyat Island
UAE Federal Labour Law applies. (Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 10,000, 3 years = **AED 21,000**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'yas_island',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'yas-island',
    label: 'Yas Island (/abu-dhabi/yas-island)',
    seoTitle: 'Gratuity Calculator Yas Island 2026 | Abu Dhabi',
    metaDescription: 'Free gratuity calculator for Yas Island, Abu Dhabi employees. UAE Labour Law 2026.',
    content: `## Gratuity on Yas Island
UAE Federal Labour Law. (Basic ÷ 30) × 21 × Years (1–5), × 30 (5+). Max 2 years' basic. Min 1 year.

## Example
Basic AED 10,000, 3 years = **AED 21,000**.

*Last reviewed: October 2026.*`,
  },
  {
    id: 'adgm',
    collection: COLLECTIONS.LOCATIONS,
    slug: 'adgm',
    label: 'ADGM (/abu-dhabi/free-zones/adgm)',
    seoTitle: 'ADGM End of Service 2026 | Abu Dhabi Global Market Guide',
    metaDescription: 'ADGM employee end-of-service benefits explained. Savings-based framework under ADGM Employment Regulations 2019.',
    content: `## ADGM End of Service
ADGM-registered employers follow **ADGM Employment Regulations 2019** — a savings-based framework, not traditional federal gratuity.

## Key Points
- Employer makes regular contributions to your individual account
- Check your employer's **ADGM registration** (not just Al Maryah Island location)
- Mainland-registered companies on Al Maryah Island follow federal gratuity rules

*Last reviewed: October 2026. Verify current rules on adgm.com.*`,
  },
];

interface UpdateResult {
  label: string;
  status: 'pending' | 'success' | 'failed' | 'skipped';
  message: string;
}

export default function BulkContentPage() {
  const [results, setResults] = useState<UpdateResult[]>(
    CONTENT_UPDATES.map((u) => ({ label: u.label, status: 'pending', message: 'Not started' }))
  );
  const [running, setRunning] = useState(false);
  const [dryRun, setDryRun] = useState(true);

  const runUpdates = async () => {
    setRunning(true);
    const newResults: UpdateResult[] = [];

    for (let i = 0; i < CONTENT_UPDATES.length; i++) {
      const update = CONTENT_UPDATES[i];
      setResults((prev) =>
        prev.map((r, idx) => (idx === i ? { ...r, status: 'pending', message: 'Processing...' } : r))
      );

      try {
        // Step 1: Fetch existing document (backup check)
        const existing = await getDocumentByIdAction(update.collection, update.id);

        if (!existing) {
          newResults.push({
            label: update.label,
            status: 'skipped',
            message: `Document not found (id: ${update.id}). Skipped.`,
          });
          setResults((prev) =>
            prev.map((r, idx) => (idx === i ? newResults[newResults.length - 1] : r))
          );
          continue;
        }

        if (dryRun) {
          newResults.push({
            label: update.label,
            status: 'success',
            message: `DRY RUN: Document exists. Would update SEO title + content (${update.content.length} chars).`,
          });
        } else {
          // Step 2: Build update payload (preserve unrelated fields)
          const isLocation = update.collection === COLLECTIONS.LOCATIONS;
          const payload: any = {
            updatedAt: new Date(),
          };

          if (isLocation) {
            payload.seo = {
              ...(existing.seo || {}),
              metaTitle: update.seoTitle,
              metaDescription: update.metaDescription,
            };
            // Content field - try common field names
            payload.content = update.content;
            payload.description = update.content;
          } else {
            // Pages collection
            payload.seoTitle = update.seoTitle;
            payload.metaDescription = update.metaDescription;
            payload.content = update.content;
          }

          await saveDocumentAction(update.collection, update.id, payload);

          newResults.push({
            label: update.label,
            status: 'success',
            message: `Updated successfully. SEO title + content applied.`,
          });
        }
      } catch (err: any) {
        newResults.push({
          label: update.label,
          status: 'failed',
          message: `Error: ${err.message || 'Unknown error'}`,
        });
      }

      setResults((prev) =>
        prev.map((r, idx) => (idx === i ? newResults[newResults.length - 1] : r))
      );
    }

    setRunning(false);
  };

  const successCount = results.filter((r) => r.status === 'success').length;
  const failedCount = results.filter((r) => r.status === 'failed').length;
  const skippedCount = results.filter((r) => r.status === 'skipped').length;

  return (
    <div className="p-4">
      <h1 className="h3 fw-bold mb-1">Bulk Content Update</h1>
      <p className="text-muted mb-4">
        Apply prepared thin-content fixes to 19 CMS pages. Uses existing authenticated server actions.
      </p>

      <div className="card mb-4">
        <div className="card-body">
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              disabled={running}
              id="dryRunSwitch"
            />
            <label className="form-check-label" htmlFor="dryRunSwitch">
              <strong>Dry run mode</strong> (validate without saving)
            </label>
          </div>
          <button
            className="btn btn-primary"
            onClick={runUpdates}
            disabled={running}
          >
            {running ? 'Processing...' : dryRun ? 'Run Dry-Run Validation' : 'Apply All Updates (LIVE)'}
          </button>
          {!dryRun && (
            <div className="alert alert-warning mt-3 mb-0">
              <strong>Warning:</strong> Dry-run is OFF. Clicking will write to Firestore.
              Uncheck dry-run only when ready for live publication.
            </div>
          )}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="text-success">{successCount}</h2>
              <p className="mb-0">Success / Validated</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="text-danger">{failedCount}</h2>
              <p className="mb-0">Failed</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="text-warning">{skippedCount}</h2>
              <p className="mb-0">Skipped</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <strong>Update Results ({CONTENT_UPDATES.length} pages)</strong>
        </div>
        <div className="table-responsive">
          <table className="table table-sm mb-0">
            <thead>
              <tr>
                <th>Page</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.label}</td>
                  <td>
                    {r.status === 'pending' && <span className="badge bg-secondary">Pending</span>}
                    {r.status === 'success' && <span className="badge bg-success">OK</span>}
                    {r.status === 'failed' && <span className="badge bg-danger">Failed</span>}
                    {r.status === 'skipped' && <span className="badge bg-warning">Skipped</span>}
                  </td>
                  <td className="small">{r.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>How it works:</strong> This page uses the existing <code>saveDocumentAction</code> server
        action (Firebase Admin SDK) — the same backend the manual edit forms use. No new credentials.
        Dry-run validates that each document exists before any write. Uncheck dry-run to apply for real.
      </div>
    </div>
  );
}
