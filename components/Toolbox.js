import { motion } from 'framer-motion'
import {
  SiMeta,
  SiGoogleads,
  SiFramer,
  SiGooglesheets,
  SiMidjourney,
  SiOpenai,
  SiAnthropic,
  SiNotion,
} from 'react-icons/si'
import { RiVideoLine, RiSearchLine } from 'react-icons/ri'
import { styled } from '../stitches.config'

const tools = [
  { name: 'Meta Ads', icon: SiMeta, color: '#1877F2' },
  { name: 'Google Ads', icon: SiGoogleads, color: '#4285F4' },
  { name: 'Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'Google Sheets', icon: SiGooglesheets, color: '#34A853' },
  { name: 'Mid Journey', icon: SiMidjourney, color: '#000000' },
  { name: 'Kling', icon: RiVideoLine, color: '#FF6B6B' },
  { name: 'ChatGPT', icon: SiOpenai, color: '#74AA9C' },
  { name: 'Claude', icon: SiAnthropic, color: '#D97706' },
  { name: 'Perplexity', icon: RiSearchLine, color: '#20B2AA' },
  { name: 'Notion', icon: SiNotion, color: '#000000' },
]

export default function Toolbox() {
  return (
    <ToolboxContainer>
      <h2>My Tools</h2>
      <ToolGrid>
        {tools.map((tool, index) => {
          if (!tool.icon) return null
          const IconComponent = tool.icon
          return (
            <Tool key={index} whileHover={{ scale: 1.1 }}>
              <IconWrapper style={{ color: tool.color }}>
                <IconComponent size={40} />
              </IconWrapper>
              <ToolName>{tool.name}</ToolName>
            </Tool>
          )
        })}
      </ToolGrid>
    </ToolboxContainer>
  )
}

const ToolboxContainer = styled('div', {
  marginTop: '2rem',
})

const ToolGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '2rem',
  marginTop: '2rem',
})

const Tool = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  borderRadius: '12px',
  background: '$hover',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: '$background',
  },
})

const IconWrapper = styled('div', {
  fontSize: '2.5rem',
  marginBottom: '0.5rem',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease',
  '& svg': {
    transition: 'transform 0.3s ease',
  },
  '&:hover svg': {
    transform: 'rotate(360deg)',
  },
})

const ToolName = styled('span', {
  fontSize: '0.9rem',
  color: '$secondary',
  textAlign: 'center',
})
