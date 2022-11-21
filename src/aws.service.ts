import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWSModuleOptions, FilterOperator, GetQueryFilterExpression, QueryFilter } from './aws.interfaces';

@Injectable({  })
export class AWSService {

  @Inject('AWS_OPTIONS') 
  private readonly options: AWSModuleOptions;

  getDynamoClient(): AWS.DynamoDB.DocumentClient {
    return new AWS.DynamoDB.DocumentClient({
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretKey
      },
      region: this.options.region,
      endpoint: this.options.endpoint
    });
  }

  getEmailClient(): AWS.SES {
    return new AWS.SES({ 
      apiVersion: '2010-12-01', 
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretKey
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
      ExpressionAttributeNames: {}
    };

    const set = Object.keys(data).filter(key => data[key]);
    const remove = Object.keys(data).filter(key => !data[key]);

    if (set.length > 0) {
      input.UpdateExpression = 'SET ';
      input.ExpressionAttributeValues = {};
    }
    set.forEach((key, index) => {
        const name = '#' + key.toUpperCase();
        const valueName = ':' + key;

        if ((index) === (set.length - 1)) {
          input.UpdateExpression = input.UpdateExpression + name + ' = ' + valueName;
        } else {
          input.UpdateExpression = input.UpdateExpression + name + ' = ' + valueName  + ', ';
        }
        
        input.ExpressionAttributeNames[name] = key;
        input.ExpressionAttributeValues[valueName] = data[key];
    });

    if (remove.length > 0) {
      if (!input.ExpressionAttributeNames) {
        input.ExpressionAttributeNames = {};
      }

      input.UpdateExpression = input.UpdateExpression + ' REMOVE ';
      remove.forEach((key, index) => {
        const name = '#' + key.toUpperCase();

        if (index === (remove.length - 1)) {
          input.UpdateExpression = input.UpdateExpression + name;
        } else {
          input.UpdateExpression = input.UpdateExpression + name + ', ';
        }

        input.ExpressionAttributeNames[name] = key;
      })
    }

    return input;
  
  }

  getQueryFilterExpression(filters: QueryFilter[], condition: 'AND' | 'OR'): GetQueryFilterExpression {
    if (filters.length < 1) {
      return { filterExpression: undefined, expressionNames: undefined, expressionValues: undefined };
    }

    let filterExpression = '';
    let expressionNames = {};
    let expressionValues = {};

    filters.forEach((filter, index) => {
      const keyExpression = filter.key.toLowerCase();

      switch (filter.operator) {
        case FilterOperator.EQ:
          filterExpression = filterExpression + '#' + keyExpression + ' = :' + keyExpression;
          break;
        case FilterOperator.CONTAINS:
          filterExpression = filterExpression + 'contains(#' + keyExpression + ', :' + keyExpression + ')';
          break;
      }

      if (index < (filters.length - 1)) {
        filterExpression = filterExpression + ' ' + condition + ' ';
      }

      expressionNames['#' + keyExpression] = filter.key;
      expressionValues[':' + keyExpression] = filter.value;
    });

    return { filterExpression, expressionNames, expressionValues };
  }

}
