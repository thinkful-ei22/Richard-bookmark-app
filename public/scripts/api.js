'use strict';
/* global $ */

const api = function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/richard';
  // get needs no parameters
  const getBookmark = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
  };
  // parameters for patch
  // title	string, optional Min 1 length
  // url	string, optional Min 5 length. Include protocol (http/https).
  // desc	string, optional Min 1 length
  // rating	number, optional Between 1 and 5
  const patchBookmark = function (id, updateData, callback, error) {
    $.ajax({
      url:`${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: error
    });
  };
  // parameters for post
  // title	string, required Min 1 length
  // url	string, required Min 5 length. Include protocol (http/https).
  // desc	string, optional Min 1 length
  // rating	number, optional Between 1 and 5
  const postBookmark = function (title, bookmarkUrl, desc, rating, callback, error) {
    let newBookmarkData = {
      title: title,
      url: bookmarkUrl,
      desc: desc,
      rating: rating,
    };
    $.ajax({
      url:`${BASE_URL}/bookmarks/`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newBookmarkData),
      success: callback,
      error: error,
    });
  };
  // delete needs matching ID in link
  const deleteBookmark = function (id, callback, error) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      success: callback,
      error:error
    });
  };

  return {
    getBookmark, patchBookmark, postBookmark, deleteBookmark,
  };
}();