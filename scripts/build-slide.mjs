/**
 * Build apps/my-slide and publish to /slide path of the home site.
 *
 * Steps:
 *   1. Ensure submodule is initialized + deps installed.
 *   2. Run `npm run build` inside apps/my-slide (open-slide build).
 *   3. Post-process dist so it works when served from /slide/:
 *      - Rewrite absolute /assets/ URLs to /slide/assets/ in index.html and CSS files.
 *      - Inject a runtime shim into index.html that strips /slide from
 *        location.pathname and re-adds it on history pushState/replaceState,
 *        so the open-slide React Router (which has no basename) keeps working.
 *   4. Mirror the processed dist into <home>/public/slide/.
 */

import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HOME_ROOT = path.resolve(__dirname, '..');
const SLIDE_ROOT = path.join(HOME_ROOT, 'apps', 'my-slide');
const SLIDE_DIST = path.join(SLIDE_ROOT, 'dist');
const PUBLIC_SLIDE = path.join(HOME_ROOT, 'public', 'slide');
const BASE = '/slide';

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

function run(cmd, args, cwd) {
  console.log(`\n$ ${cmd} ${args.join(' ')}  (cwd=${path.relative(HOME_ROOT, cwd) || '.'})`);
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: true });
  if (result.error) {
    throw new Error(`${cmd} failed to spawn: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} exited with status ${result.status}`);
  }
}

function ensureSubmodule() {
  if (!existsSync(path.join(SLIDE_ROOT, 'package.json'))) {
    throw new Error(
      `apps/my-slide is not initialized. Run \`git submodule update --init --recursive\` first.`,
    );
  }
}

function ensureDeps() {
  const lock = path.join(SLIDE_ROOT, 'package-lock.json');
  const nm = path.join(SLIDE_ROOT, 'node_modules');
  if (!existsSync(nm)) {
    run(npmCmd, [existsSync(lock) ? 'ci' : 'install'], SLIDE_ROOT);
  }
}

function build() {
  run(npmCmd, ['run', 'build'], SLIDE_ROOT);
}

const SHIM = `<script>(function(){var B='${BASE}';try{var d=Object.getOwnPropertyDescriptor(Location.prototype,'pathname');if(d&&d.get&&d.configurable){Object.defineProperty(Location.prototype,'pathname',{configurable:true,enumerable:true,get:function(){var p=d.get.call(this);if(p===B||p===B+'/')return '/';if(p.indexOf(B+'/')===0)return p.slice(B.length);return p;},set:function(v){d.set.call(this,typeof v==='string'&&v.charAt(0)==='/'&&v.indexOf(B+'/')!==0&&v!==B?B+v:v);}});}}catch(e){}function W(u){if(typeof u!=='string')return u;if(u.indexOf('http')===0){try{var x=new URL(u);if(x.pathname.indexOf(B+'/')!==0&&x.pathname!==B)x.pathname=(B+x.pathname).replace(/\\/+/g,'/');return x.toString();}catch(e){return u;}}if(u.charAt(0)!=='/')return u;if(u===B||u.indexOf(B+'/')===0)return u;return B+u;}var oP=history.pushState,oR=history.replaceState;history.pushState=function(s,t,u){return oP.call(this,s,t,W(u));};history.replaceState=function(s,t,u){return oR.call(this,s,t,W(u));};})();</script>`;

function rewriteAssetPaths(content) {
  return content.replace(/\/assets\//g, `${BASE}/assets/`);
}

function processIndexHtml(file) {
  let html = readFileSync(file, 'utf8');
  html = rewriteAssetPaths(html);
  if (!html.includes('window.__slideShimInstalled')) {
    // Mark so we don't double-inject if script runs twice in same dist
    const marker = SHIM.replace('(function(){', '(function(){if(window.__slideShimInstalled)return;window.__slideShimInstalled=true;');
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${marker}`);
  }
  writeFileSync(file, html);
  console.log(`  rewrote ${path.relative(SLIDE_DIST, file)}`);
}

function processCssFile(file) {
  const css = readFileSync(file, 'utf8');
  const updated = rewriteAssetPaths(css);
  if (updated !== css) {
    writeFileSync(file, updated);
    console.log(`  rewrote ${path.relative(SLIDE_DIST, file)}`);
  }
}

function walk(dir, visitor) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, visitor);
    else visitor(full);
  }
}

function postProcess() {
  if (!existsSync(SLIDE_DIST)) {
    throw new Error(`Expected ${SLIDE_DIST} after build, but it was not produced.`);
  }
  const indexHtml = path.join(SLIDE_DIST, 'index.html');
  if (!existsSync(indexHtml)) {
    throw new Error(`${indexHtml} missing — open-slide build output unexpected.`);
  }
  processIndexHtml(indexHtml);
  walk(SLIDE_DIST, (file) => {
    if (file.toLowerCase().endsWith('.css')) processCssFile(file);
  });
}

function publish() {
  if (existsSync(PUBLIC_SLIDE)) {
    rmSync(PUBLIC_SLIDE, { recursive: true, force: true });
  }
  mkdirSync(path.dirname(PUBLIC_SLIDE), { recursive: true });
  cpSync(SLIDE_DIST, PUBLIC_SLIDE, { recursive: true });
  console.log(`\nPublished ${path.relative(HOME_ROOT, SLIDE_DIST)} → ${path.relative(HOME_ROOT, PUBLIC_SLIDE)}`);
}

function main() {
  console.log(`[build-slide] base=${BASE} root=${HOME_ROOT}`);
  ensureSubmodule();
  ensureDeps();
  build();
  postProcess();
  publish();
  console.log('[build-slide] done.');
}

try {
  main();
} catch (err) {
  console.error(`[build-slide] failed: ${err.message}`);
  process.exit(1);
}
