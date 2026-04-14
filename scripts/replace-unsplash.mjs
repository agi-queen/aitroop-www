/**
 * 将 Unsplash 图片 URL 替换为本地 unDraw SVG 插画
 * 用法: node scripts/replace-unsplash.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

// Unsplash photo ID → 本地插画路径（按页面语义匹配）
const URL_MAP = {
  // index/hero: 团队工作场景
  'photo-1552664730': '/illustrations/teamwork_zplp.svg',
  // index/content: 数据分析
  'photo-1559136555': '/illustrations/data-at-work_3tbf.svg',
  // index/content: 差异化/成功因素
  'photo-1519389950473': '/illustrations/success-factors_i417.svg',

  // services/hero: 分析仪表盘
  'photo-1460925895917': '/illustrations/real-time-analytics_50za.svg',
  // services/content: AI 助手
  'photo-1507003211169': '/illustrations/ai-agent_pdkp.svg',

  // solutions: 团队协作
  'photo-1522202176988': '/illustrations/global-team_8jok.svg',
  // solutions: 数据分析
  'photo-1516321318423': '/illustrations/data-analysis_b7cp.svg',
  'photo-1516321497487': '/illustrations/data-analysis_b7cp.svg',
  // solutions: 商业决策
  'photo-1533750349088': '/illustrations/business-decisions_7vkl.svg',
  // solutions: 预测分析
  'photo-1543286386': '/illustrations/predictive-analytics_6gsu.svg',
  // solutions: 远程工作者
  'photo-1573497491765': '/illustrations/remote-worker_0l91.svg',

  // about/hero: 创始团队
  'photo-1522071820081': '/illustrations/founding-team_8uhm.svg',
  // about/content: 解决问题/头脑风暴
  'photo-1504384308090': '/illustrations/brainstorming_gny9.svg',

  // mobile-app
  'photo-1535303311164': '/illustrations/mobile-analytics_bz2a.svg',
  'photo-1521517407911': '/illustrations/online-collaboration_xon8.svg',
  'photo-1576153192621': '/illustrations/live-collaboration_i8an.svg',
  'photo-1453738773917': '/illustrations/work-from-anywhere_tpk5.svg',

  // saas
  'photo-1580481072645': '/illustrations/our-solution_qv3b.svg',
  'photo-1620558138198': '/illustrations/data-trends_kv5v.svg',
  'photo-1531973486364': '/illustrations/in-the-office_e7pg.svg',
  'photo-1635070041078': '/illustrations/visual-data_1eya.svg',
  'photo-1514621166532': '/illustrations/marketing-analysis_2u5r.svg',

  // personal
  'photo-1491349174775': '/illustrations/digital-artwork_xlmm.svg',
  'photo-1658248165252': '/illustrations/deep-work_muov.svg',
  'photo-1619983081563': '/illustrations/artist-at-work_yos7.svg',
  'premium_photo-1683288295841': '/illustrations/my-workspace_5961.svg',

  // landing pages
  'photo-1597423498219': '/illustrations/brainstorming_gny9.svg',
  'photo-1558803116': '/illustrations/coming-soon_7lvi.svg',
  'photo-1473188588951': '/illustrations/product-explainer_b7ft.svg',
  'photo-1621452773781': '/illustrations/bull-market_4a8e.svg',
  'photo-1593510987046': '/illustrations/business-call_w1gr.svg',

  // pricing
  'photo-1516321318423-f06f85e504b3': '/illustrations/data-analysis_b7cp.svg',
}

// 目标文件（主要页面 + 多语言版本，排除 homes 和 landing demo）
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

let totalReplaced = 0

for (const file of FILES) {
  let content
  try {
    content = readFileSync(file, 'utf-8')
  } catch {
    continue // 文件不存在则跳过
  }

  let changed = false
  let replacedInFile = 0

  for (const [photoId, svgPath] of Object.entries(URL_MAP)) {
    // 匹配包含该 photo ID 的完整 Unsplash URL（直到引号结束）
    const urlRegex = new RegExp(
      `https://(?:images\\.unsplash\\.com|plus\\.unsplash\\.com)/(?:flagged/)?${photoId}[^'"]*`,
      'g'
    )
    if (!urlRegex.test(content)) continue
    urlRegex.lastIndex = 0

    const before = content
    // 替换 URL，并在 src 值后追加 width/height（在同一行找到 alt 或 } 之前插入）
    content = content.replace(urlRegex, svgPath)

    // 为已替换的行补上 width/height（避免 Astro 报错 MissingImageDimension）
    // 匹配形如: src: '/illustrations/xxx.svg', 且同行没有 width 的情况
    content = content.replace(
      /(src:\s*['"]\/illustrations\/[^'"]+['"])(?!\s*,?\s*width)/g,
      '$1, width: 1024, height: 768'
    )

    if (content !== before) {
      const count = (before.match(urlRegex) || []).length
      replacedInFile += count
      changed = true
    }
  }

  if (changed) {
    writeFileSync(file, content, 'utf-8')
    console.log(`✓ ${file} — 替换 ${replacedInFile} 处`)
    totalReplaced += replacedInFile
  }
}

console.log(`\n完成！共替换 ${totalReplaced} 处 Unsplash URL`)
