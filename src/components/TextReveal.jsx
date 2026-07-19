import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

const word = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TextReveal({ text, className = "", delay = 0, as = "p", once = true }) {
  const Tag = motion[as] || motion.p;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block mr-[0.28em]">
          {w}
        </motion.span>
      ))}
    </Tag>
  );
}
