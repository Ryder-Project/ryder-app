import { Request, Response } from 'express';
import Ryder from "../models/ryder";

// Controller function for registering riders
export const registerRider = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, vehicleType } = req.body;

        if (!name || !email || !phone || !vehicleType) {
            res.status(400).send('Name, email, phone, and vehicleType are required');
            return;
        }

        // You can perform additional validation or saving to the database here if needed

        res.status(201).json({ message: 'Rider registered successfully' });
    } catch (error) {
        console.error('Error registering rider:', error);
        res.status(500).send('Internal server error');
    }
};

// Controller function for retrieving details of riders
export const getRiderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all riders details from the database
        const riders = await Ryder.findAll();
        res.status(200).json({ riders });
    } catch (error) {
        console.error('Error fetching rider details:', error);
        res.status(500).send('Internal server error');
    }
};

// Controller function for retrieving a single rider from the database by id
export const getRiderById = async (req: Request, res: Response): Promise<void> => {
    const riderId: string = req.params.riderId;

    try {
        // Fetch the rider details from the database by id
        const rider = await Ryder.findOne({
            where: { id: riderId }
        });

        if (!rider) {
            res.status(404).json({ message: 'Rider not found' });
            return;
        }

        res.status(200).json({ rider });
    } catch (error) {
        console.error('Error fetching rider by id:', error);
        res.status(500).send('Internal server error');
    }
};
