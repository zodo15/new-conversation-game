declare module 'use-sound' {
  type PlayFunction = () => void;
  type HookOptions = {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: Record<string, [number, number]>;
  };

  export default function useSound(
    src: string,
    options?: HookOptions
  ): [PlayFunction, { stop: () => void }];
}

declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  export const FaBomb: IconType;
  export const FaLaugh: IconType;
  export const FaAngry: IconType;
  export const FaSurprise: IconType;
  export const FaSadTear: IconType;
  export const FaHeart: IconType;
  export const FaGlassCheers: IconType;
  export const FaHeartBroken: IconType;
  export const FaHistory: IconType;
  export const FaDice: IconType;
  export const FaBolt: IconType;
  export const FaClock: IconType;
  export const FaSkull: IconType;
  export const FaQuestion: IconType;
}

declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    zIndex?: number;
  }

  function confetti(options?: Options): Promise<null>;
  export = confetti;
}

declare module 'react-hot-toast' {
  interface ToastOptions {
    duration?: number;
    position?: string;
    style?: React.CSSProperties;
    className?: string;
    icon?: React.ReactNode;
  }

  export const Toaster: React.FC<{
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    reverseOrder?: boolean;
    gutter?: number;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    toastOptions?: {
      duration?: number;
      style?: React.CSSProperties;
      className?: string;
      success?: {
        duration?: number;
        theme?: {
          primary?: string;
          secondary?: string;
        };
      };
      error?: {
        duration?: number;
        theme?: {
          primary?: string;
          secondary?: string;
        };
      };
    };
  }>;

  export const toast: {
    (message: string | React.ReactNode, options?: ToastOptions): string;
    success(message: string | React.ReactNode, options?: ToastOptions): string;
    error(message: string | React.ReactNode, options?: ToastOptions): string;
    loading(message: string | React.ReactNode, options?: ToastOptions): string;
    dismiss(toastId?: string): void;
  };
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }
  
  export const Sparkles: FC<IconProps>;
  export const Zap: FC<IconProps>;
  export const Brain: FC<IconProps>;
  export const Users: FC<IconProps>;
  export const Dumbbell: FC<IconProps>;
  export const Palette: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const Crown: FC<IconProps>;
  export const RotateCcw: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const X: FC<IconProps>;
  export const PlusCircle: FC<IconProps>;
  export const RefreshCw: FC<IconProps>;
  export const XIcon: FC<IconProps>;
}
