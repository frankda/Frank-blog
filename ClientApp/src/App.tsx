import React from 'react';
import './App.scss';
import BlogList from './components/BlogList/BlogList';

const App: React.FC = () => (
  <div className="container">
    <BlogList />
  </div>
);

export default App;
