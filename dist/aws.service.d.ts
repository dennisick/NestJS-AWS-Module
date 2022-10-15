import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
export declare class AWSService {
    private readonly options;
    getDynamoClient(): AWS.DynamoDB.DocumentClient;
    getUpdateExpression(tableName: string, key: DocumentClient.Key, data: Object): DocumentClient.UpdateItemInput;
}
