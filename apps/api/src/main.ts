import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })

  const config = new DocumentBuilder()
    .setTitle('Manager API')
    .setDescription('Boilerplate API — Users, Services, Auth')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('users')
    .addTag('services')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  const port = process.env.PORT ?? 3001
  await app.listen(port)
  console.log(`API running on http://localhost:${port}`)
  console.log(`Swagger at http://localhost:${port}/api-docs`)
}

bootstrap()
