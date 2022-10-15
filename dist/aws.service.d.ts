import * as AWS from 'aws-sdk';
import { DataExpressions } from './types/aws';
export declare class AWSService {
    private readonly options;
    getDynamoClient(): AWS.DynamoDB.DocumentClient;
    getUpdateExpression(dataExpressions: DataExpressions): string;
}
