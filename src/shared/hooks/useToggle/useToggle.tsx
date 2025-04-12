import { useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  return {
    isOpen,
    setIsOpen,
    toggle: () => setIsOpen(prev => !prev),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
