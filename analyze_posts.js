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
        
        // Extract titles
        const titles = [...content.matchAll(/title:\s*['"`]([^'"`]+)['"`]/g)].map(m => m[1]);
        log(`Total titles matched: ${titles.length}`);
        
        // Check title repetition
        const titleCounts = {};
        titles.forEach(t => titleCounts[t] = (titleCounts[t] || 0) + 1);
        const duplicateTitles = Object.entries(titleCounts).filter(e => e[1] > 1).sort((a,b) => b[1]-a[1]);
        if (duplicateTitles.length > 0) {
            log('Duplicate titles found:');
            duplicateTitles.slice(0, 10).forEach(e => log(`  ${e[1]}x: ${e[0]}`));
        } else {
            log('No duplicate titles.');
        }

        // Extract H2s
        const h2s = [...content.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(m => m[1]);
        log(`Total H2s matched: ${h2s.length}`);
        const h2Counts = {};
        h2s.forEach(t => h2Counts[t] = (h2Counts[t] || 0) + 1);
        const duplicateH2s = Object.entries(h2Counts).filter(e => e[1] > 2).sort((a,b) => b[1]-a[1]);
        if (duplicateH2s.length > 0) {
            log('Most common H2s (potential AI boilerplate):');
            duplicateH2s.slice(0, 15).forEach(e => log(`  ${e[1]}x: ${e[0]}`));
        }

        // Extract FAQ questions
        const faqs = [...content.matchAll(/question:\s*['"`]([^'"`]+)['"`]/g)].map(m => m[1]);
        log(`Total FAQ questions: ${faqs.length}`);
        const faqCounts = {};
        faqs.forEach(t => faqCounts[t] = (faqCounts[t] || 0) + 1);
        const duplicateFaqs = Object.entries(faqCounts).filter(e => e[1] > 1).sort((a,b) => b[1]-a[1]);
        if (duplicateFaqs.length > 0) {
            log('Duplicate FAQ questions:');
            duplicateFaqs.slice(0, 10).forEach(e => log(`  ${e[1]}x: ${e[0]}`));
        }

        // Content lengths
        const contentKos = [...content.matchAll(/contentKo:\s*`([\s\S]*?)`,/g)].map(m => m[1]);
        if (contentKos.length > 0) {
            const lengths = contentKos.map(c => c.length);
            const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
            const shortContents = lengths.filter(l => l < 2000).length;
            log(`Total contentKo blocks: ${contentKos.length}`);
            log(`Average length: ${Math.round(avg)} chars`);
            log(`Short content (<2000 chars): ${shortContents} blocks`);
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
fs.writeFileSync('analysis_report.txt', report, 'utf-8');
