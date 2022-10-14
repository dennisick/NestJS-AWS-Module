import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable({  })
export class AWSService {

  @Inject('AWS_OPTIONS') 
  private readonly options: Record<string, any>

  getDynamoClient(): AWS.DynamoDB.DocumentClient {
    return new AWS.DynamoDB.DocumentClient({
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey
      }
    });
  }

}
