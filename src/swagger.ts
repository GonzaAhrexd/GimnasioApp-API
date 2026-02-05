import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Gimnasio API',
        description: 'API documentation para el sistema de gimnasio',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    tags: [
        {
            name: 'Auth',
            description: 'Endpoints de autenticación'
        },
        {
            name: 'Users',
            description: 'Endpoints de usuarios'
        },
        {
            name: 'Profesores',
            description: 'Endpoints de profesores'
        }
    ]
}

const outputFile = './swagger-output.json';
const routesFiles = ['./index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routesFiles, doc); 