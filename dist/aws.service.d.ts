import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
export declare class AWSService {
    private readonly options;
    getDynamoClient(): AWS.DynamoDB.DocumentClient;
    getEmailClient(): AWS.SES;
    getUpdateInput(tableName: string, key: DocumentClient.Key, data: Object): DocumentClient.UpdateItemInput;
}
