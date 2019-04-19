const request = require('supertest');
const server = require('../api/server.js');

/* decalres the token variable in a scope accessible
to the entire test suite */
let token;

beforeAll((done) => {
    request(server)
        .post('/login')
        .send({
            username: 'user',
            password: 'pass'
        })
        .end((err, response) => {
            token = response.body.token;  //saves the token
            done();
        })
})

describe('POST /register', () => {
    it('should return ok status 201', () => {
        return request(server)
        .post('/register')

        expect(result.status).toBe(201)
    })

    it('should return JSON object', () => {
        return request(server)
        .post('/register')

        expect(result.type).toBe('application/json')
    })
})


describe('POST /login', () => {
    it('should return JSON object', () => {
        return request(server)
        .post('/login')

            expect(result.status).toEqual(200)
            expect(result.type).toEqual('application/json')
            expect(result.body).toHaveProperty('message')
            expect(result.body).toHaveProperty('token')
            expect(result.body).toHaveProperty('user_id')
    })
})