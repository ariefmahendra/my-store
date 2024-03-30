import {createManyProductTest, createProductTest, getListProduct, removeAllProductTest} from "./test-util.js";
import request from "supertest";
import {web} from "../src/application/web.js";
import supertest from "supertest";

describe('POST /api/products', () => {

    afterEach(async () => {
        await removeAllProductTest()
    })

    it('should can create new contact', async () => {
        const result = await request(web)
            .post("/api/products")
            .send({
                name: "test",
                price: 100,
                description: "test",
                quantity: 100
            });

        expect(result.status).toBe(201);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.name).toEqual("test")
        expect(result.body.data.price).toEqual(100)
        expect(result.body.data.description).toEqual("test")
        expect(result.body.data.quantity).toEqual(100)

    });

    it('should reject if invalid request body', async () => {
        const result = await request(web)
            .post("/api/products")
            .send({
                name: "",
                price: 100,
                description: "test",
                quantity: 100
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/products/:id', () => {

    beforeEach(async () => {
        await createProductTest()
    })
    
    afterEach(async () => {
        await removeAllProductTest()
    })

    it('should can get product by id', async () => {
        const testProduct = await getListProduct()

        const testId = testProduct[0]._id.toString()

        const result = await supertest(web)
            .get("/api/products/" + testId)

        expect(result.status).toBe(200);
        expect(result.body.message).toEqual("success");
        expect(result.body.data._id.toString()).toEqual(testId);
        expect(result.body.data.name).toEqual(testProduct[0].name)
        expect(result.body.data.price).toEqual(testProduct[0].price)
        expect(result.body.data.description).toEqual(testProduct[0].description)
        expect(result.body.data.quantity).toEqual(testProduct[0].quantity)
    });
});

describe('PUT /api/products/:id', () => {
    beforeEach(async () => {
        await createProductTest()
    })

    afterEach(async () => {
        await removeAllProductTest()
    })

    it('should can update product by id', async () => {

        const testProduct = await getListProduct()
        const testId = testProduct[0]._id.toString()

        const result = await supertest(web)
            .put("/api/products/" + testId)
            .send({
                id: testId,
                name: "updateTest",
                price: 200,
                description: "updateTest",
                quantity: 200
            })

        expect(result.status).toBe(200);
        expect(result.body.message).toEqual("success");

        expect(result.body.data.id).toEqual(testId);
        expect(result.body.data.name).toEqual("updateTest")
        expect(result.body.data.price).toEqual(200)
        expect(result.body.data.description).toEqual("updateTest")
        expect(result.body.data.quantity).toEqual(200)

        expect(result.body.data.name).not.toEqual(testProduct[0].name)
        expect(result.body.data.price).not.toEqual(testProduct[0].price)
        expect(result.body.data.name.description).not.toEqual(testProduct[0].description)
        expect(result.body.data.name.quantity).not.toEqual(testProduct[0].quantity)
    })

    it('should be reject if invalid request body', async () => {

        const testProduct = await getListProduct()
        const testId = testProduct[0]._id.toString()

        const result = await supertest(web)
            .put("/api/products/" + testId)
            .send({
                id: testId,
                name: "",
                price: "200",
                description: 213,
                quantity: "200"
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
});

describe('GET /api/products', () => {

    beforeEach(async () => {
        await createManyProductTest()
    })

    afterEach(async () => {
        await removeAllProductTest()
    })

    it('should can get all product', async () => {

        const result = await supertest(web)
            .get("/api/products")

        expect(result.status).toBe(200);
        expect(result.body.message).toEqual("success");
        expect(result.body.data.length).toEqual(4)

        expect(result.body.data[0].name).toEqual("test1")
        expect(result.body.data[0].price).toEqual(100)
        expect(result.body.data[0].description).toEqual("test1")
        expect(result.body.data[0].quantity).toEqual(100)

        expect(result.body.data[1].name).toEqual("test2")
        expect(result.body.data[1].price).toEqual(100)
        expect(result.body.data[1].description).toEqual("test2")
        expect(result.body.data[1].quantity).toEqual(100)

        expect(result.body.data[2].name).toEqual("test3")
        expect(result.body.data[2].price).toEqual(100)
        expect(result.body.data[2].description).toEqual("test3")
        expect(result.body.data[2].quantity).toEqual(100)

        expect(result.body.data[3].name).toEqual("test4")
        expect(result.body.data[3].price).toEqual(100)
        expect(result.body.data[3].description).toEqual("test4")
        expect(result.body.data[3].quantity).toEqual(100)
    });
});

describe('DELETE /api/products', () => {
    beforeEach(async () => {
        await createProductTest()
    })

    afterEach(async () => {
        await removeAllProductTest()
    })

    it('should can delete product by id', async () => {

        const testProduct = await getListProduct()
        const testId = testProduct[0]._id.toString()

        const result = await supertest(web)
            .delete("/api/products/" + testId)

        expect(result.status).toBe(200);
        expect(result.body.message).toEqual("success");
    })

    it('should response 404 if product not found', async() => {

        const result = await supertest(web)
            .delete("/api/products/123")

        expect(result.body.errors).toBeDefined()
    });
});