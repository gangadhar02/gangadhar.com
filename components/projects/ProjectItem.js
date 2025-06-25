import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { styled } from '../../stitches.config'
import { Icon } from '../Icon'

export default function ProjectItem({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ProjectContainer
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimContainer>
        {isHovered && (
          <AnimHovered
            layoutId="sharedHover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}

        <ProjectIcon className={project.icon || 'ri-folder-line'} />
        <Body>
          <Title>{project.title}</Title>
          <Description>{project.description}</Description>
          <TechList>
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <TechItem key={index}>{tech}</TechItem>
            ))}
            {project.technologies?.length > 3 && (
              <MoreTech>+{project.technologies.length - 3}</MoreTech>
            )}
          </TechList>
          {project.stats && <Stats>{project.stats}</Stats>}
        </Body>
      </AnimContainer>
    </ProjectContainer>
  )
}

export const ProjectContainer = styled('div', {
  display: 'flex',
  cursor: 'pointer',
  transition: 'opacity $duration ease-in-out',
  border: '0',
  borderRadius: '$borderRadius',
  textDecoration: 'none',
  width: 'auto',
  '&:hover': { opacity: 1 },
})

export const ProjectIcon = styled(Icon, {
  fontSize: '48px',
  marginBottom: '10px',
  marginTop: '10px',
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  color: '$primary',
  transition: 'all 0.2s ease',
})

export const Body = styled('div', {
  flex: '1 1 auto',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
})

export const Title = styled('p', {
  color: '$primary',
  fontSize: '18px',
  margin: '0',
  fontWeight: 'bold',
})

export const Description = styled('p', {
  color: '$secondary',
  fontSize: '14px',
  margin: '5px 0 0',
  lineHeight: 1.4,
})

export const Stats = styled('p', {
  color: '$highlight',
  fontSize: '13px',
  margin: '8px 0 0',
  fontStyle: 'italic',
  fontWeight: 'bold',
})

export const TechList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '6px',
  marginTop: '10px',
})

export const TechItem = styled('span', {
  background: '$hover',
  color: '$primary',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '999px',
})

export const MoreTech = styled('span', {
  color: '$secondary',
  fontSize: '12px',
  alignSelf: 'center',
})

const AnimContainer = styled(motion.div, {
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '12px',
  marginBottom: '12px',
  padding: '5px',
  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
  '&:hover': {
    opacity: 1,
    transform: 'translateY(-12px) scale(1.07)',
    boxShadow: '0 20px 48px 0 rgba(31,38,135,0.28)',
    
    '& ${ProjectIcon}': {
      transform: 'scale(1.1)',
      color: '$highlight',
    },
  },
})

const AnimHovered = styled(motion.span, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: 0,
})