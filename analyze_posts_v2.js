const fs = require('fs');
const path = require('path');

let report = '';
function log(msg) {
    report += msg + '\n';
    console.log(msg);
}

function analyzeFile(filePath) {
    log(`\n--- Analyzing ${path.basename(filePath)} ---`);
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extract main titles (we can assume the main title is followed by seoTitle or seoTitleEn or similar)
        // A better way is to split by "slug:" and then find the first "title:" in that chunk.
        const posts = content.split('slug:').slice(1);
        const titles = [];
        const h2s = [];
        const faqs = [];

        for (const post of posts) {
            const titleMatch = post.match(/title:\s*['"`]([^'"`]+)['"`]/);
            if (titleMatch) titles.push(titleMatch[1]);

            // H2s in contentKo
            const contentKoMatch = post.match(/contentKo:\s*`([\s\S]*?)`/);
            if (contentKoMatch) {
                const block = contentKoMatch[1];
                const blockH2s = [...block.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(m => m[1]);
                h2s.push(...blockH2s);
            }

            // FAQs
            const faqBlockMatch = post.match(/faq:\s*\[([\s\S]*?)\]/);
            if (faqBlockMatch) {
                const block = faqBlockMatch[1];
                const qs = [...block.matchAll(/q:\s*['"`]([^'"`]+)['"`]/g)].map(m => m[1]);
                faqs.push(...qs);
            }
        }

        log(`Total posts: ${posts.length}`);
        
        // Check title repetition
        const titleCounts = {};
        titles.forEach(t => titleCounts[t] = (titleCounts[t] || 0) + 1);
        const duplicateTitles = Object.entries(titleCounts).filter(e => e[1] > 1).sort((a,b) => b[1]-a[1]);
        if (duplicateTitles.length > 0) {
            log('Duplicate main titles found:');
            duplicateTitles.slice(0, 10).forEach(e => log(`  ${e[1]}x: ${e[0]}`));
        } else {
            log('No duplicate main titles.');
        }

        // H2 repetition
        const h2Counts = {};
        h2s.forEach(t => h2Counts[t] = (h2Counts[t] || 0) + 1);
        const duplicateH2s = Object.entries(h2Counts).filter(e => e[1] > 2).sort((a,b) => b[1]-a[1]);
        if (duplicateH2s.length > 0) {
            log('Most common H2s (potential AI boilerplate):');
            duplicateH2s.slice(0, 10).forEach(e => log(`  ${e[1]}x: ${e[0]}`));
        }

        // FAQ repetition
        const faqCounts = {};
        faqs.forEach(t => faqCounts[t] = (faqCounts[t] || 0) + 1);
        const duplicateFaqs = Object.entries(faqCounts).filter(e => e[1] > 1).sort((a,b) => b[1]-a[1]);
        if (duplicateFaqs.length > 0) {
            log('Duplicate FAQ questions:');
            duplicateFaqs.slice(0, 10).forEach(e => log(`  ${e[1]}x: ${e[0]}`));
        } else {
            log('No duplicate FAQ questions.');
        }
        
    } catch (e) {
        log(`Error analyzing ${filePath}: ${e.message}`);
    }
}

const files = [
    'lib/blog/saju-posts.ts',
    'lib/blog/gwansang-posts.ts',
    'lib/blog/seongmyeong-posts.ts',
    'lib/blog/mbti-posts.ts',
    'lib/blog/bokhap-posts.ts'
];

files.forEach(analyzeFile);
fs.writeFileSync('analysis_report2.txt', report, 'utf-8');
