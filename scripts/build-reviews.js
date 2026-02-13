const fs = require('fs');
const path = require('path');

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }
  
  const [, frontmatter, body] = match;
  const metadata = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      if (!isNaN(value) && value !== '') {
        value = parseFloat(value);
      }
      
      metadata[key.trim()] = value;
    }
  });
  
  return { metadata, body: body.trim() };
}

function buildReviews() {
  const reviewsDir = path.join(__dirname, '../reviews');
  const outputFile = path.join(__dirname, '../src/app/reviews/revdata.json');
  
  if (!fs.existsSync(reviewsDir)) {
    console.log('Reviews directory not found, creating empty reviews file...');
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    return;
  }
  
  const files = fs.readdirSync(reviewsDir)
    .filter(file => file.endsWith('.md') && !file.startsWith('_') && file.toLowerCase() !== 'readme.md')
    .sort();
  
  const reviews = [];
  
  files.forEach(file => {
    const filePath = path.join(reviewsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const { metadata, body } = parseFrontmatter(content);
      
      const review = {
        id: metadata.id,
        title: metadata.title,
        artist: metadata.artist,
        type: metadata.type,
        rating: metadata.rating,
        reviewDate: metadata.reviewDate,
        review: body
      };
      
      reviews.push(review);
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
    }
  });
  
  // Sort by ID to maintain consistent order
  reviews.sort((a, b) => a.id - b.id);
  
  fs.writeFileSync(outputFile, JSON.stringify(reviews, null, 2));
  console.log(`Built ${reviews.length} reviews from markdown files`);
}

if (require.main === module) {
  buildReviews();
}

module.exports = { buildReviews };