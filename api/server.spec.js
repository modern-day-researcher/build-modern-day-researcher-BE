const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');


afterEach(async () => {
    await db('users').truncate();
})


describe('server.js', () => {

    describe("GET /", () => {
        it('should return OK status code from the / route', () => {
            return request(server)
            .get('/')
            .then(response => {
                expect(response.status).toBe(200);
            })
        })
    })
})