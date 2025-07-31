import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Traveling Museum API",
      version: "1.0.0",
      description: "API for the Traveling Museum",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Dev Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
