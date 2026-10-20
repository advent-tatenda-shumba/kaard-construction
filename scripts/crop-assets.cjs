const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processAllAssets() {
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  const referenceDir = path.join(__dirname, '..', 'reference-mocks');
  const slidesDir = path.join(__dirname, '..', 'raw-slides');

  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('--- 1. Generating Logo Assets ---');
  const logoRaw = path.join(referenceDir, 'logo-raw.png');
  await sharp(logoRaw)
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'kaard-logo.jpg'));

  const { data: logoData, info: logoInfo } = await sharp(logoRaw)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < logoData.length; i += 4) {
    const r = logoData[i];
    const g = logoData[i + 1];
    const b = logoData[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      logoData[i + 3] = 0;
    } else if (r > 215 && g > 215 && b > 215) {
      const factor = (255 - Math.max(r, g, b)) / 40;
      logoData[i + 3] = Math.round(255 * Math.max(0, Math.min(1, factor)));
    }
  }

  await sharp(logoData, {
    raw: {
      width: logoInfo.width,
      height: logoInfo.height,
      channels: 4,
    },
  })
    .png()
    .toFile(path.join(assetsDir, 'kaard-logo-transparent.png'));
  console.log('✓ Logo assets generated.');

  console.log('--- 2. Cropping Presentation Photos ---');
  // 1. hero-skyline.jpg
  await sharp(path.join(referenceDir, 'slide-1-skyline-banner.png'))
    .extract({ left: 2, top: 126, width: 468, height: 254 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'hero-skyline.jpg'));
  console.log('✓ hero-skyline.jpg');

  // 2. site-scaffolding-banner.jpg
  await sharp(path.join(referenceDir, 'slide-1-skyline-banner.png'))
    .extract({ left: 2, top: 650, width: 264, height: 248 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'site-scaffolding-banner.jpg'));
  console.log('✓ site-scaffolding-banner.jpg');

  // 3. workforce-team.jpg
  await sharp(path.join(referenceDir, 'slide-2-workforce-engineers.png'))
    .extract({ left: 38, top: 188, width: 254, height: 114 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'workforce-team.jpg'));
  console.log('✓ workforce-team.jpg');

  // 4. engineer-female-field.jpg
  await sharp(path.join(referenceDir, 'slide-2-workforce-engineers.png'))
    .extract({ left: 2, top: 356, width: 228, height: 250 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'engineer-female-field.jpg'));
  console.log('✓ engineer-female-field.jpg');

  // 5. engineer-male-field.jpg
  await sharp(path.join(referenceDir, 'slide-2-workforce-engineers.png'))
    .extract({ left: 2, top: 652, width: 228, height: 218 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'engineer-male-field.jpg'));
  console.log('✓ engineer-male-field.jpg');

  // 6. site-blueprint-mug.jpg
  await sharp(path.join(referenceDir, 'slide-3-mug-hq.png'))
    .extract({ left: 2, top: 268, width: 288, height: 250 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'site-blueprint-mug.jpg'));
  console.log('✓ site-blueprint-mug.jpg');

  // 7. flagship-commercial-hq.jpg
  await sharp(path.join(referenceDir, 'slide-3-mug-hq.png'))
    .extract({ left: 2, top: 530, width: 468, height: 252 })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'flagship-commercial-hq.jpg'));
  console.log('✓ flagship-commercial-hq.jpg');

  console.log('--- 3. Optimizing Real Aerial Drone Site Photos ---');
  if (fs.existsSync(slidesDir)) {
    const drone1 = path.join(slidesDir, 'WhatsApp Image 2026-10-20 at 9.01.15 AM.jpeg');
    const drone2 = path.join(slidesDir, 'WhatsApp Image 2026-10-20 at 9.01.16 AM (1).jpeg');
    const drone3 = path.join(slidesDir, 'WhatsApp Image 2026-10-20 at 9.01.17 AM (1).jpeg');

    if (fs.existsSync(drone1)) {
      await sharp(drone1).jpeg({ quality: 90 }).toFile(path.join(assetsDir, 'drone-aerial-roofing.jpg'));
      console.log('✓ drone-aerial-roofing.jpg');
    }
    if (fs.existsSync(drone2)) {
      await sharp(drone2).jpeg({ quality: 90 }).toFile(path.join(assetsDir, 'drone-aerial-structural.jpg'));
      console.log('✓ drone-aerial-structural.jpg');
    }
    if (fs.existsSync(drone3)) {
      await sharp(drone3).jpeg({ quality: 90 }).toFile(path.join(assetsDir, 'drone-aerial-overview.jpg'));
      console.log('✓ drone-aerial-overview.jpg');
    }
  }

  console.log('All photographic assets generated and verified successfully!');
}

processAllAssets().catch((err) => {
  console.error('Asset extraction error:', err);
  process.exit(1);
});
