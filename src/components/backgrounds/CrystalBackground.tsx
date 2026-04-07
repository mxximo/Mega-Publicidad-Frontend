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
          <radialGradient id="cb-g1" cx="25%" cy="30%" r="50%">
            <stop offset="0%" stopColor="var(--public-primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-g2" cx="75%" cy="60%" r="45%">
            <stop offset="0%" stopColor="var(--public-secondary)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-g3" cx="50%" cy="80%" r="40%">
            <stop offset="0%" stopColor="var(--public-accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="cb-blur">
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="var(--public-bg)" />
        <ellipse cx="360" cy="270" rx="500" ry="400" fill="url(#cb-g1)" filter="url(#cb-blur)" />
        <ellipse cx="1080" cy="540" rx="450" ry="350" fill="url(#cb-g2)" filter="url(#cb-blur)" />
        <ellipse cx="720" cy="720" rx="400" ry="300" fill="url(#cb-g3)" filter="url(#cb-blur)" />
      </svg>
    </div>
  );
}
