
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let _id;

chai.use(chaiHttp);

describe('GET Users', () => {
    it('should return array of users', (done) => {
      chai.request(server)
          .get('/users')
          .end((err, res) => {
            res.should.be.json;
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
          });
    });
  });

  describe('ADD Users', () => {

    it('should add user to database', (done) => {
      chai.request(server)
          .post('/users')
          .type('json')
          .send({
            'name':'Elizabeth',
            "Created_date": "",
	        "status": ""
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('object');
            done();
          });
    });

    it('should throw error during adding users to database without name ', (done) => {
        chai.request(server)
            .post('/users')
            .type('json')
            .send({
                "status": [
                    "completed"
                ]
            })
            .end((err, res) => {
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
      });

      it('should return array of users with one previously added object', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
              res.should.be.json;
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body[res.body.length-1].should.contain({name: 'Shanaya'});
              _id = res.body[0]._id;
              console.log(res.body);
              done();
            });
      });

});

describe('UPDATE Users', () => {

    it('should update user to database', (done) => {
      chai.request(server)
          .put('/users/' + _id)
          .type('json')
          .send({
            status: [ 'completed' ]
           })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });
});