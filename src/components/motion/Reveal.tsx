import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
}

/** Slow blur-to-focus / fade-up scroll reveal. */
export function Reveal({ children, className = '', delay = 0, y = 28, blur = false }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.4, delay, ease: [0.22, 0.6, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
