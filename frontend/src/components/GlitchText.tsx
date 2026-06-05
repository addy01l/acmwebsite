import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
}

// We kept the file name GlitchText.tsx to avoid import errors, 
// but this is now a "Seamless Mask Reveal" effect.
const GlitchText = ({ text }: GlitchTextProps) => {
  // Split by words instead of characters for a much smoother, more seamless look
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.8
      },
    },
    hidden: {
      opacity: 0,
      y: "100%", // Starts completely pushed down
      rotate: 2, // Slight tilt for an organic feel
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ 
        display: "inline-flex", 
        flexWrap: "wrap",
        overflow: "hidden",
        padding: "0 0.1em" // Prevent clipping of descenders
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <span 
          key={index} 
          style={{ 
            display: "inline-block", 
            overflow: "hidden", 
            marginRight: "0.25em" // Space between words
          }}
        >
          <motion.span
            variants={child}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default GlitchText;
