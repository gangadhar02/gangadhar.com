import Link from 'next/link'
import { styled } from '../stitches.config'
import projectItems from '../data/projects'

export default function MobileProjectsPreview() {
  // Get the 2 most recent projects (from 2025)
  const recentProjects = projectItems[0].projects.slice(0, 2)

  return (
    <PreviewSection>
      <SectionTitle>Recent Projects</SectionTitle>
      <ProjectsGrid>
        {recentProjects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectIcon className={project.icon} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectStatus>{project.status}</ProjectStatus>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      <Link href="/projects" passHref>
        <ViewAllButton>View All Projects</ViewAllButton>
      </Link>
    </PreviewSection>
  )
}

const PreviewSection = styled('div', {
  display: 'none',
  '@bp3': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '3rem',
    width: '100%',
  },
})

const SectionTitle = styled('h3', {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '$primary',
  margin: '0 0 16px 0',
  textAlign: 'left',
})

const ProjectsGrid = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const ProjectCard = styled('div', {
  background: '$background',
  border: '1px solid $secondary',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
})

const ProjectIcon = styled('i', {
  fontSize: '24px',
  color: '$primary',
  background: '$hover',
  padding: '12px',
  borderRadius: '8px',
  flexShrink: 0,
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const ProjectContent = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const ProjectTitle = styled('h4', {
  fontSize: '1rem',
  fontWeight: '600',
  color: '$primary',
  margin: 0,
  lineHeight: 1.3,
})

const ProjectDescription = styled('p', {
  fontSize: '0.8rem',
  color: '$secondary',
  margin: '4px 0',
  lineHeight: 1.4,
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
})

const ProjectStatus = styled('span', {
  fontSize: '0.75rem',
  color: '$green',
  fontWeight: '500',
  background: 'rgba(138, 255, 128, 0.1)',
  padding: '2px 8px',
  borderRadius: '12px',
  alignSelf: 'flex-start',
  marginTop: '4px',
})

const ViewAllButton = styled('a', {
  background: '$hover',
  color: '$primary',
  border: '1px solid $secondary',
  borderRadius: '8px',
  padding: '12px 24px',
  textDecoration: 'none',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    background: '$primary',
    color: '$background',
    transform: 'translateY(-1px)',
  },
})