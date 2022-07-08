import React from 'react';
import { Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import boba from '../../assets/boba-eats.png';

function AllDrinks() {

  const history = useHistory();
  
  const sampleList = [
    { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4, image: boba },
    { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5, image: boba },
    { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4, image: boba },
    { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5, image: boba },
    { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4, image: boba },
    { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5, image: boba },
    { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4, image: boba },
    { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5, image: boba },
  ];

  const handleClick = async (event) => {
    history.push(`/drink/${event}`);
  }

  return (
    <Box style={styles.box}>
      <Typography variant='h2' style={styles.searchResultText}>All Boba Drinks</Typography>
      <Container style={styles.container}>
        <List style={styles.list}>
          {sampleList.map((item, index) => (
            <ListItemButton key={index} onClick={() => handleClick(item.drinkName)}>
              <ListItemAvatar sx={{paddingRight: 5}}>
                <Avatar src={item.image} alt='' sx={{ width: 150, height: 150 }}/>
              </ListItemAvatar>
              <ListItemText>
                  <Typography variant='h5' style={styles.itemText}>{item.drinkName}</Typography>
                  <Typography variant='h6' style={styles.itemText} sx={{position: 'relative'}}>{item.shopName}</Typography>
                  <StarRatings numberOfStars={5} rating={item.rating} starDimension='20px' starSpacing='1px' />
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Container>
    </Box>
  );

}

export default AllDrinks;

const styles = {
  list: {
    width: '100%'
  },
  searchResultText: {
    marginTop: 100, 
    marginLeft: '10%',
  },
  box: {
    position: 'absolute',
    width: '100%',
  },
  container: {
    borderRadius: '2rem',
    backgroundColor: 'aliceblue',
    width: '90%',
    height: '100%',
  },
  itemText: {
    marginBottom: 7,
  }
};