import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Card";

// https://sequelize.org/docs/v6/other-topics/typescript/
class Card extends Model<InferAttributes<Card>, InferCreationAttributes<Card>> {
  declare id: string;
  declare cardNumber: number;
  declare cardName: string;
  declare expiryDate: Date;
  declare cvv: number;
}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cvv: {
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

export default Card;