import React from 'react';
import { Box, Container, Typography, List, ListItemButton } from '@mui/material';
import PageHeader from '../Shared/PageHeader';
import './ShopOverview.css';
import boba from '../../assets/boba-eats.png';

import './ShopOverview.css';

const ShopOverview = props => {
    const sampleList = [
        { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4/5, image: boba },
        { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5/5, image: boba },
        { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4/5, image: boba },
        { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5/5, image: boba },
        { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4/5, image: boba },
        { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5/5, image: boba },
        { drinkName: 'Brown Sugar Milk', shopName: 'The Alley', rating: 4/5, image: boba },
        { drinkName: 'Brown Sugar Milk Tea', shopName: 'Coco', rating: 3.5/5, image: boba },
      ];
    return (
      <Box>
        <PageHeader />
        <Container style={styles.container}>
          <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Drinks</Typography>
          <List style={styles.list} class='scrollbar-hidden'>
            {sampleList.map((item, index) => (
              <ListItemButton key={index} sx={{backgroundImage: `url(${item.image})`}} style={styles.itemButton}>
                  <Box style={styles.textBackground}>
                    <Typography variant='h10' style={styles.typography}>{item.drinkName}</Typography>
                    <Typography variant='h11' style={styles.typography}>{item.shopName}</Typography>
                    <Typography variant='h11' style={styles.typography}>{item.rating}</Typography>
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
    position: 'absolute'
  },
  typography: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 5
  }
};