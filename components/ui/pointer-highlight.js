import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

function PointerHighlight({
  children,
  containerClassName,
  rectangleClassName,
  pointerClassName,
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    }
    
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setWidth(rect.width);
        setHeight(rect.height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute -inset-1 rounded-lg bg-neutral-200 dark:bg-neutral-700",
                rectangleClassName
              )}
              style={{
                width: width + 8,
                height: height + 8,
                left: -4,
                top: -4,
              }}
            />
            <motion.svg
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={cn("absolute -top-2 -right-2 z-10", pointerClassName)}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Pointer />
            </motion.svg>
          </>
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </div>
  );
}

function Pointer() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0002 6L8.59021 7.41L13.1702 12L8.59021 16.59L10.0002 18L16.0002 12L10.0002 6Z"
        fill="currentColor"
      />
      <path
        d="M6.00021 6L4.59021 7.41L9.17021 12L4.59021 16.59L6.00021 18L12.0002 12L6.00021 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { PointerHighlight };
export default PointerHighlight;