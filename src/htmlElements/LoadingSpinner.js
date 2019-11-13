import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function LoadingSpinner(){
    return <div className="col-md-12 text-center"><FontAwesomeIcon color="white" size="6x" icon={faSpinner} spin /></div>;
}

export default LoadingSpinner;