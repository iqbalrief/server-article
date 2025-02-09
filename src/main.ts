import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: 'http://localhost:8000', // Atau '*' untuk semua origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
