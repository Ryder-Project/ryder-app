import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Customers";

export const role = {
  CUSTOMER: "Customer",
} as const;
export type RoleType = (typeof role)[keyof typeof role];

// https://sequelize.org/docs/v6/other-topics/typescript/
class Customers extends Model<
  InferAttributes<Customers>,
  InferCreationAttributes<Customers>
> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare profilePic: CreationOptional<string>;
  declare password: string;
  declare phone: string;
  declare role: RoleType;
  declare resetToken: CreationOptional<string>;
  declare resetTokenExpires: CreationOptional<Date>;
  declare isVerified: boolean;
  declare resetTokenExpiry: CreationOptional<Date>;
}

Customers.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
);

export default Customers;
