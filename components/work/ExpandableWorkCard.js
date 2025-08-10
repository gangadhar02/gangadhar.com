"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { differenceInMonths, format, parseISO } from 'date-fns';
import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from '../../lib/utils';

export function ExpandableWorkCard({ workItems }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  const getDuration = (start, end) => {
    const startDate = parseISO(start);
    const endDate = end ? parseISO(end) : new Date();
    const months = differenceInMonths(endDate, startDate);
    const decimalYears = Math.ceil((months / 12) * 10) / 10;

    if (decimalYears >= 1) {
      return `${decimalYears.toFixed(1)} yr${decimalYears !== 1 ? 's' : ''}`;
    }
    return `${months + 1} mos`;
  };

  const formatDateRange = (start, end) => {
    const startDate = format(parseISO(start), 'MMM yyyy');
    const endDate = end ? format(parseISO(end), 'MMM yyyy') : 'Present';
    return `${startDate} - ${endDate}`;
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
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
      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Modal Content */}
            <motion.div
              ref={ref}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative w-full max-w-[500px] max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full lg:hidden"
                onClick={() => setActive(null)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Company Logo Section */}
              <div className="h-80 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                {active.companyLogo ? (
                  <img
                    src={active.companyLogo}
                    alt={active.company}
                    className="max-w-[120px] max-h-[120px] object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {active.company?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col h-[calc(90vh-20rem)] md:h-auto md:max-h-96">
                {/* Header */}
                <div className="flex justify-between items-start p-4 flex-shrink-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-700 dark:text-neutral-200 text-lg">
                      {active.jobTitle}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base">
                      {active.company}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-1">
                      {formatDateRange(active.startDate, active.endDate)} • {getDuration(active.startDate, active.endDate)} • {active.location}
                    </p>
                  </div>

                  {(active.companyUrl || active.website) && (
                    <a
                      href={active.companyUrl || active.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 hover:bg-green-600 text-white ml-4"
                    >
                      Visit Company
                    </a>
                  )}
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-6">
                  {active.achievements && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {active.achievements.map((achievement, index) => (
                          <p key={index} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            ✨ {achievement}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {active.responsibilities && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Responsibilities
                      </h4>
                      <div className="space-y-3">
                        {active.responsibilities.map((responsibility, index) => (
                          <p key={index} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            • {responsibility}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {active.technologies && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Skills & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Cards */}
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {workItems.map((work, index) => (
          <div
            key={`${work.jobTitle}-${work.company}`}
            onClick={() => setActive(work)}
            className="flex flex-col rounded-xl cursor-pointer overflow-hidden bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Company Logo Background Section */}
            <div className="relative h-48 w-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
              {work.companyLogo ? (
                <img
                  src={work.companyLogo}
                  alt={work.company}
                  className="max-w-[80px] max-h-[80px] object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {work.company?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Content Section */}
            <div className="p-6 text-center">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg mb-2">
                {work.jobTitle}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base mb-3">
                {work.company}
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                {formatDateRange(work.startDate, work.endDate)} - {work.roleType || 'Full-time'}
              </p>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}