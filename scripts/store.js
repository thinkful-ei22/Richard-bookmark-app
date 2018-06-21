'use strict';

/* global */

const store = function(){
// bookmark held in a array
  const bookmarks = [];
  // adding state to change responsive add part
  let addingState = 'true';
  // stars filter
  let ratingFilterNum = 0;

  const changeAddingState = function() {
    this.addingState = !this.addingState;
  };

  const findById = function (id) {
    return bookmarks.find(bookmark => bookmark.id === id);
  };

  const setExpand = function(bookmark){
    const initExpand = {expand:false};
    Object.assign(bookmark, initExpand);
  };
  const switchExpand = function(bookmark){
    bookmark.expand = !bookmark.expand;
  };
  const addBookmark = function(bookmark){
    setExpand(bookmark); 
    this.bookmarks.push(bookmark);
  };
  const ratingToStarString = function (bookmark) {
    let starString = '';
    for (let i=0; i<bookmark.rating; i++) {
      starString += '&#9733';
    }
    return starString;
  };
  const minRatingFilter = function() {
    
  };

  return {
    bookmarks,
    addBookmark,
    addingState,
    changeAddingState,
    minRatingFilter,
    ratingToStarString,
    switchExpand,
  };
}();