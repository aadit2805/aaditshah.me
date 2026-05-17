# Reviews System

## How to Add a New Review

1. Create a new `.md` file in this directory (e.g., `movie-name.md`)
2. Use the template format with YAML frontmatter:

```markdown
---
id: [unique_number]
title: "Movie/Show Title"
artist: "Director/Creator"
type: "movie" # or "show"
rating: 8.5
reviewDate: "2024-12-01"
---

Write your review here using markdown formatting.

You can use **bold**, *italics*, and multiple paragraphs.
```

3. Run `npm run build-reviews` to regenerate the JSON file
4. The reviews will automatically be included in your next build

## Notes

- Files starting with `_` (like `_template.md`) are ignored
- The `id` should be unique for each review
- Images should be placed in `/public/images/`
- The build script runs automatically before `npm run build`