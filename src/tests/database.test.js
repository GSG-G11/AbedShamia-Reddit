require('dotenv').config();

const connection = require('../database/config/connection');
const dbBuild = require('./dbBuilder');
const queries = require('../database/queries');

// Before All test
beforeAll(() => dbBuild());

// Create a User
test('Should Create a User', async () => {
  const user = {
    username: 'test',
    password: 'test123',
    confirm_password: 'test123',
    email: 'test@test.com',
  };

  const userCreated = await connection.query(queries.createUser, [
    user.username,
    user.password,
    user.email,
  ]);

  expect(userCreated.rows[0].username).toBe(user.username);
});

// Login User
test('Should Login a User', async () => {
  const user = {
    username: 'test',
    password: 'test123',
  };

  const userLoggedIn = await connection.query(queries.userExistLogIn, [user.username]);

  expect(userLoggedIn.rows[0].username).toBe(user.username);
});

// Test if user Exist
test('Should Test if user Exist', async () => {
  const user = {
    username: 'test',
    email: 'test@test.com',
  };

  const userExist = await connection.query(queries.userExist, [user.username, user.email]);

  expect(userExist.rows[0].username).toBe(user.username);
  expect(userExist.rows[0].email).toBe(user.email);
});

// Create Post
test('Should Create a Post', async () => {
  const post = {
    title: 'test',
    body: 'test',
    user_id: 1,
  };

  const postCreated = await connection.query(queries.createPost, [
    post.title,
    post.body,
    post.user_id,
  ]);

  expect(postCreated.rows[0].title).toBe(post.title);
});

// Get Post Username
test('Should Get Post Username', async () => {
  const post = {
    id: 1,
  };

  const postUsername = await connection.query(queries.getPostUsername, [post.id]);

  expect(postUsername.rows[0].username).toBe('test');
});

// Should Get All Posts
test('Should Get All Posts', async () => {
  const allPosts = await connection.query(queries.getAllPosts);

  expect(allPosts.rows[0].title).toBe('test');
});

// Should Get User Posts
test('Should Get User Posts', async () => {
  const userPosts = await connection.query(queries.getUserPosts, [1]);

  expect(userPosts.rows[0].title).toBe('test');
});

// Should Get User Info
test('Should Get User Info', async () => {
  const userInfo = await connection.query(queries.getUserInfo, ['test']);

  expect(userInfo.rows[0].username).toBe('test');
});

// Should Create Comment
test('Should Create a Comment', async () => {
  const comment = {
    body: 'test',
    user_id: 1,
    post_id: 1,
  };

  const commentCreated = await connection.query(queries.createComment, [
    comment.body,
    comment.user_id,
    comment.post_id,
  ]);

  expect(commentCreated.rows[0].body).toBe(comment.body);
});

// Should Get Post Comments
test('Should Get Post Comments', async () => {
  const postComments = await connection.query(queries.getPostComments, [1]);

  expect(postComments.rows[0].body).toBe('test');
});

// Should Count Post Comments
test('Should Count Post Comments', async () => {
  const countComments = await connection.query(queries.countComments, [1]);

  expect(countComments.rows[0].count).toBe('1');
});

// Should Insert a Vote
test('Should Insert a Vote', async () => {
  const vote = {
    user_id: 1,
    post_id: 1,
    vote: 'up',
  };

  const voteInserted = await connection.query(queries.insertVote, [
    vote.user_id,
    vote.post_id,
    vote.vote,
  ]);

  expect(voteInserted.rows[0].vote).toBe(vote.vote);
});

// Should Update Vote
test('Should Update a Vote', async () => {
  const vote = {
    user_id: 1,
    post_id: 1,
    vote: 'down',
  };

  const voteUpdated = await connection.query(queries.updateVote, [
    vote.vote,
    vote.user_id,
    vote.post_id,
  ]);

  expect(voteUpdated.rows[0].vote).toBe(vote.vote);
});

// Should Check if voted
test('Should Check if voted', async () => {
  const vote = {
    user_id: 1,
    post_id: 1,
  };

  const voteChecked = await connection.query(queries.checkVote, [vote.user_id, vote.post_id]);

  expect(voteChecked.rows[0].vote).toBe('down');
});

// Should Sum Votes
test('Should Sum Votes', async () => {
  const sumVotes = await connection.query(queries.sumVotes, [1]);

  expect(sumVotes.rows[0].total_votes).toBe('-1');
});

// Should Delete a Post
test('Should Delete a Post', async () => {
  const post = {
    id: 1,
  };

  const postDeleted = await connection.query(queries.deletePost, [post.id]);

  expect(postDeleted.rowCount).toBe(1);
});

afterAll(() => connection.end());
