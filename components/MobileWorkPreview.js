import Link from 'next/link'
import { styled } from '../stitches.config'
import workItems from '../data/work'

export default function MobileWorkPreview() {
  const currentWork = workItems[0] // Get the most recent work item (Demandlane)

  return (
    <PreviewSection>
      <SectionTitle>Current Work</SectionTitle>
      <WorkCard>
        <LogoContainer>
          <CompanyLogo src={currentWork.companyLogo} alt={currentWork.company} />
        </LogoContainer>
        <WorkContent>
          <JobTitle>{currentWork.jobTitle}</JobTitle>
          <Company>{currentWork.company}</Company>
          <Description>{currentWork.description[0]}</Description>
        </WorkContent>
      </WorkCard>
      <Link href="/work" passHref>
        <ViewAllButton>View All Work</ViewAllButton>
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

const WorkCard = styled('div', {
  background: '$background',
  border: '1px solid $secondary',
  borderRadius: '12px',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'all 0.2s ease',
  minHeight: '120px',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
})

const LogoContainer = styled('div', {
  width: '60px',
  height: '60px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  borderRadius: '8px',
  padding: '8px',
})

const CompanyLogo = styled('img', {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
})

const WorkContent = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  minWidth: 0,
  overflow: 'hidden',
})

const JobTitle = styled('h4', {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '$primary',
  margin: 0,
  lineHeight: 1.3,
})

const Company = styled('p', {
  fontSize: '0.9rem',
  color: '$secondary',
  margin: '2px 0',
  fontWeight: '500',
})

const Description = styled('p', {
  fontSize: '0.85rem',
  color: '$secondary',
  margin: '6px 0 0 0',
  lineHeight: 1.4,
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
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