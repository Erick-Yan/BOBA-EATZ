# BOBA EATZ

BOBA EATZ is a food-driven social application that allows users to scroll, search, and 
read Yelp reviews for boba shops and drinks.

Data used for this site was all [web scraped](https://github.com/Erick-Yan/BOBA-EATZ/tree/main/ReviewScraper) from Yelp using Selenium and Pymongo API as of July 10, 2022. The site was created with:

- React.js
- Node.js
- Express.js
- Mongoose
- MongoDB
- Selenium

## Quickstart

- Clone repo
- Run Frontend
  - Run ```cd frontend```
  - Run ```npm start```
- Run Backend
  - Run ```cd backend```
  - Run ```npm start```
- Official Hosted Site Coming Soon...


## Inspiration

As people who always needs to check multiple sources on whether I'm making the right order, we felt that there was a lack of social activity in the boba reviewing world. We wanted to create a platform driven by existing boba lovers to come together and share insights on their most recent orders. We are hoping to enhance the platform by making it a central repository for boba reviews from all review sources.

## Design

The application design is still in progress. With what we have now, we can start with the landing page, which contains a carousel highlighting the highest rated boba drink, most popular boba drink, and the highest rated shop (determined using MongoDB queries in the backend).

![landing page](/images/landing-page.png)

The user has the option to filter their search for either a drink or shop using the search bar. In the search results, the user will be provided with options that contain the name being search for.

![search bar](/images/search-bar.png)

![search results](/images/search-results.png)

If we click on a shop option, we open up the shop review page containing a scrollable carousel of its menu items and respective ratings.

![search results](/images/shop-review.png)

If we click on a menu item, we open up the drink review page, which contains another scrollable carousel of all the reviews relevant to that drink name.

![search results](/images/drink-review.png)

## Creating a Web-Scraping Pipeline

Determining which Python library to scrape proved to be the first difficult task we had to face. We had the option of the popular BeautifulSoup parser, but due to the amount of JavaScript from the modals on Yelp, the data we could scrape was limited to what the static HTML content had. To overcome this roadblock, we opted to use Selenium, which would open the hidden JavaScript components by mimicing the user flow.

Leveraging Selenium, I was able to open each drink modal under a Yelp shop review, expand each review message, and extract the content using x-paths. We created 3 sets of buckets (which would represent the different MongoDB collections required) to fill with the scraped data. 

  1. Review Collection.
  2. Drink Collection.
  3. Shop Collection.

Each item inserted a bucket would follow the Mongoose schema we had set up in our backend. Below is an example of a bucket item and its related schema.

```
  shopSchema: {
    shopName: {type: String, required: true},
    shopAddress: {type: String, required: true},
    shopImage: {type: String, required: true},
    avgRating: {type: Number, required: true},
    drinks: [{type: mongoose.Types.ObjectId, required: true, ref: 'Drink'}]
  }
```
```
  {
    "_id": {
            "$oid": "b07d5cb4009611edbd66d0ab"
        },
        "shopName": "Chatime - Dundas",
        "shopImage": "https:\/\/s3-media0.fl.yelpcdn.com\/bphoto\/zwRbWHdciL1zCiaWCgkZqA\/348s.jpg",
        "avgRating": 3.5,
        "shopAddress": "132 Dundas Street W Toronto, ON M5G 1C3",
        "drinks": [
            {
                "$oid": "b50ef315009611ed9159d0ab"
            }
        ]
  }
```

Scraping all this content luckily only took ~10 minutes, but we strictly limited the number of shops scraped to the top 10. This was because not all Yelp shops had menu items displayed, which is one of the reasons why we'd like to eventually enable users to write their own reviews and add menu items under each shop (hopefully in the next iteration).

To load the JSON data into MongoDB, I read through the the PyMongo API and found that it was the ideal (and likely only) option. We created an automated script that would clear the existing collection and update it with the scraped data from the respective bucket.

## Working with MERN

We began to project with sights on using React.js, Node.js, and Express.js, but the big question was which database to use. A relational database like PostgreSQL would've been a great option, but with the number of relationships between each bucket, the query complexity would eventually become overwhelming.

After reading in the MongoDB documentation, we realized that this was a more viable option. We wanted to take advantage of the Mongoose foreign key references that can be set within each bucket's schema (refer to the "drinks" property under the drinkSchema above). When serving user requests, we could take advantage of Mongoose's `populate()` method, which would return, for example, the list of drink objects under a shop, all under a simple, concise, and efficient query.

## Challenges Along the Way

There were several challenges we had to overcome during the process of creating this application.

The first challenge encountered was preloading the JSON data into its respective MongoDB collection with MongoDB ObjectIDs attached to each item and the foreign key object reference lists. Turns out there was a specific JSON name configuration that was needed so that when an item was loaded into MongoDB, it would recognize that it was an ObjectID or a foreign key object list.

Implementing the API response for the search results proved to be quite difficult (in fact we considered switching to SQL due our higher familiarity in that area). This also took more documentation reading. We learned that an index needs to be applied to each field we are searching into. An index is essentially how much weight that field has relative to the other fields during the search process (ex. how much more do we care about the drink name than the drink review during the search process). There was also the matter of retrieving the search result accuracy score to only display search results with a higher than average score. We also needed to integrate regex into our search in case the user's search query is an incomplete word (ex. Bob instead of Boba).

Working with the `aggregate()` method in MongoDB is a challenge we are still facing. We are using it to create new schema fields using existing fields to calculate a drink's ranking taking into consideration of both rating and popularity. This will be part of an upcoming update (refer to below) for the landing page carousel containing the Highest Rated Drink, Most Popular Drink, and Highest Rated Shop.

## Upcoming Updates

1. Hosting (In-progress).

2. Create a robust ranking system for the Highest Rated Drink using the Bayesian Estimator (In-progress).

3. Integrate Google Reviews under each respective Shop and Drink (In-progress).

4. Include a Most Frequently Used Words section for each drink review page (In-progress). 

5. Drink recommendation engine using Machine Learning and NLP.