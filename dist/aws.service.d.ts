import * as AWS from 'aws-sdk';
export declare class AWSService {
    private readonly options;
    getDynamoClient(): AWS.DynamoDB.DocumentClient;
}
