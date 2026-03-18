import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Store API',
            version: '1.0.0',
            description: 'API для онлайн магазина (аналог Avito)',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Profile: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        username: { type: 'string' },
                        lastName: { type: 'string', nullable: true },
                        email: { type: 'string' },
                        city: { type: 'string', nullable: true },
                        phone: { type: 'string', nullable: true },
                        avatar: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['src/routes/*.ts'],
})
