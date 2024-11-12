declare module 'lucide-react' {
    import * as React from 'react';
  
    export interface LucideProps extends React.SVGProps<SVGSVGElement> {
      size?: number;
      color?: string;
    }
    export const SunIcon: React.FC<LucideProps>;
    export const MoonIcon: React.FC<LucideProps>;
  }