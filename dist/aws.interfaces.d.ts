import { ModuleMetadata, Type } from "@nestjs/common";
export interface AWSModuleOptions {
    accessKeyId: string;
    secretKey: string;
    region: string;
    isGlobal?: boolean;
}
export interface AWSOptionsFactory {
    createAWSOptions(): Promise<AWSModuleOptions> | AWSModuleOptions;
}
export interface AWSModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    isGlobal?: boolean;
    useExisting?: Type<AWSOptionsFactory>;
    useClass?: Type<AWSOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<AWSModuleOptions> | AWSModuleOptions;
    inject?: any[];
}
