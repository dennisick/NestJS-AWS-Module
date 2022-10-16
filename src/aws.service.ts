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

  getUpdateInput(tableName: string, key: DocumentClient.Key, data: Object): DocumentClient.UpdateItemInput {
    const input: DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: '',
      ExpressionAttributeNames: {

      },
      ExpressionAttributeValues: {

      }
    };

    const set = Object.keys(data).filter(key => data[key]);
    const remove = Object.keys(data).filter(key => !data[key]);

    console.log(set);
    console.log(remove);

    input.UpdateExpression = 'SET ';
    set.forEach((key, index) => {
        const name = '#' + key.toUpperCase();
        const valueName = ':' + key;

        if ((index) === (Object.keys(set).length - 1)) {
          input.UpdateExpression = input.UpdateExpression + name + ' = ' + valueName;
        } else {
          input.UpdateExpression = input.UpdateExpression + name + ' = ' + valueName  + ', ';
        }
        
        input.ExpressionAttributeNames[name] = key;
        input.ExpressionAttributeValues[valueName] = data[key];
    });

    if (remove.length > 0) {
      input.UpdateExpression = input.UpdateExpression + ', REMOVE ';
      remove.forEach((key, index) => {
        const name = '#' + key.toUpperCase();

        if (index === (Object.keys(remove).length - 1)) {
          input.UpdateExpression = input.UpdateExpression + name;
        } else {
          input.UpdateExpression = input.UpdateExpression + name + ', ';
        }

        input.ExpressionAttributeNames[name] = key;
      })
    }

    return input;
  }

}
