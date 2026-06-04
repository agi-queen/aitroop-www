/**
 * Build apps/my-slide and publish to /slide path of the home site.
 *
 * Implementation notes:
 *   - We bypass `open-slide build` and drive Vite directly using
 *     `createViteConfig` (exported from @open-slide/core/vite). This lets us:
 *       1. Set Vite `base: '/slide/'` so all asset URLs are prefixed correctly.
 *       2. Add a tiny Vite plugin that patches the open-slide React Router setup
 *          so <BrowserRouter> gets basename={import.meta.env.BASE_URL}. Without
 *          this, routes like /s/:slideId never match because location.pathname
 *          is /slide/s/... and there is no '/slide' route.
 *   - The submodule's own `npm run build` (which runs `open-slide build`) is
 *     left alone for standalone dev/preview use.
 */

import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HOME_ROOT = path.resolve(__dirname, '..');
const SLIDE_ROOT = path.join(HOME_ROOT, 'apps', 'my-slide');
const SLIDE_DIST = path.join(SLIDE_ROOT, 'dist');
const PUBLIC_SLIDE = path.join(HOME_ROOT, 'public', 'slide');
const BASE = '/slide/';

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

function run(cmd, args, cwd) {
  console.log(`\n$ ${cmd} ${args.join(' ')}  (cwd=${path.relative(HOME_ROOT, cwd) || '.'})`);
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: true });
  if (result.error) throw new Error(`${cmd} failed to spawn: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`${cmd} ${args.join(' ')} exited with status ${result.status}`);
}

function ensureSubmodule() {
  if (!existsSync(path.join(SLIDE_ROOT, 'package.json'))) {
    throw new Error(`apps/my-slide is not initialized. Run \`git submodule update --init --recursive\` first.`);
  }
}

function ensureDeps() {
  const nm = path.join(SLIDE_ROOT, 'node_modules');
  const lock = path.join(SLIDE_ROOT, 'package-lock.json');
  if (!existsSync(nm)) {
    run(npmCmd, [existsSync(lock) ? 'ci' : 'install'], SLIDE_ROOT);
  }
}

/**
 * Vite plugin that injects basename into the open-slide BrowserRouter.
 * Operates on the upstream app.tsx (inside @open-slide/core/src/app/).
 */
function basenameInjector() {
  return {
    name: 'open-slide:basename-injector',
    enforce: 'pre',
    transform(code, id) {
      const norm = id.replace(/\\/g, '/');
      if (!norm.endsWith('/@open-slide/core/src/app/app.tsx')) return null;
      if (!code.includes('<BrowserRouter>')) return null;
      const patched = code.replace(
        '<BrowserRouter>',
        "<BrowserRouter basename={(import.meta.env.BASE_URL || '/').replace(/\\/$/, '') || '/'}>",
      );
      if (patched === code) return null;
      return { code: patched, map: null };
    },
  };
}

async function build() {
  // @open-slide/core's package.json exports are ESM-only ("import" condition,
  // no "require"), so CJS createRequire can't resolve subpaths. Build absolute
  // paths into the submodule's node_modules and import via file:// URL instead.
  const slideNm = path.join(SLIDE_ROOT, 'node_modules');
  const toFileUrl = (p) => `file://${p.replace(/\\/g, '/')}`;
  const { createViteConfig } = await import(
    toFileUrl(path.join(slideNm, '@open-slide/core/dist/vite/index.js'))
  );
  const vite = await import(toFileUrl(path.join(slideNm, 'vite/dist/node/index.js')));

  // Build inside the submodule cwd so open-slide finds slides/, themes/, etc.
  const baseConfig = await createViteConfig({ userCwd: SLIDE_ROOT, mode: 'build' });

  const merged = vite.mergeConfig(baseConfig, {
    base: BASE,
    plugins: [basenameInjector()],
    build: {
      outDir: SLIDE_DIST,
      emptyOutDir: true,
    },
  });

  console.log(`\n[vite build] base=${BASE} root=${baseConfig.root}`);
  await vite.build(merged);
}

function publish() {
  if (!existsSync(SLIDE_DIST)) throw new Error(`Expected ${SLIDE_DIST} after build.`);
  if (!existsSync(path.join(SLIDE_DIST, 'index.html'))) {
    throw new Error(`${SLIDE_DIST}/index.html missing.`);
  }
  if (existsSync(PUBLIC_SLIDE)) rmSync(PUBLIC_SLIDE, { recursive: true, force: true });
  mkdirSync(path.dirname(PUBLIC_SLIDE), { recursive: true });
  cpSync(SLIDE_DIST, PUBLIC_SLIDE, { recursive: true });
  console.log(`\nPublished ${path.relative(HOME_ROOT, SLIDE_DIST)} → ${path.relative(HOME_ROOT, PUBLIC_SLIDE)}`);
}

async function main() {
  console.log(`[build-slide] base=${BASE} root=${HOME_ROOT}`);
  ensureSubmodule();
  ensureDeps();
  await build();
  publish();
  console.log('[build-slide] done.');
}

main().catch((err) => {
  console.error(`[build-slide] failed: ${err.stack || err.message}`);
  process.exit(1);
});
