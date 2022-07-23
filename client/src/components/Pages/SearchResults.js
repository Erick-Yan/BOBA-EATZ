import React, {useState, useEffect} from 'react';
import { Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { useHttpClient } from '../../hooks/http-hook';

function SearchResults({ searchInput }) {

  const [loadedResults, setLoadedResults] = useState();

  const {sendRequest} = useHttpClient();

  const searchType = searchInput.split(":")[0]
  const searchQuery = searchInput.split(":")[1]

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.PORT || process.env.REACT_APP_BACKEND}/api/${searchType}/search/${searchQuery}`
        );
        console.log(responseData);
        setLoadedResults(responseData);
      } catch (err) {}
    }
    fetchResults();
  }, [sendRequest]);

  console.log(loadedResults);

  return (
    <Box style={styles.box}>
      {loadedResults && (
        <React.Fragment>
          <Typography variant='h2' style={styles.searchResultText}>{loadedResults.length} results for '{searchQuery}'</Typography>
          {searchType === "drinks" && (<Container style={styles.container}>
            <List style={styles.list}>
              {loadedResults.map((item, index) => (
                <Link key={index} to={`/drink/${item._id}`}>
                  <ListItemButton>
                    <ListItemAvatar sx={{paddingRight: 5}}>
                      <Avatar src={item.drinkImage} alt='' sx={{ width: 150, height: 150 }}/>
                    </ListItemAvatar>
                    <ListItemText>
                        <Typography variant='h5' style={styles.itemText}>{item.drinkName}</Typography>
                        <Typography variant='h6' style={styles.itemText}>{item.shopName}</Typography>
                        <StarRatings numberOfStars={5} rating={item.avgRating} starDimension='20px' starSpacing='1px' />
                    </ListItemText>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Container>)}
          {searchType === "shops" && (<Container style={styles.container}>
            <List style={styles.list}>
              {loadedResults.map((item, index) => (
                <Link key={index} to={`/shop/${item._id}`}>
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
          </Container>)}
        </React.Fragment>
      )}
    </Box>
  );

}

export default SearchResults;

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