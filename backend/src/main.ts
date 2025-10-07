import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


// async function createDatabaseIfNotExists() {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'tu_password',
//   });
//   await connection.query(`CREATE DATABASE IF NOT EXISTS meetings CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);
//   await connection.end();
// }

async function bootstrap() {
  // await createDatabaseIfNotExists();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*', //'http://localhost:4200',
    methods: 'GET,PUT,POST,DELETE', //GET,HEAD,PUT,PATCH,POST,DELETE
    credentials: true,
  });

  // Configurar títulos de documnentación
  const options = new DocumentBuilder()
    .setTitle('Users REST API')
    .setDescription('API REST of Meetings')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
