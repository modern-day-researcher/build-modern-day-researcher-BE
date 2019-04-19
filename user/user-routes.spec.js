const request = require('supertest');
const bcrypt = require('bcryptjs');
const server = require('../api/server.js');
const db = require('../data/dbConfig');


afterEach(async () => {
    await db('users').truncate();
    await db('articles').truncate();
})


let token;

beforeAll((done) => {
    request(server)
        .post('/login')
        .send({
            username: 'user',
            password: 'pass'
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        })
})


describe('user-routes.js', () => {
    describe('GET /users', () => {
        it('should return OK status code from the /users route and JSON object', async () => {
            return request(server)
                .get('/users')
                    
                expect(result.status).toBe(200)
                expect(result.type).toEqual('application/json')
        })

        it('should require authorization', () => {
            return request(server)
                .get('/users')

                expect(result.status).toThrow(401)

        })
    })

    describe('PUT /:id', () => {
        it('should return OK status code 200', () => {
            return request(server)
                .put('/:id')

                expect(result.status).toBe(200)
        })

        it('should require authorization', () => {
            return request(server)
                .put('/:id')

                expect(result.status).toThrow(401)
        })
    })

    describe('GET /:id', () => {
        it('should return OK status code and json object', () => {
            return request(server)
                .get('/:id')

                expect(result.status).toBe(200)
                expect(result.type).toEqual('application/json')
        })

        it('should require authorization', () => {
            return request(server)
                .get('/:id')

                expect(result.status).toThrow(401)
        })
    })

    describe('POST /:id/read', () => {
        it('should return ok status', () => {
            return request(server)
                .post('/:id/read')

                expect(result.status).toBe(200)
        })

        it('should return boolean response', () => {
            return request(server)
                .post('/:id/read')

                expect(`${variable}`).toMatch(/[true|false]/)
        })

        it('should require authorization', () => {
            return request(server)
                .post('/:id/read')

                expect(result.status).toThrow(401)
        })
    })

    describe('POST /articles', () => {
        it('should return ok status', () => {
            return request(server)
                .post('/articles')

                expect(result.status).toBe(201)
        })

        it('should require authorization', () => {
            return request(server)
                .post('/articles')

                expect(result.status).toThrow(401)
        })
    })

    describe('DELETE /:id/articles', () => {
        it('should return ok status', () => {
            return request(server)
                .delete('/:id/articles')

                expect(result.status).toBe(200)
        })

        it('should require authorization', () => {
            return request(server)
                .delete('/:id/articles')

                expect(result.status).toThrow(401)
        })
    })
})
