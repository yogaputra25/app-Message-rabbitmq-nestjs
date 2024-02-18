import {
  AmqpConnection,
  RabbitHandler,
  RabbitMQChannels,
  RabbitMQModule,
  RabbitRPC,
  RabbitSubscribe,
  makeRabbitDecorator,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route1',
    queue: 'subscribe-queue',
    queueOptions: {
      consumerOptions: {
        // exclusive: true,
        noAck: false,
      },
    },
  })
  public async onMessage(message: any) {
    console.log(message);
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'cekk',
    queue: 'budi',
    queueOptions: {
      consumerOptions: {
        // exclusive: true,
        noAck: false,
      },
    },
  })
  public async Message(message: any) {
    console.log(message);
  }
  async cekdata() {
    // for (let index = 0; index < 100000; index++) {
    //   await console.log(`data ${index}`);
    // }

    // Buat array kosong untuk menyimpan hasil looping
    const results = [];

    // Lakukan looping for sebanyak 10.000 kali
    for (let i = 0; i < 100000; i++) {
      // Simpan hasil looping ke array
      console.log(`data ${i}`);
      results.push(i);

      // Simulasikan proses yang memakan waktu
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    // Kembalikan array hasil looping
    return results;
  }
  //   send(message) {
  //     for (let index = 0; index < 100000; index++) {
  //       this.amqpConnection.publish('exchange1', 'subscribe-route1', {
  //         msg: message + index,
  //       });
  //     }
  //   }
  send(message) {
    for (let index = 0; index < 100000; index++) {
      this.amqpConnection.publish('exchange1', 'subscribe-route1', {
        msg: message + index,
      });
    }

    for (let index = 0; index < 100000; index++) {
      this.amqpConnection.publish('exchange1', 'cekk', {
        msg: message + index,
      });
    }
  }

  async createUserRMQ() {
    // Buat queue dan routing key dan bind ke exchange
    this.amqpConnection.channel.assertQueue('budi');
    this.amqpConnection.channel.bindQueue('budi', 'exchange1', 'cekk');
  }
}
