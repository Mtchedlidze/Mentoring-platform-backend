import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './student/config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app
    .listen(config().port)
    .then(() => console.log(`Server is running on ${config().port}`))
}

bootstrap()
