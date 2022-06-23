import React, {useEffect, useState, useTransition} from 'react';
import {motion} from 'framer-motion';
import CarouselBox from './CarouselBox';
import image1 from "../../assets/boba-eats.png";
import image2 from "../../assets/IMG_0864.JPG";
import image3 from "../../assets/IMG_0869.JPG";

import "./Carousel.css";

const Carousel = props => {
    const [position, setPosition] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const awards = [
        {
            image: image1,
            awardName: "Highest Rated Drink",
            nominee: "Milk Tea 1",
            restaurantName: "Coco"
        },
        {
            image: image2,
            awardName: "Most Popular Drink",
            nominee: "Milk Tea 2",
            restaurantName: "The Alley"
        },
        {
            image: image3,
            awardName: "Highest Rated Shop",
            nominee: "The Alley",
            restaurantName: ""
        },
    ]

    const Left = () => {
        setPosition(0);
        setActiveDot(0);
    }
    const Middle = () => {
        setPosition(1);
        setActiveDot(1);
    }
    const Right = () => {
        setPosition(2);
        setActiveDot(2);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            let currentPosition;
            setPosition((index) => {
                if (index+1 <= awards.length-1) {
                    currentPosition = (index + 1) % 3;
                    return (index + 1) % 3;
                }
                currentPosition = 0;
                return 0;
            });
            setActiveDot(currentPosition);
            console.log(currentPosition);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [activeDot]);

    return (
        <React.Fragment>
            <div className='carousel'>
                <div className="row">
                    {awards.map((award, index) => (
                    <motion.div
                        className="container"
                        key={index}
                        initial={{ scale: 0, rotation: -180 }}
                        animate={{
                            rotate: 0,
                            left: `${(index - position) * 80 - 40}vw`,
                            scale: index === position ? 1 : 0.8,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <CarouselBox 
                            className="carouselBox" 
                            image={award.image} 
                            awardName={award.awardName}
                            nominee={award.nominee}
                            restaurantName={award.restaurantName}
                        />
                    </motion.div>
                    ))}
                </div>
                <div className='dots'>
                    <button className={"dot"+(activeDot === 0 ? '-active' : '')} onClick={Left}></button>
                    <button className={"dot"+(activeDot === 1 ? '-active' : '')} onClick={Middle}></button>
                    <button className={"dot"+(activeDot === 2 ? '-active' : '')} onClick={Right}></button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Carousel;