import React from 'react';
import { Box, Container, Typography, List, ListItemButton } from '@mui/material';
import StarRatings from 'react-star-ratings';
import PageHeader from '../Shared/PageHeader';
import './Overview.css';
import boba from '../../assets/boba-eats.png';

const DrinkOverview = ({ drinkName }) => {
    const sampleList = [
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
        { review: 'it was gud. Not bahd.', user: 'David', rating: 4, image: boba },
      ];
    return (
      <Box>
        <PageHeader header={drinkName}/>
        <Container style={styles.container}>
          <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Reviews</Typography>
          <List style={styles.list} class='scrollbar-hidden'>
            {sampleList.map((item, index) => (
              <ListItemButton key={index} style={styles.itemButton}>
                <img src={item.image} alt='' style={{ height: '110%', marginLeft: -16}}/>
                <Box style={styles.textBox}>
                  <Typography variant='h6'>"{item.review}"</Typography>
                  <Typography variant='h11' sx={{marginBottom: 1}}>
                    - {item.user}
                  </Typography>
                  <StarRatings numberOfStars={5} rating={item.rating} starDimension='20px' starSpacing='1px' />
                </Box>
              </ListItemButton>
            ))}
          </List>
      </Container>
      </Box>
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
    height: 200,
    marginRight: 10,
    marginBottom: 25,
  },
  textBox: {
    display:'flex',
    padding: 10,
    flexDirection: 'column'
  }
};