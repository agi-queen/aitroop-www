/**
 * unDraw SVG 批量下载脚本
 * 用法: node scripts/download-undraw.mjs
 * 可选: node scripts/download-undraw.mjs --color 6366F1
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'public', 'illustrations')
const TOTAL_PAGES = 42
const CONCURRENCY = 5 // 并发下载数

// 从命令行参数读取颜色，默认用品牌色
const colorArg = process.argv.find((a, i) => process.argv[i - 1] === '--color')
const COLOR = colorArg || '6366F1'

mkdirSync(OUTPUT_DIR, { recursive: true })

async function fetchPage(page) {
  // 第1页路径是 /illustrations，后续页是 /illustrations/2、/3...
  const url = page === 1 ? 'https://undraw.co/illustrations' : `https://undraw.co/illustrations/${page}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; undraw-downloader/1.0)' }
  })
  const html = await res.text()

  // 从 __NEXT_DATA__ script 标签中提取 JSON
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
  if (!match) {
    console.warn(`  [警告] 第 ${page} 页未找到 __NEXT_DATA__`)
    return []
  }

  try {
    const data = JSON.parse(match[1])
    const items = data?.props?.pageProps?.illustrations || []
    return items.map(item => ({
      title: item.title,
      slug: item.newSlug,
    }))
  } catch (e) {
    console.warn(`  [警告] 第 ${page} 页 JSON 解析失败:`, e.message)
    return []
  }
}

async function downloadSvg(item) {
  const filename = `${item.slug}.svg`
  const filepath = join(OUTPUT_DIR, filename)

  if (existsSync(filepath)) {
    return { status: 'skip', slug: item.slug }
  }

  try {
    // 用颜色参数下载（颜色替换通过 URL 参数实现）
    const svgUrl = `https://cdn.undraw.co/illustration/${item.slug}.svg`
    const res = await fetch(svgUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; undraw-downloader/1.0)' }
    })

    if (!res.ok) {
      return { status: 'error', slug: item.slug, reason: res.status }
    }

    let svgContent = await res.text()

    // 替换主色为指定颜色（unDraw SVG 主色通常是 #6C63FF）
    svgContent = svgContent.replace(/#6C63FF/gi, `#${COLOR}`)

    writeFileSync(filepath, svgContent, 'utf-8')
    return { status: 'ok', slug: item.slug }
  } catch (e) {
    return { status: 'error', slug: item.slug, reason: e.message }
  }
}

// 并发控制
async function runWithConcurrency(tasks, limit) {
  const results = []
  const queue = [...tasks]

  async function worker() {
    while (queue.length > 0) {
      const task = queue.shift()
      results.push(await task())
    }
  }

  await Promise.all(Array.from({ length: limit }, worker))
  return results
}

async function main() {
  console.log(`\nunDraw SVG 批量下载`)
  console.log(`输出目录: ${OUTPUT_DIR}`)
  console.log(`品牌色: #${COLOR}`)
  console.log(`共 ${TOTAL_PAGES} 页，开始抓取列表...\n`)

  // 逐页抓取所有插画列表
  const allItems = []
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    process.stdout.write(`  抓取第 ${page}/${TOTAL_PAGES} 页...`)
    const items = await fetchPage(page)
    allItems.push(...items)
    console.log(` ${items.length} 个插画`)
    await new Promise(r => setTimeout(r, 200)) // 避免请求过快
  }

  console.log(`\n共找到 ${allItems.length} 个插画，开始下载...\n`)

  let done = 0
  const tasks = allItems.map(item => async () => {
    const result = await downloadSvg(item)
    done++
    const icon = result.status === 'ok' ? '✓' : result.status === 'skip' ? '-' : '✗'
    process.stdout.write(`\r  [${icon}] ${done}/${allItems.length} - ${item.slug.slice(0, 40).padEnd(40)}`)
    return result
  })

  const results = await runWithConcurrency(tasks, CONCURRENCY)

  const ok = results.filter(r => r.status === 'ok').length
  const skip = results.filter(r => r.status === 'skip').length
  const err = results.filter(r => r.status === 'error').length

  console.log(`\n\n下载完成！`)
  console.log(`  成功: ${ok}`)
  console.log(`  跳过(已存在): ${skip}`)
  console.log(`  失败: ${err}`)

  if (err > 0) {
    console.log('\n失败列表:')
    results.filter(r => r.status === 'error').forEach(r => {
      console.log(`  - ${r.slug}: ${r.reason}`)
    })
  }

  // 生成索引文件，方便后续引用
  const index = allItems.map(item => ({
    title: item.title,
    slug: item.slug,
    path: `/illustrations/${item.slug}.svg`
  }))
  writeFileSync(
    join(OUTPUT_DIR, '_index.json'),
    JSON.stringify(index, null, 2),
    'utf-8'
  )
  console.log(`\n索引已生成: public/illustrations/_index.json`)
}

main().catch(console.error)
