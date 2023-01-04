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
    return request(app)
      .get("/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            {
              id: expect.any(Number),
              name: expect.any(String),
              done: expect.any(Boolean),
            },
          ])
        );
      });
  });

  //   it("POST /todos => 201", () => {
  //     return request(app)
  //       .post("/todos")
  //       .set("Accept", "application/json")
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toEqual(
  //           expect.arrayContaining([
  //             {
  //               id: expect.any(Number),
  //               name: expect.any(String),
  //               done: expect.any(Boolean),
  //             },
  //           ])
  //         );
  //       });
  //   });
});
