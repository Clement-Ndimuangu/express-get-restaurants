const request = require('supertest')
const app = require('./src/app')
const db = require('./db/connection')
const { execSync } = require('child_process');

const {describe, test, expect, beforeAll} = require('@jest/globals')

beforeAll(async()=>{
    await db.sync({ force: true });
    execSync('npm run seed');
})

describe('Restaurant endpoint test', ()=>{
    test('Verify that the GET /restaurants route returns a status code of 200', async()=>{
        const response = await request(app).get('/restaurants')
        expect(response.ok).toBeTruthy()
    })
    test('Verify that GET /restaurants route returns an array of restaurants', async()=>{
        const response = await request(app).get('/restaurants')
        expect(response.body).toEqual(expect.objectContaining([]))
    })
    test('Test that GET /restaurants returns the correct number of restaurants', async()=>{
        const response = await request(app).get('/restaurants')
        expect(response.body.length).toBe(3)
    })
    test('Test that GET /restaurants returns the correct restaurant data', async()=>{
        const response = await request(app).get('/restaurants')
        expect(response.body[0]).toEqual(expect.objectContaining({
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood'
          }))
    })
    test('Verify that GET /restaurants/:id request returns the correct data.', async()=>{
        const response = await request(app).get('/restaurants/1')
        expect(response.body).toEqual(expect.objectContaining({
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood'
          }))
    })
    test('Test that POST /restaurants request returns the restaurants array has been updated with the new value. ', async()=>{
        const response = await request(app).post('/restaurants').send({
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood'
          })
        expect(response.body).toEqual(expect.objectContaining({
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood'
          }))
    })

    test('Verify that PUT /restaurants/:id request updates the restaurant array with the provided', async()=>{
        const response = await request(app).put('/restaurants/3').send({
            name: 'MangBees',
            location: 'Chicago',
            cuisine: 'FastFruit'
          })
        
          expect(response.body).toEqual(expect.objectContaining({
            name: 'MangBees',
            location: 'Chicago',
            cuisine: 'FastFruit'
          }))
    })
    
    test('Test that DELETE /restaurant/:id deletes the restaurant with the provided id from the array', async()=>{
        const response = await request(app).delete('/restaurants/3')
        
          expect(response.body).toEqual(expect.objectContaining({
            name: 'MangBees',
            location: 'Chicago',
            cuisine: 'FastFruit'
          }))
    })

    test('Test that POST /restaurants request returns error array when updated with location missing. ', async()=>{
      const response = await request(app).post('/restaurants').send({
          name: 'AppleBees',
          cuisine: 'FastFood'
        })
      expect(response.body.error[0].msg).toEqual('Invalid value')
  })
    test('Test that POST /restaurants request returns error array when updated with cuisine missing. ', async()=>{
      const response = await request(app).post('/restaurants').send({
          name: 'AppleBees',
          location: 'Chicago'
        })
      expect(response.body.error[0].msg).toEqual('Invalid value')
  })
    test('Test that POST /restaurants request returns error array when updated with name missing. ', async()=>{
      const response = await request(app).post('/restaurants').send({
          location: 'Chicago',
          cuisine: 'FastFood'
        })
      expect(response.body.error[0].msg).toEqual('Invalid value')
  })

    
})
