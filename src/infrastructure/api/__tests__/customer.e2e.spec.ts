import { app, sequelize } from "../express"
import request from "supertest"
describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            id: response.body.id,
            name: "John Doe",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })
    })

    it("should not create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe",
        })

        expect(response.status).toBe(500)
    })

    it("should list a customers", async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })

        const response1 = await request(app).post("/customer").send({
            name: "John",
            address: {
                street: "Main Street",
                number: 1234,
                city: "New York",
                zip: "1453"
            }
        })

        const response2 = await request(app).get("/customer").send()

        expect(response2.status).toBe(200)
        expect(response2.body).toEqual({customers:[response.body, response1.body]})
    })

    it("should find a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })

        const findResponse = await request(app).get(`/customer/${response.body.id}`).send()

        expect(findResponse.status).toBe(200)
        expect(findResponse.body).toEqual(response.body)
    })

    it('should not find a customer when it not exists', async () => {
        const response2 = await request(app).get("/customer/id").send()

        expect(response2.status).toBe(500)
    })

    it('should update a customer', async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })


        const response2 = await request(app).put(`/customer/${response.body.id}`).send({
            name: "John Doe 2",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })

        expect(response2.status).toBe(200)
        expect(response2.body).toEqual({
            id: response.body.id,
            name: "John Doe 2",
            address: {
                street: "Main Street",
                number: 123,
                city: "New York",
                zip: "143"
            }
        })
    })
})