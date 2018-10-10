const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');

const {Todo}= require('./../models/todo');

//before test begins
beforeEach((done)=>{
    Todo.remove().then(()=>{
        done()
    })
})
//test begins
describe('POST /',()=>{
    it("Should perform a post request",(done)=>{
        var text  = 'Text from test--hurry i got the done';

        request(app)
        .post('/todos')
        .send({text}) //super test send as json 
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text)
        })
        .end((err,res)=>{
            if(err) return done(err)//print the error statement
            //DOUBLE CHECK WETHER THE DATA IS STORED IN THE DATABASE
            Todo.find().then((doc)=>{
                expect(doc.length).toBe(1);
                expect(doc[0].text).toBe(text);
                done();
            }).catch((e)=> done(e)) 
                
                
            })
           
        })

        

})