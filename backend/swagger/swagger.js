const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payroll & HRMS API",
      version: "1.0.0",
      description: "API documentation for Payroll and HRMS Software",
      contact: {
        name: "Sachin Vishwakarma",
        email: "sachinvishwakarma8286@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000", // your backend base URL
      },
    ],
  },
  apis: ["./index.js"], // 👈 points to route files
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
