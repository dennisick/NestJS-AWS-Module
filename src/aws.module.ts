import { DynamicModule, Module, Global } from '@nestjs/common';
import { AWSService } from './aws.service';

@Global()
@Module({})
export class AWSModule {

  static register(options: Record<string,any>): DynamicModule {
    return {
      module: AWSModule,
      providers: [
        {
          provide: 'AWS_OPTIONS',
          useValue: options
        },
        AWSService
      ],
      exports: [AWSService]
    }
  }

}
