import React from 'react';
import StarRatings from 'react-star-ratings';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import './PageHeader.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

const PageHeader = props => {
    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false,
                }
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    fontSize: 40
                }
            }
        }
      };
    const data = {
        labels: ["Positive 😍", "Negative 😢", "Surprised 😮"],
        datasets: [
            {
                data: [props.happyScore, props.sadScore+props.angryScore, props.surprisedScore],
                fill: true,
                backgroundColor: ["rgba(53, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgb(221,160,221, 0.5)"],
                barThickness: 20
            }
        ]
    }
    return (
        <div>
            <div className='headerContent'>
                <div className='headerLeft'>
                    <div className='rating' >
                        <StarRatings numberOfStars={5} rating={props.rating} starDimension='2vw' starSpacing='1px' />
                    </div>
                    <h1 className='text'>{props.header}</h1>
                </div>
                <div className='sentimentScores'>
                    {props.isDrink && (<Bar options={options} data={data} />)}
                </div>
            </div>
            <div className='headerLine'>
                <div className='logoCircle' style={{backgroundImage: `url(${props.image})`}}></div>
            </div>
        </div>
        
    )
}

export default PageHeader;