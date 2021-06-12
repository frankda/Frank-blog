import React, { useContext } from 'react';
import { ThemeContext } from 'context/GlobalContext';

const ThemeControl: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  return (
    <div>
      test
    </div>
  );
};

export default ThemeControl;
