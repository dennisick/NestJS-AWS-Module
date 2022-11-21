import { ModuleMetadata, Type } from "@nestjs/common";
export interface AWSModuleOptions {
    accessKeyId: string;
    secretKey: string;
    region: string;
    isGlobal?: boolean;
    endpoint?: string;
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
export declare enum FilterOperator {
    EQ = "EQ",
    NE = "NE",
    LE = "LE",
    LT = "LT",
    GE = "GE",
    NOT_NULL = "NOT_NULL",
    NULL = "NULL",
    CONTAINS = "CONTAINS",
    NOT_CONTAINS = "NOT_CONTAINS",
    BEGINS_WITH = "BEGINS_WITH",
    IN = "IN",
    BETWEEN = "BETWEEN"
}
export interface QueryFilter {
    key: string;
    operator: FilterOperator;
    value: any;
    condition: 'OR' | 'AND';
}
export interface GetQueryFilterExpression {
    filterExpression?: string;
    expressionNames?: {
        [key: string]: any;
    };
    expressionValues?: {
        [key: string]: any;
    };
}
