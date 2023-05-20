import { InputCreateProductDto } from "../../../domain/usecase/product/create/create.product.dto";
import { CreateProductUseCase } from "../../../domain/usecase/product/create/create.product.usecase";
import { InputFindProductDto } from "../../../domain/usecase/product/find/find.product.dto";
import { FindProductUseCase } from "../../../domain/usecase/product/find/find.product.usecase";
import { ListProductUseCase } from "../../../domain/usecase/product/list/list.product.usecase";
import { InputUpdateProductDto } from "../../../domain/usecase/product/update/update.product.dto";
import { UpdateProductUseCase } from "../../../domain/usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import express from 'express';

export const productRoutes = express.Router();
const repository = new ProductRepository()

productRoutes.post('/', async (req, res) => {
    const usecase = new CreateProductUseCase(repository);

    try {
        const productDto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price
        }

        const output = await usecase.execute(productDto);

        res.status(200).send(output)
    }catch(e: any) {
        res.status(500).send(e.message)
    }
})


productRoutes.get('/', async (req, res) => {
    const usecase = new ListProductUseCase(repository);

    try {
        const input: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price
        }

        const output = await usecase.execute(input)

        res.status(200).send(output)
    }catch(e:any) {
        res.status(500).send(e.message)
    }
})

productRoutes.get('/:id', async (req, res) => {
    const usecase = new FindProductUseCase(repository)

    try {
        const input: InputFindProductDto = {
            id: req.params.id
        }

        const output = await usecase.execute(input)
        res.status(200).send(output)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})


productRoutes.put('/:id', async (req, res) => {
    const usecase = new UpdateProductUseCase(repository);

    try {
        const input: InputUpdateProductDto = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price
        }

        const output = await usecase.execute(input)

        res.status(200).send(output)
    }
    catch(e: any) {
        res.status(500).send(e.message)
    }
})