/**
 * 为已替换的 /illustrations/ SVG 路径补上 width/height，避免 Astro MissingImageDimension 错误
 */

import { readFileSync, writeFileSync } from 'fs'

const FILES = [
  'src/pages/index.astro',
  'src/pages/services.astro',
  'src/pages/solutions.astro',
  'src/pages/about.astro',
  'src/pages/pricing.astro',
  'src/pages/homes/mobile-app.astro',
  'src/pages/homes/personal.astro',
  'src/pages/homes/saas.astro',
  'src/pages/landing/click-through.astro',
  'src/pages/landing/lead-generation.astro',
  'src/pages/landing/pre-launch.astro',
  'src/pages/landing/product.astro',
  'src/pages/landing/sales.astro',
  'src/pages/landing/subscription.astro',
  'src/pages/zh-CN/index.astro',
  'src/pages/zh-CN/services.astro',
  'src/pages/zh-CN/solutions.astro',
  'src/pages/zh-CN/about.astro',
  'src/pages/zh-CN/pricing.astro',
  'src/pages/zh-TW/index.astro',
  'src/pages/zh-TW/solutions.astro',
  'src/pages/zh-TW/about.astro',
  'src/pages/zh-TW/pricing.astro',
  'src/pages/zh-TW/services.astro',
]

let totalFixed = 0

for (const file of FILES) {
  let content
  try {
    content = readFileSync(file, 'utf-8')
  } catch {
    continue
  }

  // 匹配 src: '/illustrations/...' 且该行/上下文没有 width 属性的情况
  // 在 src 值后插入 width: 1024, height: 768
  const before = content
  content = content.replace(
    /(src:\s*['"]\/illustrations\/[^'"]+['"])(\s*,?\s*)(?![\s\S]{0,50}width)/g,
    (match, srcPart, sep) => {
      // 已经有 width 的跳过
      return `${srcPart}, width: 1024, height: 768${sep}`
    }
  )

  if (content !== before) {
    writeFileSync(file, content, 'utf-8')
    const count = (before.match(/src:\s*['"]\/illustrations\/[^'"]+['"]/g) || []).length
    console.log(`✓ ${file} — 补充 ${count} 处尺寸`)
    totalFixed += count
  }
}

console.log(`\n完成！共处理 ${totalFixed} 处`)
