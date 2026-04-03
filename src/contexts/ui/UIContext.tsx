import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIState>({
  isSidebarOpen: false,
  toggleSidebar: () => undefined,
});

export const useUI = () => useContext(UIContext);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ isSidebarOpen, toggleSidebar }), [isSidebarOpen, toggleSidebar]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
