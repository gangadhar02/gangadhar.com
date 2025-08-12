import React, { useState, memo } from 'react';
import { cn } from '../lib/utils';





const Card = memo(({ card, index, hovered, setHovered }) => {
  const isBlurred = hovered !== null && hovered !== index;
  const isHovered = hovered === index;
  
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-xl relative bg-[#0a0a0a] overflow-hidden w-full",
        "pb-[100%] h-0 cursor-pointer transform-gpu will-change-transform",
        "transition-opacity duration-200 ease-out",
        isBlurred && "opacity-60"
      )}
      style={{
        transform: isBlurred ? 'scale(0.98)' : 'scale(1)',
        filter: isBlurred ? 'blur(1px)' : 'none',
        transition: 'transform 0.2s ease-out, filter 0.2s ease-out, opacity 0.2s ease-out'
      }}
    >
      <img
        src={card.src}
        alt={card.title}
        loading="lazy"
        className="object-cover absolute inset-0 w-full h-full transform-gpu"
      />
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent via-transparent",
          "to-black/70 flex items-end p-6 transform-gpu"
        )}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease-out'
        }}
      >
        <div className={cn(
          "text-lg font-semibold text-white font-heading tracking-tight",
          "bp2:text-xl"
        )}>
          {card.title}
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';


export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={cn(
      "grid grid-cols-1 gap-5 max-w-[1600px] mx-auto w-full px-5",
      "bp1:grid-cols-2 bp1:gap-6",
      "bp2:grid-cols-3 bp2:gap-8 bp2:px-10",
      "min-[1400px]:grid-cols-3 min-[1400px]:gap-10 min-[1400px]:px-[60px]"
    )}>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}