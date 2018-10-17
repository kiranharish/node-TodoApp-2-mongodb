const expect = require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb')
const {app} = require('./../server.js');

const {Todo}= require('./../models/todo');
var randomObjId=new ObjectID();

//before test begins
const todos=[{
    _id:new ObjectID(),
    text:'1st test text'
},{
    _id:new ObjectID(),
    text:'2nd test text'
}]

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

describe("GET /todos request",()=>{
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

describe('GET /todo/:id',()=>{
    it("should get the todo of specified id",(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
        
    })

    it('should return 404 invalid objectId',(done)=>{
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    })

    it("should return 404 for todo not found",(done)=>{
        request(app)
        .get(`/todos/${randomObjId.toHexString()}`)
        .expect(404)
        .end(done)
    })
})