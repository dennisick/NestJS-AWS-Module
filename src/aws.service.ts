import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable({  })
export class AWSService {

  @Inject('AWS_OPTIONS') 
  private readonly options: Record<string, any>

  getDynamoClient(): AWS.DynamoDB.DocumentClient {
    return new AWS.DynamoDB.DocumentClient({
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey
      },
      region: this.options.region,
      endpoint: this.options.endpoint
    });
  }

  getUpdateExpression(tableName: string, key: DocumentClient.Key, data: Object): DocumentClient.UpdateItemInput {
    const input: DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: '',
      ExpressionAttributeNames: {

      },
      ExpressionAttributeValues: {

      }
    };

    Object.keys(data).forEach((key, index) => {
      if (data[key]) {
        const name = '#' + key.toUpperCase();
        const valueName = ':' + key;

        if ((index - 1) === Object.keys(data).length) {
          input.UpdateExpression = input.UpdateExpression + 'SET ' + name + ' = ' + valueName;
        } else{
          input.UpdateExpression = input.UpdateExpression + 'SET ' + name + ' = ' + valueName + ', ';
        }
        
        input.ExpressionAttributeNames[name] = key;
        input.ExpressionAttributeValues[valueName] = data[key];
      }
    });

    return input;
  }

}
