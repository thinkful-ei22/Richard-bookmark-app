'use strict';
/* global */

const api = function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/richard';
  // get needs no parameters
  const getBookmark = function () { };
  // parameters for patch
  // title	string, optional Min 1 length
  // url	string, optional Min 5 length. Include protocol (http/https).
  // desc	string, optional Min 1 length
  // rating	number, optional Between 1 and 5
  const patchBookmark = function () { };
  // parameters for post
  // title	string, required Min 1 length
  // url	string, required Min 5 length. Include protocol (http/https).
  // desc	string, optional Min 1 length
  // rating	number, optional Between 1 and 5
  const postBookmark = function () { };
  // delete needs matching ID in link
  const deleteBookmark = function () { };
  //some change

  return {
    getBookmark, patchBookmark, postBookmark, deleteBookmark,
  };
}();