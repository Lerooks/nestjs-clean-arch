import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Users API documentation')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
