import { Request, Response } from 'express';

// Sample data storage (replace with database in a real-world scenario)
const customers: string[] = [];

// Controller function for registering customers
export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            res.status(400).send('Name, email, and phone are required');
        }

        customers.push(name);
        res.status(201).json({ message: 'Customer registered successfully' });
    } catch (error) {
        console.error('Error registering customer:', error);
        res.status(500).send('Internal server error');
    }

};
