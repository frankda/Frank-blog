import React from 'react';
import logo from './logo.svg';
import './App.css';
import BlogList from './components/BlogList/BlogList';
import './scss/layout.scss';

function App() {
  return (
    <div className="container">
      <BlogList />
    </div>
  );
}

export default App;
