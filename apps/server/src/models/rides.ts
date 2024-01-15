import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Rides";

export enum Status {
  PENDING = "pending",
  DELIVERED = "delivered",
}

// https://sequelize.org/docs/v6/other-topics/typescript/
class Rides extends Model<
  InferAttributes<Rides>,
  InferCreationAttributes<Rides>
> {
  declare id: string;
  declare location: string;
  declare contact: number;
  declare date: Date;
  declare status: "pending" | "delivered";
}

Rides.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
);

export default Rides;
