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
- Run Backend
  - Run ```npm install```
  - Run ```npm start```

- Run Frontend
  - Run ```cd client```
  - Run ```npm install```
  - Run ```npm start```
- Official Hosted Site: https://boba-eatz.herokuapp.com/

***Update: Hosted Site is unavailable due to Heroku's new Eco subscription cost plans
  - https://stackoverflow.com/questions/41804507/h14-error-in-heroku-no-web-processes-running
  - https://blog.heroku.com/new-low-cost-plans


## Inspiration

As people who always needs to check multiple sources on whether I'm making the right order, we felt that there was a lack of social activity in the boba reviewing world. We wanted to create a platform driven by existing boba lovers to come together and share insights on their most recent orders. We are hoping to enhance the platform by making it a central repository for boba reviews from all review sources.

## Design

The application design is still in progress. With what we have now, we can start with the landing page, which contains a carousel highlighting the highest rated boba drink, most popular boba drink, and the highest rated shop (determined using MongoDB queries in the backend).

![landing page](/images/landing-page.png)
> Developer Credits: [Erick Yan](https://github.com/Erick-Yan)

The user has the option to filter their search for either a drink or shop using the search bar. In the search results, the user will be provided with options that contain the name being search for.

![search bar](/images/search-bar.png)
> Developer Credits: [Erick Yan](https://github.com/Erick-Yan), [David Chang](https://github.com/changoug)

![search results](/images/search-results.png)
> Developer Credits: [David Chang](https://github.com/changoug)

If we click on a shop option, we open up the shop review page containing a scrollable carousel of its menu items and respective ratings.

![search results](/images/shop-review.png)
> Developer Credits: [David Chang](https://github.com/changoug)

If we click on a menu item, we open up the drink review page, which contains another scrollable carousel of all the reviews relevant to that drink name. We also added a sentiment scores to the drink as well as review filters that highlight the most relevant comments on the drink itself (Please refer to [Categorical Sentiment Score Chart](#categorical-sentiment-score-chart) and [Review Filter Words & Phrases](#review-filter-words--phrases) sections below). Users are able to click on any filter text to filter for reviews that contain that specific piece of text.

![search results](/images/drink-review.png)
> Developer Credits: [Erick Yan](https://github.com/Erick-Yan), [David Chang](https://github.com/changoug)

## Features

### Review Filter Words & Phrases
Sometimes, the number of reviews under a drink can be overwhelming for a user to read through. With that in mind, we thought that having review filters would allow users to read reviews they were interested in based on the review filter text. There were 2 categories of analysis we performed:

#### 1. Most Emotionally Charged Phrases
We first separated the reviews into positive and negative buckets based on the current ratings given. The first challenge we ran into was that the review text wasn't always about the drink itself. It could sometimes be about the shop's ambience, the customer service, etc. Since this page's purpose is to provide an overview for just the drink, we needed to filter for comments within each review that were directly related to the drink. This is where we took advantage of Spacy's `PhraseMatcher()`, a rule-based matching engine. We set up engine rules to extract sentences that contained the drink name or the words `drink`. After retrieving those sentences, we then leveraged `Text2Emotion` Processor to calculate each sentence's emotion. For each sentence from the positive review bucket, we calculated the amount of "happiness" the text expressed. For each sentence from the negative review bucket, we calculated the amount of "sadness" and "anger" detected. We then pushed the sentences into a Max Heap to rank the sentences with the most emotional vigor from each bucket.

#### 2. Word Frequency Analysis
Using the drink-specific sentences extracted above, we performed some preprocessing on the sentences. We tokenized each word and filtered out stopwords and punctuation. We then used NLTK's `FreqDist()` method to extract the most frequently used words from the positive and negative review buckets. After the first test, we noticed that there were some words wouldn't be useful to the users to see (ex. "drink", "taste", "shop"). We then went back to the preprocessing stage and filtered those words out as well.

We updated the drink Mongoose schema to contain the following additional categories generated from the above:
- mostPositiveSents
- mostNegativeSents
- mostPositiveWords
- mostNegativeWords

After some additional styling and JavaScript coding on the React frontend, users are now able to filter for specific reviews.

> Developer Credits: [Erick Yan](https://github.com/Erick-Yan)

### Categorical Sentiment Score Chart
Using the sentiment scores calculated above, we averaged the "happiness", "sadness", "anger", and "surprised" category scores for each drink. We hen added the following categories to the drink Mongoose Schema:
- positiveScore (from "happiness")
- negativeScore (from "sad" and "anger")
- surprisedScore (from "surprised")

We used `Chart.js` to create a horizontal bar chart. This way, we can provide a quick overview on the general review sentiment towards the drink for rushed users.

> Developer Credits: [Erick Yan](https://github.com/Erick-Yan)

### The Drink Awards

We've dedicated the landing page carousel to display the drinks and shops most deserving of an award based on popularity and ratings. For popularity, we performed a sorted query to rank drinks based on the number of reviews under each drink. For the highest rated award, we took inspiration from the [Bayesian Estimator Ranking Methodology](https://en.wikipedia.org/wiki/Bayes_estimator#Practical_example_of_Bayes_estimators). Essentially, we leveraged Mongoose's `aggregate()` query and calculated each drink/shop's weighted rating using the existing schema fields while following the following Bayesian estimator equation: `weightedRating = (avgRating x numberOfReviews) / (numberOfReviews + constant)`. Surprisingly enough, the awards were all sweeped by "The Alley".

> Developer Credits: [Erick Yan](https://github.com/Erick-Yan)

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

> Developer Credits: [Erick Yan](https://github.com/Erick-Yan)

## Working with MERN

We began to project with sights on using React.js, Node.js, and Express.js, but the big question was which database to use. A relational database like PostgreSQL would've been a great option, but with the number of relationships between each bucket, the query complexity would eventually become overwhelming.

After reading in the MongoDB documentation, we realized that this was a more viable option. We wanted to take advantage of the Mongoose foreign key references that can be set within each bucket's schema (refer to the "drinks" property under the drinkSchema above). When serving user requests, we could take advantage of Mongoose's `populate()` method, which would return, for example, the list of drink objects under a shop, all under a simple, concise, and efficient query.

## Challenges Along the Way

There were several challenges we had to overcome during the process of creating this application.

The first challenge encountered was preloading the JSON data into its respective MongoDB collection with MongoDB ObjectIDs attached to each item and the foreign key object reference lists. Turns out there was a specific JSON name configuration that was needed so that when an item was loaded into MongoDB, it would recognize that it was an ObjectID or a foreign key object list.

Implementing the API response for the search results proved to be quite difficult (in fact we considered switching to SQL due our higher familiarity in that area). This also took more documentation reading. We learned that an index needs to be applied to each field we are searching into. An index is essentially how much weight that field has relative to the other fields during the search process (ex. how much more do we care about the drink name than the drink review during the search process). There was also the matter of retrieving the search result accuracy score to only display search results with a higher than average score. We also needed to integrate regex into our search in case the user's search query is an incomplete word (ex. Bob instead of Boba).

Working with the `aggregate()` method in MongoDB is a challenge we are still facing. We are using it to create new schema fields using existing fields to calculate a drink's ranking taking into consideration of both rating and popularity. This will be part of an upcoming update (refer to below) for the landing page carousel containing the Highest Rated Drink, Most Popular Drink, and Highest Rated Shop.

## Upcoming Updates

1. Hosting (Completed).

2. Create a robust ranking system for the Highest Rated Drink using the Bayesian Estimator (Completed).

3. Integrate Google Reviews under each respective Shop and Drink (In-progress).

4. Include a Most Frequently Used Words section for each drink review page (Completed). 
    
    a. Improvements
      - There are still some phrases are still not very useful to reviewers (ex. I ordered the Matcha Latte Drink).
      - Even after several testing iterations, there were still words that belong to the wrong bucket (ex. "Love" in the mostNegativeWords category), but this will likely improve as we add more reviews to the database.

5. Drink recommendation engine using Machine Learning and NLP.