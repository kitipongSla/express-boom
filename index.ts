import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

declare module 'express' {
  interface Response {
    boom: BoomFunctions;
  }
}

interface BoomFunctions {
  [key: string]: Function;
}

const helperMethods = ['wrap', 'create'];

function boomMiddleware() {
  return function (req: Request, res: Response, next: NextFunction) {
    if (res.boom) throw new Error('boom already exists on response object');

    res.boom = {} as BoomFunctions;

    Object.getOwnPropertyNames(boom).forEach(function (key) {
      if (typeof (boom as BoomFunctions)[key] !== 'function') return;

      if (helperMethods.indexOf(key) !== -1) {
        res.boom[key] = function () {
          return (boom as BoomFunctions)[key].apply(boom, arguments);
        };
      } else {
        res.boom[key] = function () {
          const boomed = (boom as BoomFunctions)[key].apply(boom, arguments);

          const boomedPayloadAndAdditionalResponse = Object.assign(
            boomed.output.payload,
            arguments[1]
          );

          return res.status(boomed.output.statusCode).send(boomedPayloadAndAdditionalResponse);
        };
      }
    });

    next();
  };
}

export default boomMiddleware;
