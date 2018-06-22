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
    return `${(bookmark.editState) ? ` 
    <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <form id="js-edit-form">
        <label for "edit-title">Edit Title</label><br>
        <input type="text" name="title" class="js-title-entry" id="edit-title" value="${bookmark.title}"><br>
        <label for "edit-url">Edit URL</label><br>
        <input type="text" name="url" class="js-url-entry" id="edit-url" value="${bookmark.url}"><br>
        <label for="edit-desc">Description</label><br>
        <textarea id="edit-desc" name="desc" rows="3" cols="33" maxlength="200" wrap="hard" class="js-desc-entry">${bookmark.desc}</textarea><br>
        <fieldset>
          <legend>Rating</legend>
          <label for="one-rating-edit"><input type="radio" name="rating" id="one-rating-edit" ${bookmark.rating===1?'checked="checked"':''} value="1">&#9733</label>
          <label for="two-rating-edit"><input type="radio" name="rating" id="two-rating-edit" ${bookmark.rating===2?'checked="checked"':''} value="2">&#9733&#9733</label>
          <label for="three-rating-edit"><input type="radio" name="rating" id="three-rating-edit" ${bookmark.rating===3?'checked="checked"':''} value="3">&#9733&#9733&#9733</label>
          <label for="four-rating-edit"><input type="radio" name="rating" id="four-rating-edit" ${bookmark.rating===4?'checked="checked"':''} value="4">&#9733&#9733&#9733&#9733</label>
          <label for="five-rating-edit"><input type="radio" name="rating" id="five-rating-edit" ${bookmark.rating===5?'checked="checked"':''} value="5">&#9733&#9733&#9733&#9733&#9733</label><br>
        </fieldset><br>
        <button type="submit" class="bookmark-edit-submit js-bookmark-edit-submit">Submit Edits</button>
        <button type="button" class="bookmark-edit-cancel js-bookmark-edit">Cancel Edits</button>
      </form>
    ` :
      `<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <div class="title-bar expandable">
        <div class="starholder">Rating:${store.ratingToStarString(bookmark)}</div>
        <p>${bookmark.title}</p>
      </div>
      <div class="desc-box ${bookmark.expand ? '' : 'hidden'}">
        <p>Description: ${bookmark.desc}</p>
        <button type="button" class="url-visit js-url-visit">Visit Site</button>
        <button type="button" class="bookmark-edit js-bookmark-edit">Edit Bookmark</button>
        <button type="button" class="bookmark-delete js-bookmark-delete">Delete</button>
      </div>`}
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
        <input type="text" name="title" class="js-title-entry" placeholder="e.g., Yahoo" id="title">
        <label for="url">URL</label>
        <input type="text" id="url" name="url" class="js-url-entry" placeholder="e.g., http://yahoo.com"><br>
        <label for="desc">Description</label><br>
        <textarea id="desc" name="desc" rows="3" cols="33" maxlength="200" wrap="hard" class="js-desc-entry" /><br>
        <fieldset>
        <legend>Rating</legend>
        <label for="one-rating"><input type="radio" name="rating" id="one-rating" value="1">&#9733 1 star</label>
        <label for="two-rating"><input type="radio" name="rating" id="two-rating" value="2">&#9733&#9733 2 stars</label>
        <label for="three-rating"><input type="radio" name="rating" id="three-rating" value="3">&#9733&#9733&#9733 3 stars</label>
        <label for="four-rating"><input type="radio" name="rating" id="four-rating" value="4">&#9733&#9733&#9733&#9733 4 stars</label>
        <label for="five-rating"><input type="radio" name="rating" id="five-rating" value="5">&#9733&#9733&#9733&#9733&#9733 5 stars</label><br>
        </fieldset>` : ''}
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
        }, () => store.setError('Submission Error: Necessary Fields Empty'));
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
      },
      () => store.setError('Delete Bookmark Problem'));
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

  function handleEditButton() {
    $('.bookmark-list').on('click', '.js-bookmark-edit', function () {
      const id = getItemIdFromElement(this);
      const foundBookmark = store.findById(id);
      store.changeEditState(foundBookmark);
      render();
    });
  }
  function handleEditSubmit() {
    $('.bookmark-list').on('submit','#js-edit-form',function (event) {
      event.preventDefault();
      const id = getItemIdFromElement(this);
      const foundBookmark = store.findById(id);
      const updateData = JSON.parse($('#js-edit-form').serializeJson(event));
      api.patchBookmark(id, updateData, () => {
        store.changeEditState(foundBookmark);
        store.editBookmark(id, updateData);
        render();
      });
    }/*,() => store.setError('Submission Error: Necessary Fields Empty')*/);
  }


  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkExpand();
    handleBookmarkDelete();
    handleVisitUrl();
    handleStarFilter();
    handleEditButton();
    handleEditSubmit();
  }

  return {
    render,
    bindEventListeners,
  };
})();