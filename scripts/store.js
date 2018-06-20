'use strict';

/* global */

const store = function(){
// bookmark held in a array
  const bookmarks = [];
  // adding state to change responsive add part
  const addingState = 'false';
  // stars filter
  const starsRatingFilter = '';

  const changeAddingState = {

  };

  return {
    bookmarks,
    changeAddingState
  };
}();