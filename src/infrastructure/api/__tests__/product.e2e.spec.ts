import request from "supertest"
import { app, sequelize } from "../express"

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const response = await request(app).post('/product').send({
            name: 'Product 1',
            price: 10
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            id: response.body.id,
            name: 'Product 1',
            price: 10
        })
    })

    it('should not create a product', async () => {
        const response = await request(app).post('/product').send({
            name: 'Product 1'
        })

        expect(response.status).toBe(500)
    })

    it('should find a products', async () => {
        const response = await request(app).post('/product').send({
            name: 'Product 1',
            price: 10
        })

        const response1 = await request(app).post('/product').send({
            name: 'Product 2',
            price: 20
        })

        const response3 = await request(app).get('/product')
    
        expect(response3.status).toBe(200)
        expect(response3.body).toEqual({products:[response.body, response1.body]})
    })

    it('should find a product', async () => {
        const response = await request(app).post('/product').send({
            name: 'Product 1',
            price: 10
        })

        const findResponse = await request(app).get('/product/' + response.body.id)

        expect(findResponse.status).toBe(200)
        expect(findResponse.body).toEqual({product:response.body})
    })

    it('should update a product', async () => {
        const response = await request(app).post('/product').send({
            name: 'Product 1',
            price: 10
        })

        const updateResponse = await request(app).put('/product/' + response.body.id).send({
            name: 'Product 2',
            price: 20
        })

        expect(updateResponse.status).toBe(200)
        expect(updateResponse.body).toEqual({
            product: {
                id: response.body.id,
                name: 'Product 2',
                price: 20
            }
        })
    })
})