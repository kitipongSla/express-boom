"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const mocha_1 = require("mocha");
const index_1 = __importDefault(require("../index"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const expect = chai_1.default.expect;
(0, mocha_1.describe)('Express Boom middleware test', function () {
    let req, res;
    (0, mocha_1.beforeEach)(function () {
        req = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/test/path?myid=312',
            query: {
                myid: '312'
            }
        });
        res = node_mocks_http_1.default.createResponse();
        (0, index_1.default)()(req, res, () => { });
    });
    (0, mocha_1.it)('Should find the module loaded', function () {
        expect(res.boom).to.exist;
    });
    (0, mocha_1.it)('Should find the badRequest function', function () {
        var _a;
        expect((_a = res.boom) === null || _a === void 0 ? void 0 : _a.badRequest).to.be.a('function');
    });
});
