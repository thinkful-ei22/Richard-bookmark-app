'use strict';

/* global $ api store bookmarkList */




// I can add bookmarks to my bookmark list. Bookmarks contain:
//      title
//      url link
//      description
//      rating (1-5)

// I can see a list of my bookmarks when I first open the app
//      All bookmarks in the list default to a "condensed" view showing only title and rating

// I can click on a bookmark to display the "detailed" view
//      Detailed view expands to additionally display description and a "Visit Site" link

// I can remove bookmarks from my bookmark list

// I receive appropriate feedback when I cannot submit a bookmark
//      Check all validations in the API documentation (e.g. title and url field required)

// I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated above the chosen selection

// (Extension) I can edit the rating and description of a bookmark in my list

/*
STORE
  We want our store to hold a `bookmarks` array of "decorated" objects - i.e. objects that
  have been transformed into just the necessary data to display on our page. Example object:
  {
    id: '98ds8fbsdy67',
    title: 'yelp.com',
    url: 'https://www.yelp.com/'
    description: ' User Reviews and Recommendations of Best Restaurants, Shopping, Nightlife, Food, Entertainment, Things to Do, Services and More at Yelp.'
    rating: 5
    condensed: 'true'   function necessart to set condensed to true as default
  }
1. Add bookmark to store.bookmarks
2. Delete bookmark from store.bookmarks
3. min filter function from store.bookmarks or just do it from render in bookmark list
4. run a default state if nothing is in store.bookmarks
*/

/*
API
  Create base API functionality with in mind CRUD
1. Error implementation // Where is best to put error function ie: 
    (message) => window.alert(message);
*/

/*
BOOKMARK LIST
1. Generate the bookmark html using a single object bookmark from store.bookmarks
  a. generated based off of store.bookmarks.condensed
2. Render bookmarks from the store sending through previous function for html
  
*/

$(document).ready(function () {
  bookmarkList.bindEventListeners();
  api.getBookmark(bookmarks => {
    bookmarks.forEach(bookmark => {
      store.addBookmark(bookmark);
    });
    bookmarkList.render();
  });
});

