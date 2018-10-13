const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');

const {Todo}= require('./../models/todo');

//before test begins
const todos=[{text:'say hello to friend'},{text:'say good bye when you leave'}]

beforeEach((done)=>{
    Todo.remove().then(()=>{
        return Todo.insertMany(todos)
    }).then(()=>done())
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
            Todo.find({text}).then((doc)=>{
                expect(doc.length).toBe(1);
                expect(doc[0].text).toBe(text);
                done();
            }).catch((e)=> done(e)) 
                
                
            })
           
        })


    it("should not create new todo with irrelavent data",(done)=>{

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err);

            Todo.find().then((doc)=>{
                expect(doc.length).toBe(2);
                done();
            }).catch((e)=> done(e)) 

        })

    })
        

})

describe("/GET request",()=>{
    it('should Get the todos form data base',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
})