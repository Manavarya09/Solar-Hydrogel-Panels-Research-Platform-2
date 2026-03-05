import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  label?: string;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  defaultOn = false,
  onChange,
  className = '',
}) => {
  const [isOn, setIsOn] = useState(defaultOn);

  const handleToggle = () => {
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && <span className="engraved-label text-[10px]">{label}</span>}
      <div className={`toggle-track ${isOn ? 'on' : ''}`} onClick={handleToggle}>
        <motion.div
          className="toggle-thumb"
          animate={{ x: isOn ? 26 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </div>
    </div>
  );
};

interface PhysicalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'active-green' | 'active-amber';
  className?: string;
  disabled?: boolean;
}

export const PhysicalButton: React.FC<PhysicalButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const variantClass = variant === 'active-green' ? 'btn-active-green' :
    variant === 'active-amber' ? 'btn-active-amber' :
    'btn-physical';

  return (
    <motion.button
      className={`${variantClass} px-4 py-2 rounded font-engineering text-xs tracking-widest ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.button>
  );
};

export default Toggle;
