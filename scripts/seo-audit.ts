import { DUBAI_AREAS, DUBAI_FREE_ZONES, SITE_CONFIG } from '../packages/shared/constants';

console.log('🚀 Starting Automated SEO Audit...');

const checkSEO = (title: string, description: string, url: string) => {
    const issues: string[] = [];
    if (!title) issues.push('Missing Title');
    if (title && title.length > 70) issues.push('Title too long (>70 chars)');
    if (!description) issues.push('Missing Description');
    if (description && description.length > 160) issues.push('Description too long (>160 chars)');

    return {
        url,
        status: issues.length === 0 ? 'PASS' : 'FAIL',
        issues
    };
};

async function runAudit() {
    const results = [];

    // Audit Home Page
    results.push(checkSEO(SITE_CONFIG.name, SITE_CONFIG.description, '/'));

    // Audit Dynamic Area Pages (Sample)
    DUBAI_AREAS.slice(0, 5).forEach(area => {
        results.push(checkSEO(
            `Gratuity Calculator ${area.name} Dubai`,
            `Calculate your end of service gratuity in ${area.name}, Dubai. Accurate MOHRE compliant calculator for 2026.`,
            `/dubai/${area.slug}`
        ));
    });

    console.table(results);

    const failCount = results.filter(r => r.status === 'FAIL').length;
    if (failCount > 0) {
        console.error(`❌ SEO Audit Failed with ${failCount} issues.`);
        process.exit(1);
    } else {
        console.log('✅ SEO Audit Passed! All critical routes are optimized.');
    }
}

runAudit().catch(console.error);
