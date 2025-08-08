import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { styled } from '../../stitches.config';
import { Icon } from '../Icon';

export function ExpandableProjectCard({ projects }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active && typeof active === "object" && (
          <ModalContainer>
            <CloseButton
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </CloseButton>
            <ModalContent
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
            >
              <ImageContainer layoutId={`image-${active.title}-${id}`}>
                <ProjectIcon className={active.icon || 'ri-folder-line'} size="large" />
              </ImageContainer>

              <ContentWrapper>
                <HeaderSection>
                  <HeaderContent>
                    <Title
                      layoutId={`title-${active.title}-${id}`}
                    >
                      {active.title}
                    </Title>
                    <Description
                      layoutId={`description-${active.description}-${id}`}
                    >
                      {active.description}
                    </Description>
                  </HeaderContent>

                  <CTAButton
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </CTAButton>
                </HeaderSection>
                <DetailsSection>
                  <DetailContent
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {active.highlights && active.highlights.length > 0 && (
                      <HighlightsSection>
                        {active.highlights.map((item, index) => (
                          <HighlightItem key={index}>✨ {item}</HighlightItem>
                        ))}
                      </HighlightsSection>
                    )}
                    
                    {active.detailedDescription && (
                      <DetailedDescription>
                        {active.detailedDescription.map((item, index) => (
                          <DetailParagraph key={index}>{item}</DetailParagraph>
                        ))}
                      </DetailedDescription>
                    )}

                    {active.technologies && active.technologies.length > 0 && (
                      <TechSection>
                        <TechTitle>Technologies</TechTitle>
                        <TechList>
                          {active.technologies.map((tech, idx) => (
                            <TechItem key={idx}>{tech}</TechItem>
                          ))}
                        </TechList>
                      </TechSection>
                    )}

                    {active.githubUrl && (
                      <SecondaryLink
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code →
                      </SecondaryLink>
                    )}
                  </DetailContent>
                </DetailsSection>
              </ContentWrapper>
            </ModalContent>
          </ModalContainer>
        )}
      </AnimatePresence>
      
      <Grid>
        {projects.map((card, index) => (
          <CardContainer
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: active ? (active.title === card.title ? 1 : 0.3) : 1,
              y: 0,
              scale: active && active.title !== card.title ? 0.96 : 1,
            }}
            transition={{
              delay: active ? 0 : index * 0.05,
              duration: 0.3,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ 
              scale: active ? 1 : 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <CardContent>
              <IconWrapper layoutId={`image-${card.title}-${id}`}>
                <ProjectIcon className={card.icon || 'ri-folder-line'} />
              </IconWrapper>
              <CardTextContent>
                <CardTitle
                  layoutId={`title-${card.title}-${id}`}
                >
                  {card.title}
                </CardTitle>
                <CardDescription
                  layoutId={`description-${card.description}-${id}`}
                >
                  {card.description}
                </CardDescription>
                <CardTechList
                  animate={{ opacity: active ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {card.technologies?.slice(0, 3).map((tech, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <TechSeparator>-</TechSeparator>}
                      <span>{tech}</span>
                    </React.Fragment>
                  ))}
                  {card.technologies?.length > 3 && (
                    <span> +{card.technologies.length - 3}</span>
                  )}
                </CardTechList>
              </CardTextContent>
            </CardContent>
          </CardContainer>
        ))}
      </Grid>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: '16px', height: '16px', color: 'white' }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const Backdrop = styled(motion.div, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  height: '100%',
  width: '100%',
  zIndex: 10,
  backdropFilter: 'blur(2px)',
});

const ModalContainer = styled('div', {
  position: 'fixed',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  zIndex: 100,
  pointerEvents: 'none',
  '& > *': {
    pointerEvents: 'auto',
  },
});

const CloseButton = styled(motion.button, {
  display: 'flex',
  position: 'absolute',
  top: '20px',
  right: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50%',
  height: '32px',
  width: '32px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  cursor: 'pointer',
  zIndex: 101,
  transition: 'background-color 0.2s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  '@bp2': {
    display: 'none',
  },
});

const ModalContent = styled(motion.div, {
  width: '100%',
  maxWidth: '500px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$background',
  overflow: 'hidden',
  border: '1px solid $hover',
  
  '@bp1': {
    height: 'fit-content',
    maxHeight: '90%',
    borderRadius: '24px',
  },
});

const ImageContainer = styled(motion.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  background: 'linear-gradient(135deg, $hover 0%, $background 100%)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
  },
  
  '@bp1': {
    height: '240px',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  },
});

const ProjectIcon = styled(Icon, {
  fontSize: '64px',
  color: '$primary',
  position: 'relative',
  zIndex: 1,
  
  variants: {
    size: {
      large: {
        fontSize: '96px',
      },
    },
  },
});

const ContentWrapper = styled('div', {});

const HeaderSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  padding: '20px',
  borderBottom: '1px solid $hover',
});

const HeaderContent = styled('div', {
  flex: 1,
});

const Title = styled(motion.h3, {
  fontWeight: '600',
  color: '$primary',
  fontSize: '20px',
  margin: 0,
  lineHeight: 1.3,
});

const Description = styled(motion.p, {
  color: '$secondary',
  fontSize: '14px',
  margin: '8px 0 0 0',
  lineHeight: 1.5,
});

const CTAButton = styled(motion.a, {
  padding: '10px 20px',
  fontSize: '14px',
  borderRadius: '999px',
  fontWeight: '600',
  backgroundColor: '$primary',
  color: '$background',
  textDecoration: 'none',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
});

const DetailsSection = styled('div', {
  padding: '20px',
  position: 'relative',
});

const DetailContent = styled(motion.div, {
  color: '$secondary',
  fontSize: '14px',
  maxHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  paddingRight: '10px',
  
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '$hover',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$secondary',
    borderRadius: '3px',
    '&:hover': {
      background: '$primary',
    },
  },
  
  '@bp1': {
    fontSize: '15px',
  },
});

const HighlightsSection = styled('div', {
  backgroundColor: '$hover',
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.05)',
});

const HighlightItem = styled('p', {
  fontSize: '14px',
  margin: '0 0 8px 0',
  color: '$highlight',
  lineHeight: 1.6,
  '&:last-child': {
    marginBottom: 0,
  },
});

const DetailedDescription = styled('div', {});

const DetailParagraph = styled('p', {
  margin: '0 0 16px 0',
  lineHeight: 1.7,
  color: '$primary',
  '&:last-child': {
    marginBottom: 0,
  },
});

const TechSection = styled('div', {});

const TechTitle = styled('h4', {
  color: '$primary',
  fontSize: '16px',
  marginBottom: '12px',
  margin: '0 0 12px 0',
  fontWeight: '600',
});

const TechList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const TechItem = styled('span', {
  backgroundColor: '$hover',
  color: '$primary',
  fontSize: '13px',
  padding: '6px 12px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.05)',
});

const SecondaryLink = styled('a', {
  display: 'inline-block',
  fontSize: '14px',
  color: '$primary',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '10px 20px',
  border: '1px solid $primary',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '$primary',
    color: '$background',
    transform: 'translateY(-2px)',
  },
});

const Grid = styled('ul', {
  maxWidth: '800px',
  margin: '0 auto',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'start',
  gap: '20px',
  listStyle: 'none',
  padding: 0,
  
  '@bp1': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const CardContainer = styled(motion.div, {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  cursor: 'pointer',
  backgroundColor: '$background',
  border: '1px solid $hover',
  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  height: '100%',
  
  '&:hover': {
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    borderColor: '$primary',
  },
});

const CardContent = styled('div', {
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
  width: '100%',
});

const IconWrapper = styled(motion.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '160px',
  width: '100%',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, $hover 0%, $background 100%)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 100%)',
  },
});

const CardTextContent = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const CardTitle = styled(motion.h3, {
  fontWeight: '600',
  color: '$primary',
  textAlign: 'center',
  fontSize: '18px',
  margin: 0,
  
  '@bp1': {
    textAlign: 'left',
  },
});

const CardDescription = styled(motion.p, {
  color: '$secondary',
  textAlign: 'center',
  fontSize: '14px',
  margin: '8px 0 0 0',
  lineHeight: 1.5,
  
  '@bp1': {
    textAlign: 'left',
  },
});

const CardTechList = styled(motion.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '12px',
  fontSize: '13px',
  color: '$secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});

const TechSeparator = styled('span', {
  margin: '0 6px',
  color: '$secondary',
  opacity: 0.5,
});