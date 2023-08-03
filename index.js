"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const helperMethods = ['wrap', 'create'];
function boomMiddleware() {
    return function (req, res, next) {
        if (res.boom)
            throw new Error('boom already exists on response object');
        res.boom = {};
        Object.getOwnPropertyNames(boom_1.default).forEach(function (key) {
            if (typeof boom_1.default[key] !== 'function')
                return;
            if (helperMethods.indexOf(key) !== -1) {
                res.boom[key] = function () {
                    return boom_1.default[key].apply(boom_1.default, arguments);
                };
            }
            else {
                res.boom[key] = function () {
                    const boomed = boom_1.default[key].apply(boom_1.default, arguments);
                    const boomedPayloadAndAdditionalResponse = Object.assign(boomed.output.payload, arguments[1]);
                    return res.status(boomed.output.statusCode).send(boomedPayloadAndAdditionalResponse);
                };
            }
        });
        next();
    };
}
exports.default = boomMiddleware;
