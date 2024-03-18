import * as express from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      customField?: string;
    }
  }
}

/*
 * OR
 */

declare module "express-serve-static-core" {
  interface Request {
    user?: string;
  }
}
