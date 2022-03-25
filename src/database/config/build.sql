BEGIN;

DROP TABLE IF EXISTS users, posts, votes CASCADE;
DROP TYPE IF EXISTS vote_type CASCADE;

CREATE TYPE vote_type AS ENUM ('up', 'down', 'none');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE posts  (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE votes(
  id SERIAL PRIMARY KEY,
  vote vote_type NOT NULL DEFAULT 'none',
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


COMMIT;