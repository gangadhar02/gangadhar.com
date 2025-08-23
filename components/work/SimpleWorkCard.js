import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

// Component to highlight important keywords in text
function HighlightedText({ text }) {
  // Specific phrases to highlight - both individual keywords and full phrases
  const highlightPhrases = [
    // Full phrases
    '$300K+ (₹2.5Cr+) in paid media',
    'performance creatives, landing page copy, email campaigns, and social media content',
    'user acquisition and revenue growth',
    'program development, marketing strategy, sales enablement, and learner engagement',
    '5,000+ ambassadors resulting in 3.3M+ views, 11K+ Instagram followers',
    // Individual numbers and metrics
    '$300K+', '₹2.5Cr+', '3.3M+', '11K+', '5,000+', '300+',
    // Individual keywords
    'Sequoia-backed', 'AI-driven', 'highest AOV',
    'lead acquisition', 'paid media', 'ROI', 'scalability',
    'performance marketing', 'creative strategy', 'growth initiatives',
    'Fellowships', 'revenue driver', 'growth engine',
    'Spotify', 'Pepsi', 'UGC', 'branded filters'
  ];
  
  // Create regex pattern from phrases, escaping special characters
  const escapedPhrases = highlightPhrases.map(phrase => 
    phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const pattern = new RegExp(`(${escapedPhrases.join('|')})`, 'gi');
  
  // Split text by pattern and map to spans
  const parts = text.split(pattern);
  
  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches any of our highlight phrases
        const isHighlight = highlightPhrases.some(phrase => 
          part.toLowerCase() === phrase.toLowerCase()
        );
        
        if (isHighlight) {
          // Check if it's primarily a number/metric
          const isMetric = /[\d$₹+M K,]+/.test(part);
          
          if (isMetric) {
            return (
              <span key={index} className="font-medium text-primary">
                {part}
              </span>
            );
          } else {
            return (
              <span key={index} className="font-normal text-primary">
                {part}
              </span>
            );
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function SimpleWorkCard({ workItems, className }) {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false);
  
  const currentRole = workItems[0]; // First item is current
  const previousRoles = workItems.slice(1); // Rest are previous
  
  const formatDateRange = (start, end) => {
    const startDate = format(parseISO(start), 'MMM yyyy');
    const endDate = end ? format(parseISO(end), 'MMM yyyy') : 'Present';
    return `${startDate} – ${endDate}`;
  };

  const getLocationDisplay = (location, roleType) => {
    // Extract just the city/state or show Remote if applicable
    const locationParts = location.split(',');
    const shortLocation = locationParts[0] || location;
    
    // If it's remote work, show Remote instead of location
    if (roleType === 'Remote' || location.toLowerCase().includes('remote')) {
      return 'Remote';
    }
    
    return shortLocation;
  };

  const renderWorkCard = (work, index) => (
    <motion.div
      key={`${work.jobTitle}-${work.company}-${index}`}
      initial={index > 0 ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ 
        duration: 0.3, 
        delay: index > 0 ? index * 0.05 : 0,
        ease: "easeOut" 
      }}
      className="border border-black/[0.08] dark:border-white/[0.08] rounded p-3 bg-card transition-colors duration-150"
    >
      {/* Header with Title on left, Company on right */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">
          {work.jobTitle}
        </h3>
        <h3 className="text-lg font-semibold text-primary text-right">
          {work.company}
        </h3>
      </div>

      {/* Time Period on left, Location on right */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm text-secondary">
          {formatDateRange(work.startDate, work.endDate)}
        </div>
        <div className="text-sm text-secondary text-right">
          {getLocationDisplay(work.location, work.roleType)}
        </div>
      </div>

      {/* Short Description */}
      <div className="text-secondary leading-relaxed">
        {work.description && work.description[0] 
          ? <HighlightedText text={work.description[0]} />
          : work.responsibilities && work.responsibilities[0]
          ? <HighlightedText text={work.responsibilities[0]} />
          : work.highlights && work.highlights[0]
          ? <HighlightedText text={work.highlights[0]} />
          : 'Contributing to team success and driving key initiatives.'}
      </div>
    </motion.div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      {/* Current Role - Always Visible */}
      {currentRole && renderWorkCard(currentRole, 0)}
      
      {/* Previous Roles Toggle Button */}
      {previousRoles.length > 0 && (
        <div>
          <motion.button
            onClick={() => setShowPreviousRoles(!showPreviousRoles)}
            className={cn(
              "flex items-center gap-2 text-left py-2",
              "hover:text-primary transition-colors duration-200"
            )}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: showPreviousRoles ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-secondary" />
            </motion.div>
            <span className="font-medium text-secondary">Previous roles</span>
            <span className="text-sm text-secondary bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {previousRoles.length}
            </span>
          </motion.button>
          
          {/* Previous Roles - Expandable */}
          <AnimatePresence>
            {showPreviousRoles && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6 pt-4"
                >
                  {previousRoles.map((role, index) => renderWorkCard(role, index + 1))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}