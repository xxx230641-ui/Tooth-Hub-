import { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';

interface ClinicLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ClinicLogo({ size = 'md', className = '' }: ClinicLogoProps) {
  const [failed, setFailed] = useState(false);

  const dims =
    size === 'sm'
      ? 'w-10 h-10'
      : size === 'lg'
        ? 'w-16 h-16'
        : 'w-12 h-12';

  if (failed) {
    return (
      <div
        className={`${dims} rounded-full bg-gradient-to-br from-[#0F2942] to-[#2A9D98] flex items-center justify-center text-white font-display font-bold text-sm shrink-0 ${className}`}
        aria-hidden="true"
      >
        TH
      </div>
    );
  }

  return (
    <div
      className={`${dims} rounded-full overflow-hidden bg-[#EBEBEB] ring-1 ring-[#0F2942]/10 shrink-0 ${className}`}
    >
      <img
        src={CLINIC_INFO.logoSrc}
        alt={CLINIC_INFO.nameEn}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover scale-[1.06]"
      />
    </div>
  );
}
