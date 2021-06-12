import React, { useContext } from 'react';
import './App.scss';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { ThemeContext } from 'context/GlobalContext';
import ThemeControl from 'components/ThemeControl/ThemeControl';
import BlogUpload from 'components/BlogUpload/BlogUpload';
import BlogPage from 'pages/BlogPage/BlogPage';

import 'config/fontawesome';

const App: React.FC = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <div className={`app ${currentTheme}`}>
      <BrowserRouter>
        <Route exact path="/" component={BlogPage} />
        <Route path="/upload" component={BlogUpload} />
      </BrowserRouter>
      <ThemeControl />
    </div>
  );
};

export default App;
