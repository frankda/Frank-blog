import React from 'react';

const Navigation: React.FunctionComponent = () => (
  <nav className="navigation">
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-3">
          <h1>Frank Da</h1>
        </div>
        <div className="col-md-9 navigation__links-container">
          <a className="navigation__link" href="/">Blog</a>
          <a className="navigation__link" href="/">About me</a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;
