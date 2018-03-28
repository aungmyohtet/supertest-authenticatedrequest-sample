const app = require('./app');
const request = require('supertest');

const agent = request.agent(app);

describe('API Testing', function () {
  it('respond with with 401 status code', (done) => {
    request(app)
      .get('/api/me')
      .expect(401).then((res) => {
        done();
      }).catch(error => {
        done(error);
      });
  });

  it('should login user', function (done) {
    agent
      .post('/api/login')
      .send({ email: 'user1@email.com', password: 'password1' })
      .expect(200)
      .then((err, res) => {
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should allow access', function (done) {
    agent
      .get('/api/me')
      .expect(200)
      .then(function (err, res) {
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should allow logout user', function (done) {
    agent
      .get('/api/logout')
      .expect(200)
      .then(function (err, res) {
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should not allow access now', function (done) {
    agent
      .get('/api/me')
      .expect(401)
      .then(function (err, res) {
        done();
      }).catch((err) => {
        done(err);
      });
  });

});
