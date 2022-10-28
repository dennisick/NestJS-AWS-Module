import { DynamicModule, Module, Global, Provider } from '@nestjs/common';
import { AWSService } from './aws.service';
import { AWSModuleAsyncOptions, AWSModuleOptions, AWSOptionsFactory } from './aws-module.options.interfaces';

@Global()
@Module({})
export class AWSModule {

  static register(options: AWSModuleOptions): DynamicModule {
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

  static registerAsync(options: AWSModuleAsyncOptions): DynamicModule {
    return {
      module: AWSModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options)
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
