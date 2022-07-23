import React, { useState, useEffect } from 'react';
import { Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import boba from '../../assets/boba-eats.png';
import { useHttpClient } from '../../hooks/http-hook';

function AllShops() {

  const {sendRequest} = useHttpClient();

  const [loadedShops, setLoadedShops] = useState();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const responseData = await sendRequest(`${process.env.PORT || process.env.REACT_APP_BACKEND}/api/shops`);
        setLoadedShops(responseData.shops);
      } catch (err) {}
    }
    fetchShops();
  }, [sendRequest]);

  return (
    <Box style={styles.box}>
      <Typography variant='h2' style={styles.searchResultText}>All Boba Shops</Typography>
      <Container style={styles.container}>
        <List style={styles.list}>
          {loadedShops && loadedShops.map((item, index) => (
            <Link key={index} to={`/shop/${item.id}`}>
              <ListItemButton>
                <ListItemAvatar sx={{paddingRight: 5}}>
                  <Avatar src={item.shopImage} alt='' sx={{ width: 150, height: 150 }}/>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant='h5' style={styles.itemText}>{item.shopName}</Typography>
                    <StarRatings numberOfStars={5} rating={item.avgRating} starDimension='20px' starSpacing='1px' />
                </ListItemText>
              </ListItemButton>              
            </Link>
          ))}
        </List>
      </Container>
    </Box>
  );

}

export default AllShops;

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