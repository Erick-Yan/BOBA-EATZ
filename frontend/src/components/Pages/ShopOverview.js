import React from 'react';
import { Box, Container, Typography, List, ListItemButton } from '@mui/material';
import StarRatings from 'react-star-ratings';
import PageHeader from '../Shared/PageHeader';
import { useHistory } from 'react-router-dom';
import './Overview.css';
import boba from '../../assets/boba-eats.png';

const ShopOverview = ({ shopName }) => {

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

  const handleClick = (event) => {
    history.push(`/drink/${event}`);
  }
  
  return (
    <Box>
      <PageHeader header={shopName}/>
      <Container style={styles.container}>
        <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Drinks</Typography>
        <List style={styles.list} class='scrollbar-hidden'>
          {sampleList.map((item, index) => (
            <ListItemButton key={index} sx={{backgroundImage: `url(${item.image})`}} style={styles.itemButton} onClick={() => handleClick(item.drinkName)}>
                <Box style={styles.textBackground}>
                  <Box style={{paddingLeft: 10, paddingBottom: 10, display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h10' style={styles.typography}>{item.drinkName}</Typography>
                    <Typography variant='h11' style={styles.typography}>{item.shopName}</Typography>
                    <StarRatings numberOfStars={5} rating={item.rating} starDimension='20px' starSpacing='1px' />
                  </Box>
                </Box>
            </ListItemButton>
        ))}
        </List>
    </Container>
    </Box>
  )
}

export default ShopOverview;

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
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    width: 300,
    height: 200,
    marginRight: 10,
    marginBottom: 25,
  },
  textBackground: {
    backgroundImage:
    `linear-gradient(
    to top,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.75) 15%,
    rgba(255, 255, 255, 0) 100%
    )`,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '97%',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  typography: {
    alignSelf: 'flex-start',
    paddingBottom: 7
  }
};