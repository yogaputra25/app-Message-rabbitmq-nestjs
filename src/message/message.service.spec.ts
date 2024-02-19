import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, AmqpConnection],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    const data = service.send('cekk');
    expect(data).toBe('success');
  });
});
