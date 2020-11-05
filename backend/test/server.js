process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing server...", () => {
  /*
   * testing the GET / route
   */
  describe("=> GET /", () => {
    it("it should GET the response", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /*
   * Test the POST /compile route
   */
  describe("=> POST /compile", () => {
    it("compile C++ code", (done) => {
      let req = {
        body:{
            code: '#include<iostream> \n' +
            ' using namespace std;    \n' +
            ' int main(){ \n' +
            " cout<<'2'; \n" +
            ' return 0; \n' +
            ' }',
            inp: '',
            out: '',
            type: 'cpp'
        }
      };

      chai
        .request(server)
        .post("/compile")
        .send(req)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.body.should.have.property("out");
          done();
        });
    });

    it("compile Python code", (done) => {
        let req = {
          body:{code: '#code here\nprint(3)', inp: '', out: '', type: 'py'}
        };
  
        chai
          .request(server)
          .post("/compile")
          .send(req)
          .end((err, res) => {
            res.body.should.be.a("object");
            res.body.should.have.property("out");
            done();
          });
      });


    it("error out Java code", (done) => {
        let req = {
            body:{code: '#code', inp: '', out: '', type: 'java'}
        };

        chai
            .request(server)
            .post("/compile")
            .send(req)
            .end((err, res) => {
                res.should.have.status(501);
                res.body.should.be.a("object");
                done();
            });
    });
  });
});

/*
req.body {
  code: '#include<iostream> \n' +
    ' using namespace std;    \n' +
    ' int main(){ \n' +
    " cout<<'2'; \n" +
    ' return 0; \n' +
    ' }',
  inp: '',
  out: '',
  type: 'cpp'
}

req.body { code: '#code here\nprint(3)', inp: '', out: '', type: 'py' }
*/