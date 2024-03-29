import { DynamicModule, Module, Global, Provider } from '@nestjs/common';
import { AWSService } from './aws.service';
import { AWSModuleAsyncOptions, AWSModuleOptions, AWSOptionsFactory } from './aws.interfaces';

@Module({})
export class AWSModule {

  static register(options: AWSModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
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

  static registerAsync(options: AWSModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: AWSModule,
      imports: options.imports || [],
      exports: [AWSService],
      providers: [...this.createAsyncProviders(options), AWSService]
    }
  }

  private static createAsyncProviders(options: AWSModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ]
  }

  private static createAsyncOptionsProvider(options: AWSModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: 'AWS_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: 'AWS_OPTIONS',
      useFactory: async (optionsFactory: AWSOptionsFactory) => await optionsFactory.createAWSOptions(),
      inject: [options.useExisting || options.useClass]
    }
  }

}
