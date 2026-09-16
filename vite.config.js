import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

// Sync AI-generated commercial product photos to public/images
try {
  const srcDir = '/Users/ankitsingh/.gemini/antigravity-ide/brain/708f3924-e225-49af-9c0f-8c9a1a30fbdf';
  const destDir = fileURLToPath(new URL('./public/images', import.meta.url));
  const filesToSync = [
    ['gapoo_minted_studio_hero_1789568956569.jpg', 'gapoo_minted_studio_hero.jpg'],
    ['gapoo_minted_clean_pack_1789569018027.jpg', 'gapoo_minted_clean_pack.jpg'],
  ];
  for (const [src, dest] of filesToSync) {
    const srcPath = path.join(srcDir, src);
    const destPath = path.join(destDir, dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
} catch (err) {
  console.error('Asset sync error:', err);
}

export default defineConfig({
  plugins: [tailwindcss(), hydrogen(), oxygen(), reactRouter()],
  resolve: {
    alias: {
      // Vite's native tsconfig path resolver does not cover JavaScript
      // projects that use jsconfig.json, so define Hydrogen's app alias here.
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
    tsconfigPaths: true,
  },
  build: {
    // Allow a strict Content-Security-Policy
    // without inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'react-router > set-cookie-parser',
        'react-router > cookie',
        'react-router',
      ],
    },
  },
  server: {
    allowedHosts: ['.tryhydrogen.dev'],
  },
});
