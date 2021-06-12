import React, { useContext } from 'react';
import { ThemeContext } from 'context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThemeControl: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const renderIcon = () => {
    return <FontAwesomeIcon icon={currentTheme === 'light' ? 'moon' : 'sun'} />;
  };

  return (
    <button type="button" className="theme-control" onClick={changeTheme}>
      {renderIcon()}
    </button>
  );
};

export default ThemeControl;
