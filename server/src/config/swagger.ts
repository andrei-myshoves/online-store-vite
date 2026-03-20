import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Store API',
            version: '1.0.0',
            description: 'API для онлайн магазина',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
        tags: [
            { name: 'Auth', description: 'Аутентификация' },
            { name: 'Profile', description: 'Профиль пользователя' },
            { name: 'Seller', description: 'Продавцы' },
            { name: 'Advertisement', description: 'Объявления' },
            { name: 'Review', description: 'Отзывы' },
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
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        token: { type: 'string' },
                        user: { $ref: '#/components/schemas/Profile' },
                    },
                },
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
                Seller: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        username: { type: 'string' },
                        city: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Review: {
                    type: 'object',
                    required: ['id', 'text', 'rating', 'advertisementId', 'userId', 'createdAt'],
                    properties: {
                        id: { type: 'integer' },
                        text: { type: 'string' },
                        rating: { type: 'number' },
                        advertisementId: { type: 'integer' },
                        userId: { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' },

                        user: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                avatar: { type: 'string', nullable: true },
                            },
                        },
                    },
                },
                Advertisement: {
                    type: 'object',
                    required: ['id', 'name', 'description', 'price', 'city', 'images', 'userId', 'createdAt'],
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        city: { type: 'string' },
                        images: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                        userId: {
                            type: 'integer',
                        },
                        reviewsCount: {
                            type: 'integer',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/**/*.ts'],
})
