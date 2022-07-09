import React, {useState, useEffect} from 'react';
import { Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import boba from '../../assets/boba-eats.png';
import {useHttpClient} from '../../hooks/http-hook';

function AllDrinks() {

  const [loadedDrinks, setLoadedDrinks] = useState();
  const {sendRequest} = useHttpClient();
  
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/drinks");
        setLoadedDrinks(responseData.drinks);
      } catch (err) {}
    }
    fetchShops();
  }, [sendRequest]);

  return (
    <Box style={styles.box}>
      <Typography variant='h2' style={styles.searchResultText}>All Boba Drinks</Typography>
      <Container style={styles.container}>
        <List style={styles.list}>
          {loadedDrinks && loadedDrinks.map((item, index) => (
            <Link key={index} to={`/drink/${item.id}`}>
              <ListItemAvatar sx={{paddingRight: 5}}>
                <Avatar src={item.drinkImage} alt='' sx={{ width: 150, height: 150 }}/>
              </ListItemAvatar>
              <ListItemText>
                  <Typography variant='h5' style={styles.itemText}>{item.drinkName}</Typography>
                  <Typography variant='h6' style={styles.itemText} sx={{position: 'relative'}}>{item.shopId.shopName}</Typography>
                  <StarRatings numberOfStars={5} rating={item.avgRating} starDimension='20px' starSpacing='1px' />
              </ListItemText>
            </Link>
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