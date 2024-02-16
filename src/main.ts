import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  CustomTransportStrategy,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.RMQ,

  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'cats_queue',

  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });
  await app.listen(3123);
  // await app.startAllMicroservices();
}
bootstrap();
