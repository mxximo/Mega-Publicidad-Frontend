import { cn } from '../../lib/utils';

interface CrystalBackgroundProps {
  className?: string;
}

export default function CrystalBackground({ className }: CrystalBackgroundProps) {
  return (
    <div className={cn('overflow-hidden', className)} aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="cb-g1" cx="20%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.38" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-g2" cx="80%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-g3" cx="50%" cy="85%" r="45%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-g4" cx="65%" cy="15%" r="35%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.26" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="cb-blur">
            <feGaussianBlur stdDeviation="90" />
          </filter>
          <filter id="cb-blur-sm">
            <feGaussianBlur stdDeviation="50" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="transparent" />
        <ellipse cx="320" cy="200" rx="550" ry="420" fill="url(#cb-g1)" filter="url(#cb-blur)" />
        <ellipse cx="1120" cy="450" rx="480" ry="380" fill="url(#cb-g2)" filter="url(#cb-blur)" />
        <ellipse cx="700" cy="760" rx="420" ry="320" fill="url(#cb-g3)" filter="url(#cb-blur)" />
        <ellipse cx="950" cy="130" rx="300" ry="250" fill="url(#cb-g4)" filter="url(#cb-blur-sm)" />
      </svg>
    </div>
  );
}
