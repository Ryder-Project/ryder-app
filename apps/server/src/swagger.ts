import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ryder Api",
      version: "1.0.0",
      description: "Describes all the available  APIs on the Ryder App",
    },
  },
<<<<<<< HEAD
  apis: ["src/routes/v1/*.ts"], 
=======
  // Path to your route files
  apis: ["src/routes/v1/*.ts"],
>>>>>>> 47d5439c7f030e1772c7b958125b61a94a726868
};

const specs = swaggerJsdoc(options);

export default specs;
