import { motion } from "framer-motion";

interface TwistedArrowProps {
  color?: string;
  position?: { x: number; y: number };
  rotation?: number;
  seed?: number;
}

function randomOffset(seed: number, index: number, range: number): number {
  const x = Math.sin(seed * 9301 + index * 49297) * 0.5 + 0.5;
  return (x - 0.5) * range * 2;
}

export function TwistedArrow({
  color = "#000",
  position = { x: 0, y: 0 },
  rotation = 0,
  seed = 1,
}: TwistedArrowProps) {
  const r = (i: number, range = 6) => randomOffset(seed, i, range);

  const d = `M${10 + r(0)} ${40 + r(1)} Q${25 + r(2)} ${20 + r(3)} ${40 + r(4)} ${40 + r(5)} Q${55 + r(6)} ${60 + r(7)} ${70 + r(8)} ${40 + r(9)}`;

  return (
    <motion.svg
      viewBox="0 0 80 80"
      width="80"
      height="80"
      fill="none"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1] }}
        transition={{
          duration: 1.5,
          times: [0, 0.666, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.svg>
  );
}
