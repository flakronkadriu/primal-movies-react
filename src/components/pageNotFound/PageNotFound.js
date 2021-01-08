import React from 'react';
import warning from './warning.png';

import './PageNotFound.css';

const PageNotFound = () => (
    <div>
        <h1 className="error-heading">Error 404</h1>
        <img src={warning} alt="Warning" />
        <p className="error-subheading">Woops. Looks like this page doesn't exist.</p>
    </div>
);

export default PageNotFound;