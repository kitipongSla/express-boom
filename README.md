# express-boom

## Install

```
npm install express-boom-typescript
```

## Usage

```ts
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import boomMiddleware from 'express-boom';

const app = express();

interface BoomFunctions {
  [key: string]: (...args: any[]) => { output: { statusCode: number, payload: any } }
}

declare global {
  namespace Express {
    export interface Response {
      boom: BoomFunctions
    }
  }
}

app.use(boomMiddleware as RequestHandler);

const handler: RequestHandler = 
(req: Request, res: Response, next: NextFunction) => {
  res.boom.badRequest("Bad Request");
};

app.get('/', handler);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

```

For a complete list of methods, see the [Boom docs](https://github.com/hapijs/boom#overview)