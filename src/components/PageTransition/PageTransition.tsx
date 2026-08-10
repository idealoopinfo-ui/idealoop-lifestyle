import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number;
}

export default function PageTransition({
  children,
  duration = 0.35,
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -15,
      }}
      transition={{
        duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}