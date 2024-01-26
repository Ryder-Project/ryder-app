import { Request, Response } from 'express';

// Sample data storage (replace with database in a real-world scenario)
const riders: string[] = [];

// Controller function for registering riders
export const registerRider = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, vehicleType } = req.body;
    
        if (!name || !email || !phone || !vehicleType) {
         res.status(400).send('Name, email, phone, and vehicleType are required');
        }
    
        riders.push(name);
        res.status(201).json({ message: 'Rider registered successfully' });
    } catch (error) {
        console.error('Error registering rider:', error);
        res.status(500).send('Internal server error');
    }
};
