import { Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Container } from '@mui/material';
import boba from '../../assets/boba-eats.png';

function SearchResults({ searchInput }) {
  console.log('searchInput:', searchInput);
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
    <Box style={styles.box}>
      <Typography variant='h2' style={styles.searchResultText}>{sampleList.length} results for '{searchInput}'</Typography>
      <Container style={styles.container}>
        <List style={styles.list}>
          {sampleList.map((item) => (
            <ListItemButton>
              <ListItemAvatar sx={{paddingRight: 5}}>
                <Avatar src={item.image} alt='' sx={{ width: 150, height: 150 }}/>
              </ListItemAvatar>
              <ListItemText>
                  <Typography variant='h5' style={styles.itemText}>{item.drinkName}</Typography>
                  <Typography variant='h6' style={styles.itemText}>{item.shopName}</Typography>
                  <Typography variant='h6' style={styles.itemText}>{item.rating}</Typography>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Container>
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
    marginLeft: 130,
  },
  box: {
    position: 'absolute',
    width: '100%',
  },
  container: {
    borderRadius: '2rem',
    backgroundColor: 'aliceblue',
    height: '100%',
  },
  itemText: {
    marginBottom: 7,
  }
};