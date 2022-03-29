require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connection = require('../database/config/connection');
const dbBuilder = require('./dbBuilder');

beforeAll(() => dbBuilder());

describe('Login Page', () => {
  test('Should return 200', async () => {
    const response = await request(app).get('/login');
    expect(response.statusCode).toBe(200);
  });
});

test('User page', async () => {
  const response = await request(app).get('/users/abed');
  expect(response.statusCode).toBe(200);
});
test('Not registered user', done => {
  request(app)
    .post('/api/auth/login')
    .send({
      username: 'abedaa',
      password: 'abed123',
    })
    .end((err, res) => {
      expect(res.statusCode).toBe(404);
      done();
    });
});

// test('Invalid password', done => {
//   request(app)
//     .post('/api/auth/login')
//     .send({
//       username: 'abed',
//       password: 'abed12',
//     })
//     .end((err, res) => {
//       expect(res.statusCode).toBe(400);
//       done();
//     });
// });

test('Register a user', done => {
  request(app)
    .post('/api/auth/register')
    .send({
      username: 'abed',
      email: 'abed@gmail.com',
      password: 'abed123',
      confirm_password: 'abed123',
    })
    .end((err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
});
test('Login user', done => {
  request(app)
    .post('/api/auth/login')
    .send({
      username: 'abed',
      password: 'abed123',
    })
    .end((err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
});

// Login a user then create a post
test('Login a user then create a post', done => {
  request(app)
    .post('/api/auth/login')
    .send({
      username: 'abed',
      password: 'abed123',
    })
    .end((err, res) => {
      request(app)
        .post('/api/v1/posts')
        .set('Cookie', res.headers['set-cookie'])
        .send({
          title: 'test',
          body: 'test',
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          done();
        });
    });
});

test('Get all posts', done => {
  request(app)
    .get('/api/v1/posts')
    .end((err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
});

test('Create a comment', done => {
  request(app)
    .post('/api/auth/login')
    .send({
      username: 'abed',
      password: 'abed123',
    })
    .end((err, res) => {
      request(app)
        .post('/api/v1/comments/posts/1')
        .set('Cookie', res.headers['set-cookie'])
        .send({
          post_id: 1,
          user_id: 1,
          body: 'test',
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          done();
        });
    });
});

test('Get all comments of a post', done => {
  request(app)
    .get('/api/v1/comments/posts/1')
    .end((err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
});

test('Get Comments Count of a post', done => {
  request(app)
    .get('/api/v1/comments/posts/sum/1')
    .end((err, res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe('1');
      done();
    });
});

test('Delete a post', done => {
  request(app)
    .post('/api/auth/login')
    .send({
      username: 'abed',
      password: 'abed123',
    })
    .then(res => {
      request(app)
        .delete('/api/v1/posts/1')
        .set('Cookie', res.headers['set-cookie'])
        .end((err, res) => {
          expect(res.statusCode).toBe(204);
          done();
        });
    });
});
afterAll(() => connection.end());
