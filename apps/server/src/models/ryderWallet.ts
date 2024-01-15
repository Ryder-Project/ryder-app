import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "RyderWallet";

// https://sequelize.org/docs/v6/other-topics/typescript/
class RyderWallet extends Model<
  InferAttributes<RyderWallet>,
  InferCreationAttributes<RyderWallet>
> {
  declare id: string;
  declare ryderId: string;
  declare totalEarnings: number;
  declare noOfRides: number;
  declare totalRideTime: string;
  declare earnings: number;
}

RyderWallet.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    ryderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalEarnings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noOfRides: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalRideTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    earnings: {
      type: DataTypes.INTEGER,
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

export default RyderWallet;
