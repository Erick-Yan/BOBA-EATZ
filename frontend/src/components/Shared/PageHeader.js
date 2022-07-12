import React from 'react';
import StarRatings from 'react-star-ratings';

import './PageHeader.css';

const PageHeader = props => {
    console.log(props.image);
    return (
        <div>
            <div className='headerColor'>
                <div className='rating' >
                    <StarRatings numberOfStars={5} rating={props.rating} starDimension='2vw' starSpacing='1px' />
                </div>
                <h1 className='text'>{props.header}</h1>
            </div>
            <div className='headerLine'>
                <div className='logoCircle' style={{backgroundImage: `url(${props.image})`}}></div>
            </div>
        </div>
        
    )
}

export default PageHeader;