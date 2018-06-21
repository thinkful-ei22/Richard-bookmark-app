'use strict';
/* global store $*/

const bookmarkList = (function () {

  const generateBookmarkElement = function (bookmark) {
    return `
    <li>
      <div>
        <p>${bookmark.title}</p>
        <div class="starholder">${store.ratingToStarString(bookmark)}</div>
      </div>
      <div class="desc-box ${bookmark.expand ? '' : 'hidden'}">
        <p>${bookmark.desc}</p>
        <button type="button">Visit Site</button>
        <button type="button">Delete</button>
      </div>
    </li>`;
  };
  const generateBookmarkListString = function (bookmarks) {
    const bookmarkString = bookmarks.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarkString;
  };
  const generateBookmarkForm = function () {
    // if functionality inside here for adding state
    let formHTML = '';
    if (store.addingState) {formHTML = `
      <label for="title">Title</label>
      <input type="text" name="title" class="js-title-entry" placeholder="e.g., Yahoo">
      <label for="url">URL</label>
      <input type="text" name="url" class="js-url-entry" placeholder="e.g., http://yahoo.com"><br>
      <label for="desc">Description</label>
      <textarea id="desc" name="desc"
                  rows="3" cols="33" maxlength="200"
                  wrap="hard" class="js-desc-entry" 
                  placeholder="e.g.,News, email and search are just the beginning. Discover more every day. Find your yodel.">
      </textarea><br>
      <button type="submit">Add Bookmark</button>`;
    }
    $('#js-bookmark-list-form').html(formHTML);
  };
  const render = function () {
    console.log('`render` ran');
    console.log(store.bookmarks);
    generateBookmarkForm();
    const bookmarkListString = generateBookmarkListString(store.bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  };


  function bindEventListeners() {

  }

  return {
    render,
    bindEventListeners,
  };
})();