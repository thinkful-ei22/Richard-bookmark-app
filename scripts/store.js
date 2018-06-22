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

  const changeEditState = function(bookmark) {
    bookmark.editState = !bookmark.editState;
  };

  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(object => object.id !== id);
  };

  const setExpand = function(bookmark){
    const initExpand = {expand:false, editState: false};
    Object.assign(bookmark, initExpand);
  };
  const switchExpand = function(bookmark){
    this.bookmark.expand = !this.bookmark.expand;
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

  const setError = function(err) {
    window.alert(err);
  };

  return {
    bookmarks,
    addBookmark,
    addingState,
    changeAddingState,
    findById,
    ratingToStarString,
    switchExpand,
    findAndDelete,
    ratingFilterNum,
    setError,
    changeEditState,
  };
}();