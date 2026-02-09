const fs = require('fs');
const path = require('path');

console.log('🚀 Starting SEO Audit (Launch Prep)...');

// Helper to check for SEO tags in a TSX/JSX file
function checkSEOInFile(filePath) {
    if (!fs.existsSync(filePath)) return { status: 'MISSING_FILE', issues: [] };

    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    if (!content.includes('metaTitle') && !content.includes('<title>')) issues.push('No Title tag detected');
    if (!content.includes('metaDescription') && !content.includes('name="description"')) issues.push('No Description tag detected');

    return {
        file: path.basename(filePath),
        status: issues.length === 0 ? 'PASS' : 'WARN',
        issues
    };
}

const routesToAudit = [
    'apps/client/app/page.tsx',
    'apps/client/app/dubai/page.tsx',
    'apps/client/app/mohre-calculator/page.tsx',
];

const results = routesToAudit.map(route => {
    return checkSEOInFile(path.join(process.cwd(), route));
});

console.table(results);
console.log('✅ Audit Completed. Manual review recommended for dynamic routes.');
