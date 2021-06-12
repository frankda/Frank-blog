import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'context/GlobalContext';
import ThemeControl from 'components/ThemeControl/ThemeControl';
import BlogUpload from 'components/BlogUpload/BlogUpload';
import BlogPage from 'pages/BlogPage/BlogPage';

import 'config/fontawesome';

const App: React.FC = () => (
  <ThemeProvider>
    <div className="app">
      <BrowserRouter>
        <Route exact path="/" component={BlogPage} />
        <Route path="/upload" component={BlogUpload} />
      </BrowserRouter>
      <ThemeControl />
    </div>
  </ThemeProvider>
);

export default App;
