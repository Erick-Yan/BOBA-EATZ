import React, {useEffect, useState, useTransition} from 'react';
import {motion} from 'framer-motion';
import CarouselBox from './CarouselBox';
import image1 from "../../assets/boba-eats.png";
import image2 from "../../assets/IMG_0864.JPG";
import image3 from "../../assets/IMG_0869.JPG";
import { useHttpClient } from '../../hooks/http-hook';

import "./Carousel.css";

const Carousel = props => {
    const {sendRequest} = useHttpClient();

    const [awards, setAwards] = useState([]);
    const [position, setPosition] = useState(0);
    const [activeDot, setActiveDot] = useState({
        left: true,
        middle: false,
        right: false
    });

    // const awards = [
    //     {
    //         image: image1,
    //         awardName: "Highest Rated Drink",
    //         nominee: "Milk Tea 1",
    //         restaurantName: "Coco"
    //     },
    //     {
    //         image: image2,
    //         awardName: "Most Popular Drink",
    //         nominee: "Milk Tea 2",
    //         restaurantName: "The Alley"
    //     },
    //     {
    //         image: image3,
    //         awardName: "Highest Rated Shop",
    //         nominee: "The Alley",
    //         restaurantName: ""
    //     },
    // ]

    const Left = () => {
        setPosition(0);
        setActiveDot({
            left: true,
            middle: false,
            right: false
        });
    }
    const Middle = () => {
        setPosition(1);
        setActiveDot({
            left: false,
            middle: true,
            right: false
        });
    }
    const Right = () => {
        setPosition(2);
        setActiveDot({
            left: false,
            middle: false,
            right: true
        });
    }

    let newAwards = [];
    useEffect(() => {
        const fetchAwards = async () => {
          try {
            const drinkData = await sendRequest("http://localhost:5000/api/drinks/awards");
            let highestRatedDrink = drinkData.highestRatedDrink
            highestRatedDrink.image = highestRatedDrink.drinkImage;
            highestRatedDrink.awardName = "Highest Rated Drink";
            highestRatedDrink.nominee = highestRatedDrink.drinkName;
            highestRatedDrink.restaurantName = highestRatedDrink.shopName;
            newAwards.push(highestRatedDrink);

            let mostPopularDrink = drinkData.mostPopularDrink
            mostPopularDrink.image = mostPopularDrink.drinkImage;
            mostPopularDrink.awardName = "Highest Rated Drink";
            mostPopularDrink.nominee = mostPopularDrink.drinkName;
            mostPopularDrink.restaurantName = mostPopularDrink.shopName;
            newAwards.push(mostPopularDrink);

            const shopData = await sendRequest("http://localhost:5000/api/shops/awards");
            let highestRatedShop = shopData.highestRatedShop
            highestRatedShop.image = highestRatedShop.shopImage;
            highestRatedShop.awardName = "Highest Rated Shop";
            highestRatedShop.nominee = highestRatedShop.shopName;
            highestRatedShop.restaurantName = "";
            newAwards.push(highestRatedShop);

            setAwards(newAwards);
          } catch (err) {}
        }
        fetchAwards();
      }, [sendRequest]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            let currentPosition;
            setPosition((index) => {
                if (index+1 <= newAwards.length-1) {
                    currentPosition = (index + 1) % 3;
                    return (index + 1) % 3;
                }
                currentPosition = 0;
                return 0;
            });
            setActiveDot(() => {
                Object.keys(activeDot).forEach((key, index) => {
                    if (index === currentPosition) {
                        activeDot[key] = true;
                    } else {
                        activeDot[key] = false;
                    }
                });
                // console.log(currentPosition);
                // console.log(activeDot);
                return activeDot;
            });
        }, 4000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <React.Fragment>
            {awards && awards.length === 3 && (<div className='carousel'>
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
                    <button className={"dot"+(activeDot.left ? '-active' : '')} onClick={Left}></button>
                    <button className={"dot"+(activeDot.middle ? '-active' : '')} onClick={Middle}></button>
                    <button className={"dot"+(activeDot.right ? '-active' : '')} onClick={Right}></button>
                </div>
            </div>)}
        </React.Fragment>
    )
}

export default Carousel;