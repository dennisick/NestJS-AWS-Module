"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let AWSService = class AWSService {
    getDynamoClient() {
        return new AWS.DynamoDB.DocumentClient({
            credentials: {
                accessKeyId: this.options.accessKeyId,
                secretAccessKey: this.options.secretKey
            },
            region: this.options.region,
            endpoint: this.options.endpoint
        });
    }
    getEmailClient() {
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
    getUpdateInput(tableName, key, data) {
        const input = {
            TableName: tableName,
            Key: key,
            UpdateExpression: '',
            ConditionExpression: '',
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
            }
            else {
                input.UpdateExpression = input.UpdateExpression + name + ' = ' + valueName + ', ';
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
                }
                else {
                    input.UpdateExpression = input.UpdateExpression + name + ', ';
                }
                input.ExpressionAttributeNames[name] = key;
            });
        }
        return input;
    }
};
__decorate([
    (0, common_1.Inject)('AWS_OPTIONS'),
    __metadata("design:type", Object)
], AWSService.prototype, "options", void 0);
AWSService = __decorate([
    (0, common_1.Injectable)({})
], AWSService);
exports.AWSService = AWSService;
//# sourceMappingURL=aws.service.js.map