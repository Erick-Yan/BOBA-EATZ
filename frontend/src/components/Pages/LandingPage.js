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
                                I am a boba connoisseur. Born in Taiwan, the land of the bobas, I was destined for boba greatness. 
                                Jokes aside, I am kind of addicted to bubble tea and always love trying new boba drinks. However, I struggled
                                find a comprehensive guide on seeing how individual drinks from different shops stack up 
                                against each other. Since Erick and I were looking to do a project together, MY BOBA was born.
                            </p>
                        </div>
                    </div>
                    <div className='memberProfile2'>
                    <div className='memberProfileLeft'>
                            <h2>Our Choice Today is Our Life Tomorrow...</h2>
                            <p>
                                Now the quote above might be an exaggeration, but when it comes to which boba drink you get, 
                                it CAN be a make or break your day type of situation. Although I am no boba connoisseur like 
                                my colleague above, I am your average foodie and constantly need validation from my fellow 
                                foodies on whether my next meal is good one or not. As a 2nd year Systems 
                                Design Engineering student at the University of Waterloo, MY BOBA came to fruition from both 
                                my passion for food and application development experience. As David and I
                                continue on our learning journey, we are excited to bring new features and updates to the site. 
                                In fact, we already have a list of things we'd like to implement right away. Have any ideas yourself? 
                                Feel free to reach out to any one of us and we'll gladly consider any recommendations!
                            </p>
                        </div>
                        <div className='memberProfileRight'>
                            <img src={Erick} alt="" />
                            <h3>Erick Yan</h3>
                            <p>Co-Founder, Software Engineer</p>
                            <div className='contactButtons'>
                                <div className="contactButton" >
                                <SocialMediaIconsReact {...buttonStyle} roundness={50} icon="mail" iconColor="black" size="35" url="mailto:e5yan@uwaterloo.ca"/>
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