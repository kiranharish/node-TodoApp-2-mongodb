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
    text:'2nd test text',
    completed:true,
    completedAt:333
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


describe("DELETE todos/:id",()=>{
    it("should delete a todo based on id",(done)=>{
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(todos[0]._id.toHexString())
        })
        .end((err,res)=>{
            if(err) return done(err)

            Todo.findById(todos[0]._id.toHexString()).then((todo)=>{
                expect(todo).toNotExist();
                done()
            }).catch((err)=>done(err))
        })
    })

    it("should return 404 for invalid Object id",(done)=>{
        request(app)
        .delete(`/todos/123 `)
        .expect(404)
        .end(done)
    })

    it("should return 404 for todo not found || no todo ",(done)=>{
        request(app)
        .delete(`/todos/${randomObjId.toHexString()}`)
        .expect(404)
        .end(done)
    })
})

describe("PATCH /todos/:id",()=>{

    it("should update the completed as true and set completedAt",(done)=>{

        var id = todos[0]._id.toHexString();
        var modifiedBody = {
            text:"succesfully changed the text from 1st test suites",
            completed:true
        }

        request(app)
        .patch(`/todos/${id}`)
        .send(modifiedBody)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(modifiedBody.text)
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number')
        })
        .end((err,result)=>{
            if(err) return done(err)

            Todo.findById(id).then((todo)=>{
                expect(todo.text).toBe(modifiedBody.text);
                expect(todo.completed).toBe(true);
                expect(todo.completedAt).toBeA('number')
                done()
            }).catch((e)=>done(e))
        })
    })

    it("should update completed as false ",(done)=>{
        
        var id = todos[1]._id.toHexString();
        var modifiedBody = {
            text:"succesfully changed the completed as false  from  2nd test suites",
            completed:false
        }

        request(app)
        .patch(`/todos/${id}`)
        .send(modifiedBody)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(modifiedBody.text)
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotBeA('number')
        })
        .end(done)

        })
    
})

// 5bcd158bc3d1122bac4b17d7

// 5bcd158bc3d1122bac4b17d7