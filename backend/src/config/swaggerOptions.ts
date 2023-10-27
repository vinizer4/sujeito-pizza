import path from "path";

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'API documentation for the Backend',
        },
        servers: [
            {
                url: 'http://localhost:3333',
            },
        ],
    },
    apis: [path.join(__dirname, './routes.ts')], // Path to your route files.
};

export const specs = swaggerJsdoc(swaggerOptions);
