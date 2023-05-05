import express from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

const swaggerDocument = yaml.load("./swagger.yaml");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
