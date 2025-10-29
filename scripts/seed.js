#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, '../src/app/reviews/revdata.json');
  if (!fs.existsSync(jsonPath)) {
    console.log('revdata.json not found, nothing to seed');
    return;
  }
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);

  console.log(`Seeding ${data.length} reviews...`);

  for (const item of data) {
    try {
      await prisma.review.upsert({
        where: { id: item.id },
        update: {
          title: item.title,
          artist: item.artist,
          type: item.type,
          rating: item.rating,
          reviewDate: new Date(item.reviewDate),
          image: item.image,
          review: item.review || null,
        },
        create: {
          id: item.id,
          title: item.title,
          artist: item.artist,
          type: item.type,
          rating: item.rating,
          reviewDate: new Date(item.reviewDate),
          image: item.image,
          review: item.review || null,
        }
      });
    } catch (e) {
      console.error('Error seeding item', item.id, e.message);
    }
  }
  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
