import React, {useState, useEffect} from 'react';
import { Box, Container, Typography, List, ListItemButton } from '@mui/material';
import StarRatings from 'react-star-ratings';
import {useHttpClient} from '../../hooks/http-hook';
import PageHeader from '../Shared/PageHeader';
import './Overview.css';
import boba from '../../assets/boba-eats.png';

const DrinkOverview = ({ drinkId }) => {
  const [loadedDrink, setLoadedDrink] = useState();
  const {sendRequest} = useHttpClient();
  
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/drinks/${drinkId}`);
        setLoadedDrink(responseData.drink);
      } catch (err) {}
    }
    fetchDrinks();
  }, [sendRequest]);
  
  return (
    <React.Fragment>
      {loadedDrink && (
        <Box>
          <PageHeader header={loadedDrink.drinkName} image={loadedDrink.drinkImage} rating={loadedDrink.avgRating} />
          <Container style={styles.container}>
            <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Reviews</Typography>
            <List style={styles.list} className='scrollbar-hidden'>
              {loadedDrink.reviews.map((item, index) => (
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
            </List>
        </Container>
        </Box>
      )}
    </React.Fragment>
  )
}

export default DrinkOverview;

const styles = {
  container: {
    marginTop: 150,
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