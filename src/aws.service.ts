import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DataExpressions } from './types/aws';

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

  getUpdateExpression(dataExpressions: DataExpressions): string {
    let updateExpression = '';

    dataExpressions.forEach((expression, object) => {
      console.log(expression, object);
    });

    return updateExpression;
  }

}
