import express from 'express';
import { CreateCustomerUseCase } from '../../../domain/usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import { InputCreateCustomerDto } from '../../../domain/usecase/customer/create/create.customer.dto';
import { ListCustomerUseCase } from '../../../domain/usecase/customer/list/list.customer.usecase';
import { InputListCustomerDto } from '../../../domain/usecase/customer/list/list.customer.dto';
import { FindCustomerUseCase } from '../../../domain/usecase/customer/find/find.customer.usecase';
import { InputFindCustomerDto } from '../../../domain/usecase/customer/find/find.customer.dto';
import { UpdateCostumerUseCase } from '../../../domain/usecase/customer/update/update.costumer.usecase';
import { InputUpdateCostumerDto } from '../../../domain/usecase/customer/update/update.customer.dto';
export const customerRoutes = express.Router();
const repository = new CustomerRepository()
customerRoutes.post('/', async (req, res) => {
    const usecase = new CreateCustomerUseCase(repository);

    try {
        const customerDto: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip
            }
        }

        const output = await usecase.execute(customerDto);

        res.status(200).send(output)
    }catch(e: any) {
        res.status(500).send(e.message)
    }
})

customerRoutes.get('/', async (req, res) => {
    const usecase = new ListCustomerUseCase(repository);

    try {
        const inputDto: InputListCustomerDto = {}
        const output = await usecase.execute(inputDto);

        res.status(200).send(output)
    }catch(e: any) {
        res.status(500).send(e.message)
    }
})

customerRoutes.get('/:id', async (req, res) => {
    const usecase = new FindCustomerUseCase(repository)

    try {
        const input:InputFindCustomerDto = {
            id: req.params.id
        } 

        const output = await usecase.execute(input)

        res.status(200).send(output)
    }catch(e: any) {
        res.status(500).send(e.message)
    }
})

customerRoutes.put('/:id', async (req, res) => {
    const usecase = new UpdateCostumerUseCase(repository)

    try {
        const input: InputUpdateCostumerDto = {
            id: req.params.id,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip
            }
        }

        const output = await usecase.execute(input)

        res.status(200).send(output)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})