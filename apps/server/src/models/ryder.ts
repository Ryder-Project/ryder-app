import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Ryder";

// https://sequelize.org/docs/v6/other-topics/typescript/
class Ryder extends Model<
  InferAttributes<Ryder>,
  InferCreationAttributes<Ryder>
> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare city: string;
  declare profilePic: string | null;
  declare password: string;
  declare phone: string;
  declare bikeDoc: string;
  declare validIdCard: string;
  declare passportPhoto: string;
  declare resetToken: CreationOptional<string>;
  declare resetTokenExpires: CreationOptional<Date>;
  declare isVerified: boolean;
  declare resetTokenExpiry: CreationOptional<Date>;
}

Ryder.init(
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    bikeDoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validIdCard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passportPhoto: {
      type: DataTypes.STRING,
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
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
);

export default Ryder;
