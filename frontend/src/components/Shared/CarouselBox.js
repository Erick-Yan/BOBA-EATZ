import React from 'react';

import './CarouselBox.css';

const CarouselBox = props => {
    const {image, awardName, nominee, restaurantName} = props;
    return (
        <div className="carouselBox" style={{backgroundImage: `url(${image})`}}>
            <div className='awardInfo'>
                <h1 className='awardName'>{awardName}</h1>
                <h2 className='nominee'>{nominee}</h2>
                {(restaurantName ? <h4 className='restaurantName'>From {restaurantName}</h4> : <h3></h3>)}
            </div>
        </div>
    )
}

export default CarouselBox;