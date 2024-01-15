import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "CustomerOrders";

export enum Status {
  PENDING = "pending",
  DELIVERED = "delivered",
}

// https://sequelize.org/docs/v6/other-topics/typescript/
class CustomerOrders extends Model<
  InferAttributes<CustomerOrders>,
  InferCreationAttributes<CustomerOrders>
> {
  declare id: string;
  declare customerId: string;
  declare totalOrders: string;
  declare status: "pending" | "delivered";
  declare orderNumber: number;
  declare pickUpLocation: string;
  declare dropOffLocation: string;
  declare dropOffPhoneNumber: number;
  declare offer: number;
}

CustomerOrders.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalOrders: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pickUpLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropOffLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropOffPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
);

export default CustomerOrders;
