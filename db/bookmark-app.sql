
DROP TABLE IF EXISTS bookmarks;

CREATE TABLE bookmarks (
  id serial PRIMARY KEY,
  title text NOT NULL,
  webUrl text NOT NULL,
  descipt text DEFAULT NULL,
  rating INTEGER DEFAULT NULL
);

ALTER SEQUENCE bookmarks_id_seq RESTART WITH 1000;

INSERT INTO bookmarks (title, webUrl, descipt, rating) VALUES
(
  'Google', 
  'http://google.com', 
  'An indie search engine startup', 
  5
),(
  'Fluffiest Cats in the World',
  'http://medium.com/bloggerx/fluffiest-cats-334',
  'The only list of fluffy cats online',
  3
), (
  'Yahoo',
  'http://yahoo.com',
  'An indie search engine startup',
  NULL
), (
  'Yelp',
  'http://yelp.com',
  NULL,
  4
);