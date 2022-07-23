import React, {useState, useEffect} from 'react';
import { Box, Container, Typography, List, ListItemButton } from '@mui/material';
import StarRatings from 'react-star-ratings';
import PageHeader from '../Shared/PageHeader';
import { Link } from 'react-router-dom';
import './Overview.css';
import { useHttpClient } from '../../hooks/http-hook';

const ShopOverview = ({ shopId }) => {

  const [loadedShop, setLoadedShop] = useState();
  const {sendRequest} = useHttpClient();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const responseData = await sendRequest(`${process.env.PORT || process.env.REACT_APP_BACKEND}/api/shops/${shopId}`);
        setLoadedShop(responseData.shop);
      } catch (err) {}
    }
    fetchShops();
  }, [sendRequest, shopId]);
  
  return (
    <React.Fragment>
      {loadedShop && (<Box>
        <PageHeader header={loadedShop.shopName} image={loadedShop.shopImage} rating={loadedShop.avgRating} />
        <Container style={styles.container}>
          <Typography variant='h4' sx={{paddinLeft: 10, paddingTop: 2}}>Menu</Typography>
          <List style={styles.list} class='scrollbar-hidden'>
            {loadedShop.drinks.map((item, index) => (
              <Link to={`/drink/${item.id}`}>
                <ListItemButton key={index} sx={{backgroundImage: `url(${item.drinkImage})`}} style={styles.itemButton}>
                  <Box style={styles.textBackground}>
                      <Box style={{paddingLeft: 10, paddingBottom: 10, display: 'flex', flexDirection: 'column'}}>
                        <Typography variant='h10' style={styles.typography}>{item.drinkName}</Typography>
                        <StarRatings numberOfStars={5} rating={item.avgRating} starDimension='20px' starSpacing='1px' />
                      </Box>
                  </Box>
                </ListItemButton>
              </Link>
          ))}
          </List>
      </Container>
      </Box>)}
    </ React.Fragment>
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