import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetQueryFilterExpression, QueryFilter } from './aws.interfaces';
export declare class AWSService {
    private readonly options;
    getDynamoClient(): AWS.DynamoDB.DocumentClient;
    getEmailClient(): AWS.SES;
    getUpdateInput(tableName: string, key: DocumentClient.Key, data: Object): DocumentClient.UpdateItemInput;
    getQueryFilterExpression(filters: QueryFilter[], condition: 'AND' | 'OR'): GetQueryFilterExpression;
}
