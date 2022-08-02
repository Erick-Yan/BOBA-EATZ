import React, {useState, useEffect} from 'react';
import { Box, Container, Typography, List, ListItemButton } from '@mui/material';
import StarRatings from 'react-star-ratings';
import {useHttpClient} from '../../hooks/http-hook';
import PageHeader from '../Shared/PageHeader';
import './Overview.css';
import "./DrinkOverview.css";

const DrinkOverview = ({ drinkId }) => {
  const [loadedDrink, setLoadedDrink] = useState();
  const [loadedReviews, setLoadedReviews] = useState();
  const {sendRequest} = useHttpClient();
  
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND}/api/drinks/${drinkId}`);
        setLoadedDrink(responseData.drink);
        setLoadedReviews(responseData.drink.reviews);
      } catch (err) {}
    }
    fetchDrinks();
  }, [sendRequest]);

  const handleReviews = (e) => {
    const filterString = e.target.value;
    if (filterString === "All") {
      setLoadedReviews(loadedDrink.reviews);
      return;
    }
    let filteredReviews = loadedDrink.reviews.filter((review) => review.reviewMessage.toLowerCase().includes(filterString.toLowerCase()));
    setLoadedReviews(filteredReviews);
    return;
  }
  
  return (
    <React.Fragment>
      {loadedDrink && (
        <Box>
          <PageHeader 
            header={loadedDrink.drinkName} 
            image={loadedDrink.drinkImage} 
            rating={loadedDrink.avgRating} 
            happyScore={loadedDrink.happyScore}
            surprisedScore={loadedDrink.surprisedScore}
            sadScore={loadedDrink.sadScore}
            angryScore={loadedDrink.angryScore}
          />
          <Container style={styles.container1}>
            <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Filters</Typography>
            <button className="Filter-Button All-Button" value={"All"} onClick={handleReviews}>All</button>
            {loadedDrink.positiveSents.map((item, index) => (
              <button className="Filter-Button Positive-Sent" key={index} value={item} onClick={handleReviews}>{item}</button>
            ))}
            {loadedDrink.negativeSents.map((item, index) => (
              <button className="Filter-Button Negative-Sent" key={index} value={item} onClick={handleReviews}>{item}</button>
            ))}
            {loadedDrink.positiveWords.map((item, index) => (
              <button className="Filter-Button Positive-Word" key={index} value={item} onClick={handleReviews}>{item}</button>
            ))}
            {loadedDrink.negativeWords.map((item, index) => (
              <button className="Filter-Button Negative-Word" key={index} value={item} onClick={handleReviews}>{item}</button>
            ))}
          </Container>
          <Container style={styles.container2}>
            <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Reviews</Typography>
            {loadedReviews && (<List style={styles.list} className='scrollbar-hidden'>
              {loadedReviews.map((item, index) => (
                <ListItemButton key={index} style={styles.itemButton}>
                  <Box style={styles.textBox}>
                    <Typography style={styles.reviewMessage} className='scrollbar-hidden' variant='h6'>"{item.reviewMessage}"</Typography>
                    <Typography variant='h11' sx={{marginBottom: 1}}>
                      - {item.reviewerName}
                    </Typography>
                    <Typography variant='h11' sx={{marginBottom: 1}}>{item.reviewDate}</Typography>
                    <StarRatings numberOfStars={5} rating={item.reviewRating} starDimension='20px' starSpacing='1px' />
                  </Box>
                </ListItemButton>
              ))}
            </List>)}
        </Container>
        </Box>
      )}
    </React.Fragment>
  )
}

export default DrinkOverview;

const styles = {
  container1: {
    marginTop: 150,
    borderRadius: '2rem',
    maxWidth: '90%',
  },
  container2: {
    marginTop: 50,
    borderRadius: '2rem',
    backgroundColor: 'aliceblue',
    maxWidth: '90%',
  },
  list: {
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'row',
    overflow: 'auto',
  },
  itemButton: {
    backgroundColor: 'white',
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'row',
    width: 400,
    height: 420,
    marginRight: 10,
    marginBottom: 25,
  },
  textBox: {
    display:'flex',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    height: 400,
    overflow: 'hidden',
  },
  reviewMessage: {
    overflow: 'scroll',
  }
};