import chai from 'chai';
import { describe, beforeEach, it } from 'mocha';
import boomMiddleware, { BoomFunctions } from '../index';
import httpMocks from 'node-mocks-http';

const expect = chai.expect;

describe('Express Boom middleware test', function() {
    let req: httpMocks.MockRequest<any>, res: httpMocks.MockResponse<any> & { boom?: BoomFunctions };

    beforeEach(function() {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/test/path?myid=312',
            query: {
                myid: '312'
            }
        });
        res = httpMocks.createResponse();
        boomMiddleware()(req, res, () => {});
    });

    it('Should find the module loaded', function() {
        expect(res.boom).to.exist;
    });

    it('Should find the badRequest function', function() {
        expect(res.boom?.badRequest).to.be.a('function');
    });
});
