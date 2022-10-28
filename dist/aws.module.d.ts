import { DynamicModule } from '@nestjs/common';
import { AWSModuleAsyncOptions, AWSModuleOptions } from './aws.interfaces';
export declare class AWSModule {
    static register(options: AWSModuleOptions): DynamicModule;
    static registerAsync(options: AWSModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
