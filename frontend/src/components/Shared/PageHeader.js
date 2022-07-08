import React from 'react';

import './PageHeader.css';

const PageHeader = props => {
    return (
        <div>
            <div className='headerColor'>
                <h1 className='text'>{props.header}</h1>
            </div>
            <div className='headerLine'>
                <div className='logoCircle'></div>
            </div>
        </div>
        
    )
}

export default PageHeader;