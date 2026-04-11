import { Link } from 'react-router-dom'
import { Box, Container, Flex, Grid, Separator, Text } from '@radix-ui/themes'

const VALUES = [
  {
    title: 'Speed',
    body: 'We move fast and ship often. Every hour of delay is an hour developers spend waiting instead of building.',
  },
  {
    title: 'Trust',
    body: 'We never obscure what we do with your code, your keys, or your data. Transparency is the default.',
  },
  {
    title: 'Openness',
    body: 'We share our thinking — in public. Research, decisions, failures — all on the record.',
  },
]

const PRINCIPLES = [
  {
    n: '01',
    title: 'Developer experience is the product.',
    body: 'If setting up an AI environment takes more than thirty seconds, we\'ve already failed. We measure ourselves by the time from idea to running session.',
  },
  {
    n: '02',
    title: 'Infrastructure should be invisible.',
    body: 'Developers shouldn\'t think about containers, certificates, or routing. They should think about the problem they\'re solving. We handle the rest.',
  },
  {
    n: '03',
    title: 'Cost must always be legible.',
    body: 'Every request, every token, every cent — tracked and shown to you in real time. No surprise bills. No hidden markups.',
  },
  {
    n: '04',
    title: 'Security is not a feature. It\'s a foundation.',
    body: 'Isolated networks, encrypted credentials, and zero-trust auth are not add-ons. They are the baseline from which everything else is built.',
  },
]

export default function MissionPage() {
  return (
    <>
      {/* ── Module 1: Enterprise Pitch Hero ───────────────────── */}
      <div className="pitch-hero-section">
        <Container size="3">
          <span className="pitch-hero-eyebrow">AI-Enterprise · 2026</span>
          <span className="pitch-hero-heading">
            AI 落地，<br />正当时。
          </span>
          <span className="pitch-hero-sub">
            企业智能化转型的窗口正在收窄。
            我们帮助企业识别高价值场景、搭建 AI Agent 系统、
            实现 1–10 倍效率提升——从战略到落地，全链路协助。
          </span>
          <Link to="/pitch" className="pitch-hero-cta">阅读完整报告 →</Link>
        </Container>
      </div>

      <Separator size="4" />

      {/* ── Module 2: Mission Hero ─────────────────────────────── */}
      <Box className="mission-hero">
        <Container size="3">
          <Flex direction="column" align="center" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }} gap="5">
            <Text className="label">Our Mission</Text>
            <Text className="mission-heading">
              At the heart<br />of AITroop.
            </Text>
          </Flex>
        </Container>
      </Box>

      <Separator size="4" />

      {/* ── Module 3: Core Statement ───────────────────────────── */}
      <Box py="9">
        <Container size="2">
          <Flex direction="column" align="center" style={{ textAlign: 'center' }} gap="4">
            <Text className="mission-statement">
              We want to make AI development<br />
              <em>accessible to every team.</em>
            </Text>
            <Text className="mission-body" style={{ maxWidth: 560 }}>
              Today, using AI in production is still too slow, too expensive, and too opaque.
              We're building the platform that changes that — starting with the environments
              developers actually work in.
            </Text>
          </Flex>
        </Container>
      </Box>

      <Separator size="4" />

      {/* ── Module 4: Values ──────────────────────────────────── */}
      <Box py="9" style={{ background: '#f7f7f5' }}>
        <Container size="4">
          <Text className="section-eyebrow" mb="7" style={{ display: 'block', textAlign: 'center' }}>Our Values</Text>
          <Text className="section-intro" mb="8" style={{ display: 'block', textAlign: 'center' }}>
            The things we refuse to compromise on.
          </Text>
          <Grid columns={{ initial: '1', sm: '3' }} gap="6">
            {VALUES.map(v => (
              <Flex key={v.title} direction="column" gap="3">
                <Text className="value-title">{v.title}</Text>
                <Text className="value-body">{v.body}</Text>
              </Flex>
            ))}
          </Grid>
        </Container>
      </Box>

      <Separator size="4" />

      {/* ── Module 5: Principles ──────────────────────────────── */}
      <Box py="9">
        <Container size="4">
          <Text className="section-eyebrow" mb="3" style={{ display: 'block' }}>Our Principles</Text>
          <Text className="section-intro" mb="9" style={{ display: 'block', maxWidth: 480 }}>
            We put our values into action.
          </Text>
          <Flex direction="column" gap="0">
            {PRINCIPLES.map((p, i) => (
              <Box key={p.n}>
                <Grid columns={{ initial: '1', sm: '3' }} gap="6" py="7">
                  <Text className="principle-n">{p.n}</Text>
                  <Flex direction="column" gap="3" style={{ gridColumn: 'span 2' }}>
                    <Text className="principle-title">{p.title}</Text>
                    <Text className="principle-body">{p.body}</Text>
                  </Flex>
                </Grid>
                {i < PRINCIPLES.length - 1 && <Separator size="4" />}
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>

      <Separator size="4" />

      {/* ── Module 6: CTA ─────────────────────────────────────── */}
      <Box py="9">
        <Container size="2">
          <Flex direction="column" align="center" style={{ textAlign: 'center' }} gap="5">
            <Text className="section-eyebrow">Join us</Text>
            <Text className="mission-cta-heading">Do you think we'd click?</Text>
            <Text className="mission-body">
              We're looking for people who care deeply about developer tools,<br />
              AI infrastructure, and building things that last.
            </Text>
            <a href="mailto:careers@aitroop.net" className="cta-link">See open roles →</a>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
