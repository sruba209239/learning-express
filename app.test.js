const request = require("supertest");
const { response } = require("./app");
const app = require("./app");
/*
Todo api

// colection level operations
/todo
GET => return an array of Todos, 200 OK
POST => create a Todo, 201 Created

// resource level operations
/todo/{id}
GET => return a Todo of that ID, 200 OK
GET => return an error if not found, 404 OK
PUT => update a Todo if its present, [200, 404]
DELETE => delete a Todo if its present, [204, 404]
    
*/
describe("Todos API", () => {
  it("GET /todos => [Todos]", () => {
    return (
      request(app)
        .get("/todos")
        // .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              {
                id: expect.any(Number),
                name: expect.any(String),
                targetDate: expect.any(String), // check date later
                done: expect.any(Boolean),
              },
            ])
          );
        })
    );
  });

  it("GET /todos/{id} => Todo", () => {
    return (
      request(app)
        .get("/todos/123")
        // .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              id: 123,
              name: expect.any(String),
              targetDate: expect.any(String), // check date later
              done: expect.any(Boolean),
            })
          );
        })
    );
  });

  it("GET /todos/{id} => 404", () => {
    return (
      request(app)
        .get("/todos/1234")
        // .set("Accept", "application/json")
        // .expect("Content-Type", /json/)
        .expect(404)
    );
  });

  it("POST /todos => create a todo", () => {
    return (
      request(app)
        .post("/todos")
        .send({
          id: 121,
          name: "watch avatar 2",
          targetDate: new Date(),
          done: true,
        })
        // .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect("Location", "/121")
        .expect(201)
        .then((response) => {
          expect(response.header["Location"]).not.toBeNull();
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              targetDate: expect.any(String),
              done: expect.any(Boolean),
            })
          );
        })
    );
  });

  it("DELETE /todos/{id} => Todo Deleted!", () => {
    return request(app).delete("/todos/123").expect(204);
  });
  it("DELETE /todos/{id} => Todo not found", () => {
    return request(app).delete("/todos/1234").expect(404);
  });
});
