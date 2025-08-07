import React, { useState, memo } from 'react';
import { styled } from '../stitches.config';

const CardContainer = styled('div', {
  borderRadius: '12px',
  position: 'relative',
  backgroundColor: '#0a0a0a',
  overflow: 'hidden',
  width: '100%',
  paddingBottom: '100%', // Creates 1:1 aspect ratio
  height: 0,
  transition: 'all 0.3s ease-out',
  cursor: 'pointer',
  
  variants: {
    blurred: {
      true: {
        filter: 'blur(2px)',
        transform: 'scale(0.98)',
        opacity: 0.7,
      }
    }
  }
});

const CardImage = styled('img', {
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

const CardOverlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)',
  display: 'flex',
  alignItems: 'flex-end',
  padding: '24px',
  transition: 'opacity 0.3s ease',
  opacity: 0,
  
  variants: {
    visible: {
      true: {
        opacity: 1,
      }
    }
  }
});

const CardTitle = styled('div', {
  fontSize: '18px',
  fontWeight: 600,
  color: 'white',
  fontFamily: '$heading',
  letterSpacing: '-0.01em',
  
  '@bp2': {
    fontSize: '20px',
  }
});

const Card = memo(({ card, index, hovered, setHovered }) => (
  <CardContainer
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    blurred={hovered !== null && hovered !== index}
  >
    <CardImage
      src={card.src}
      alt={card.title}
      loading="lazy"
    />
    <CardOverlay visible={hovered === index}>
      <CardTitle>{card.title}</CardTitle>
    </CardOverlay>
  </CardContainer>
));

Card.displayName = 'Card';

const GridContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  maxWidth: '1600px',
  margin: '0 auto',
  width: '100%',
  padding: '0 20px',
  
  '@bp1': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  
  '@bp2': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    padding: '0 40px',
  },
  
  '@media (min-width: 1400px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    padding: '0 60px',
  }
});

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <GridContainer>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </GridContainer>
  );
}