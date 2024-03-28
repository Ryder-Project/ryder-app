// Import necessary modules and dependencies
import { Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode';
import logger from '../../utilities/logger';
import Ryder from '../../models/ryder';

// Define the endpoint handler function
export const getRiderDetails = async (_req: Request, res: Response) => {
  try {
    // Query all riders from the database
    const riders = await Ryder.findAll();

    // Return the list of riders in the response
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'List of Riders',
      riders: riders.map((rider) => ({
        id: rider.id,
        firstName: rider.firstName,
        lastName: rider.lastName,
        email: rider.email,
        phone: rider.phone,
        city: rider.city,
        isVerified: rider.isVerified,
      })),
    });
  } catch (error) {
    // Log and handle errors
    logger.error(error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Failed to retrieve riders',
    });
  }
};

export default getRiderDetails;
