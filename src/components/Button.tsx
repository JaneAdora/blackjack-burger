import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`pixel-btn pixel-btn-${variant} pixel-btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
