"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AWSModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSModule = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("./aws.service");
let AWSModule = AWSModule_1 = class AWSModule {
    static register(options) {
        return {
            module: AWSModule_1,
            providers: [
                {
                    provide: 'AWS_OPTIONS',
                    useValue: options
                },
                aws_service_1.AWSService
            ],
            exports: [aws_service_1.AWSService]
        };
    }
};
AWSModule = AWSModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], AWSModule);
exports.AWSModule = AWSModule;
//# sourceMappingURL=aws.module.js.map