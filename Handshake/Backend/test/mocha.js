var assert= require("assert");
var supertest= require("supertest");
var should = require("should");
 
var server= supertest.agent("htttp://localhost:4000");

describe("MochaTest", function(){

    it("should sign in company", function(done){
        server
            .post("/PATH")
            .send({
                email:"tesla@tesla.com",
                password: "tesla"
            })
            .expect(200)
            .end(function(err, res){
                console.log(res.status);
                res.status.should.equal(200);
                done();
            });
    });

    it("should sign in student", function(done){
        server
            .post("/PATH")
            .send({
                email:"rw@gmail.com",
                password: "rw"
            })
            .expect(200)
            .end(function(err, res){
                console.log(res.status);
                res.status.should.equal(200);
                done();
            });
    });

})

//company sign up
it("Should sign up company", function (done) {
    server
        .post("/companySignUp")
        .send({
            companyName: "Tesla", email: "tesla@tesla.com", password: "tesla", location: "Fremont"
        })
        .expect(200)
        .end(function (err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
        });
});


//student sign up
it("Should sign up student", function (done) {
    server
        .post("/studentSignUp")
        .send({
            name: "Ronald Weasley", email: "rw@gmail.com", password: "rw",  school: "University of Hogwarts"
        })
        .expect(200)
        .end(function (err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
        });
});

//Education details
it("should get education details", function (done) {
    server
        .get("/getEducationDetails")
        .query({ ID: 2 })
        //.query({ ID: 3 })
        .expect(200)
        .end(function (err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
        });
});
