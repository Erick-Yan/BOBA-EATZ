import React from 'react';
import Carousel from '../Shared/Carousel';
import {SocialMediaIconsReact} from 'social-media-icons-react';
import David from '../../assets/david-chang-profile.jpg';
import Erick from '../../assets/erick-yan-profile.jpg';

import './LandingPage.css';

const LandingPage = props => {
    const buttonStyle = {
        borderColor: "rgba(0,0,0,0.25)",
        backgroundColor: "aliceblue",
        margin: 5,
    };

    return (
        <div className='landingPage'>
            <Carousel className="carousel" />
            <div className='aboutUs'>
                <div className='whatWeDo'>
                    <h1>To All My Boba Lovers.</h1>
                    <h3>What should be my next Boba drink order?</h3>
                    <h3>What is the latest, greatest Boba drink in my area?</h3>
                    <h3>I want to try that one drink, but I'm not sure if it'll be good...</h3>
                    <p>
                        If any of these thoughts have popped in your head, no need to fret because 
                        MY BOBA is here to help! MY BOBA is social platform designed for Boba connoisseurs 
                        to share their opinions on the latest, greatest (or worst) boba drinks they've tried! 
                        Inside, you'll find thousands of Boba shops and Boba drinks, each with their unique 
                        reviews provided by your fellow Boba lovers.
                    </p>
                </div>
                <div className='ourTeam'>
                    <h1>Our Team.</h1>
                    <div className='memberProfile1'>
                        <div className='memberProfileLeft'>
                            <img src={David} alt="" />
                            <h3>David Chang</h3>
                            <p>Co-Founder, Software Engineer</p>
                            <div className='contactButtons'>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="mail" iconColor="black" size="35" url="https://www.youtube.com/channel/UC8qwhJMsUPR1s34QI3a7sFQ"/>
                                </div>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="github" iconColor="black" size="35" url="https://github.com/Erick-Yan"/>
                                </div>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="linkedin" iconColor="black" size="35" url="https://www.linkedin.com/in/erick-yan/"/>
                                </div>
                            </div>
                        </div>
                        <div className='memberProfileRight'>
                            <h2>I love Boba, and so should you!</h2>
                            <p>
                                Pellentesque habitant morbi tristique senectus et netus et 
                                malesuada fames ac turpis egestas. Vestibulum tortor quam, 
                                feugiat vitae, ultricies eget, tempor sit amet, ante. 
                                Donec eu libero sit amet quam egestas semper. Aenean ultricies 
                                mi vitae est. Mauris placerat eleifend leo. Pellentesque habitant morbi 
                                tristique senectus et netus et 
                                malesuada fames ac turpis egestas. Vestibulum tortor quam, 
                                feugiat vitae, ultricies eget, tempor sit amet, ante. 
                                Donec eu libero sit amet quam egestas semper. Aenean ultricies 
                                mi vitae est. Mauris placerat eleifend leo.
                            </p>
                        </div>
                    </div>
                    <div className='memberProfile2'>
                    <div className='memberProfileLeft'>
                            <h2>What is Boba?</h2>
                            <p>
                                Pellentesque habitant morbi tristique senectus et netus et 
                                malesuada fames ac turpis egestas. Vestibulum tortor quam, 
                                feugiat vitae, ultricies eget, tempor sit amet, ante. 
                                Donec eu libero sit amet quam egestas semper. Aenean ultricies 
                                mi vitae est. Mauris placerat eleifend leo. Pellentesque habitant morbi 
                                tristique senectus et netus et 
                                malesuada fames ac turpis egestas. Vestibulum tortor quam, 
                                feugiat vitae, ultricies eget, tempor sit amet, ante. 
                                Donec eu libero sit amet quam egestas semper. Aenean ultricies 
                                mi vitae est. Mauris placerat eleifend leo.
                            </p>
                        </div>
                        <div className='memberProfileRight'>
                            <img src={Erick} alt="" />
                            <h3>Erick Yan</h3>
                            <p>Co-Founder, Software Engineer</p>
                            <div className='contactButtons'>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="mail" iconColor="black" size="35" url="https://www.youtube.com/channel/UC8qwhJMsUPR1s34QI3a7sFQ"/>
                                </div>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="github" iconColor="black" size="35" url="https://github.com/Erick-Yan"/>
                                </div>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="linkedin" iconColor="black" size="35" url="https://www.linkedin.com/in/erick-yan/"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;