import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 10000;
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: ['http://localhost:5173', 'https://alexandrparhomenko.github.io', 'http://localhost:5174'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Credentials'],
    });
    const config = new DocumentBuilder()
        .setTitle('Бэкенд на nest')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

start()