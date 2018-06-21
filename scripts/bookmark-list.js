'use strict';
/* global store $ api*/
$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});


const bookmarkList = (function () {

  const generateBookmarkElement = function (bookmark) {
    return `
    <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <div class="title-bar expandable">
        <p>${bookmark.title}</p>
        <div class="starholder">${store.ratingToStarString(bookmark)}</div>
      </div>
      <div class="desc-box ${bookmark.expand ? '' : 'hidden'}">
        <p>${bookmark.desc}</p>
        <button type="button" class="url-visit js-url-visit">Visit Site</button>
        <button type="button" class="bookmark-delete js-bookmark-delete">Delete</button>
      </div>
    </li>`;
  };
  const generateBookmarkListString = function (bookmarks) {
    const bookmarkString = bookmarks.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarkString;
  };
  const generateBookmarkForm = function () {
    // if functionality inside here for adding state
    let formHTML = `
      ${store.addingState ? `
        <label for="title">Title</label>
        <input type="text" name="title" class="js-title-entry" placeholder="e.g., Yahoo">
        <label for="url">URL</label>
        <input type="text" name="url" class="js-url-entry" placeholder="e.g., http://yahoo.com"><br>
        <label for="desc">Description</label>
        <textarea id="desc" name="desc" rows="3" cols="33" maxlength="200" wrap="hard" class="js-desc-entry" /><br>
        <input type="radio" name="rating" value="1">&#9733
        <input type="radio" name="rating" value="2">&#9733&#9733
        <input type="radio" name="rating" value="3">&#9733&#9733&#9733
        <input type="radio" name="rating" value="4">&#9733&#9733&#9733&#9733
        <input type="radio" name="rating" value="5">&#9733&#9733&#9733&#9733&#9733<br>` : ''}
        <button type="submit">Add Bookmark</button>`;
    
    $('#js-bookmark-list-form').html(formHTML);
  };
  const render = function () {
    let bookmarks = store.bookmarks;
    if (store.ratingFilterNum >= 1 && store.ratingFilterNum <= 5) {
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.ratingFilterNum);
    }
    if (store.bookmarks.length === 0) {
      store.addingState = true;
    }
    console.log('`render` ran');
    generateBookmarkForm();
    const bookmarkListString = generateBookmarkListString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  };

  function handleNewBookmarkSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      if (store.addingState) {
        const newData = JSON.parse($('#js-bookmark-list-form').serializeJson(event));
        $('.js-title-entry').val('');
        $('.js-url-entry').val('');
        $('.js-desc-entry').val('');
        api.postBookmark(newData.title, newData.url, newData.desc, newData.rating, (newBookmark) => {
          store.addBookmark(newBookmark);
          store.changeAddingState();
          render();
        });
      } else {
        store.changeAddingState();
        render();
      }
    });
  }
  function getItemIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }
  function handleBookmarkExpand() {
    $('.bookmark-list').on('click', '.expandable', function () {
      console.log(this);
      console.log($(this).closest('.js-bookmark-element').find('.desc-box'));
      const id = getItemIdFromElement(this);
      const foundBookmark = store.findById(id);
      foundBookmark.expand = !foundBookmark.expand;
      render();
    });
  }
  function handleBookmarkDelete() {
    $('.bookmark-list').on('click', '.js-bookmark-delete', function () {
      const id = getItemIdFromElement(this);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }
  function handleVisitUrl() {
    $('.bookmark-list').on('click', '.js-url-visit', function () {
      const id = getItemIdFromElement(this);
      const foundBookmark = store.findById(id);
      let win = window.open(`${foundBookmark.url}`, '_blank');
      win.focus();
    });
  }
  function handleStarFilter() {
    $('#star-dropbox').on('change', function () {
      store.ratingFilterNum = this.value;
      render();
    });
  }

  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkExpand();
    handleBookmarkDelete();
    handleVisitUrl();
    handleStarFilter();
  }

  return {
    render,
    bindEventListeners,
  };
})();