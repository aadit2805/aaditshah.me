const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (!match) throw new Error('Invalid frontmatter format');

  const [, frontmatter, body] = match;
  const metadata = {};

  frontmatter.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      metadata[key.trim()] = value;
    }
  });

  return { metadata, body: body.trim() };
}

function slugify(filename) {
  return filename.replace(/\.md$/, '');
}

function buildNotes() {
  const notesDir = path.join(__dirname, '../content/notes');
  const outputFile = path.join(__dirname, '../src/app/notes/notesdata.json');

  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }

  const files = fs
    .readdirSync(notesDir)
    .filter(
      (file) =>
        file.endsWith('.md') &&
        !file.startsWith('_') &&
        file.toLowerCase() !== 'readme.md',
    )
    .sort();

  const notes = files.map((file) => {
    const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
    const { metadata, body } = parseFrontmatter(content);
    return {
      slug: metadata.slug || slugify(file),
      title: metadata.title || file,
      date: metadata.date || '',
      summary: metadata.summary || '',
      html: marked.parse(body),
    };
  });

  notes.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(notes, null, 2));
  console.log(`Built ${notes.length} note(s) from markdown files`);
}

if (require.main === module) {
  buildNotes();
}

module.exports = { buildNotes };
