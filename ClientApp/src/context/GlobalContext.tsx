import React, { FC, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface IContextProps {
  currentTheme: string;
  setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = React.createContext({} as IContextProps);

export const ThemeProvider: FC<IProps> = ({ children }: IProps) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  return (
    <ThemeContext.Provider
      value={{ currentTheme, setCurrentTheme }}
    >
      { children }
    </ThemeContext.Provider>
  );
};
