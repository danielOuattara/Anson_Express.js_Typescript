// import express from "express";
import express from "express";
import { Request, Response, RequestHandler } from "express-serve-static-core";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import {
  patchUserValidationSchema,
  putUserValidationSchema,
} from "./utilities/validationSchema.js";

const app = express();

const PORT = process.env.PORT || 3000;

//--------------- Data
const users = [
  { id: 1, name: "John Doe", username: "johnD", email: "johndoe@email.com" },
  { id: 2, name: "Anna Smith", username: "an88na", email: "annaanna@email.uk" },
  {
    id: 3,
    name: "Bob Tyson",
    username: "micky_mouse",
    email: "mtstrong@jaguar.us",
  },
];
const products = [
  { id: 1, name: "cheese" },
  { id: 2, name: "eggs" },
  { id: 3, name: "milk" },
];

//----------------  Middlewares definition
const loginMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolveUserIndex: RequestHandler = (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res
      .status(400)
      .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
  }
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User Not Found." });
  }
  req.userIndex = userIndex;
  req.userId = userId;
  next();
};

/** ------------- middleware parsing incoming json data in req.body */
app.use(express.json());

// Middleware

// --------------- // Apply middleware on the entire APP
app.use(loginMiddleware);

//------------------ CRUD operations

// http://localhost:3000/api/v1/users?filter=name&value=na

app.get("/", (_req, res) => {
  //   return res.send("Hello World, Welcome !");
  //   return res.json({ message: "Hello World, Welcome !" });
  //   return res.status(200).send("Hello World, Welcome !");
  return res.status(201).json({ message: "Hello World, Welcome !" });
});

//---------------
app.get(
  "/api/v1/products",
  (_req, _res, next) => {
    console.log("Logging Products");
    next();
  },
  (_req, res, _next) => {
    return res.json({ products });
  },
);

//---------------- query validations & message

interface IReqQuery {
  filter?: "name" | "username";
  value?: string;
}

app.get(
  "/api/v1/users",
  query("filter")
    .notEmpty()
    .withMessage("No empty filter")
    .isString()
    .withMessage("filter must be string")
    .isLength({ min: 3, max: 12 })
    .withMessage("filter min-length: 3 &  max-length: 12"),

  (req: Request<{}, {}, {}, IReqQuery>, res) => {
    console.log("req = ", req);
    // console.log("req = ", req["express-validator#contexts"]);
    const result = validationResult(req);
    console.log("result = ", result);
    console.log("result.array() = ", result.array());

    const filter = req.query.filter;
    const value = req.query.value;

    if (filter && value) {
      const newUsers = users.filter((user) => user[filter].includes(value));
      return res.send(newUsers);
    }
    return res.send(users);
  },
);

app.get(
  "/api/v1/users-test",

  (req, res) => {
    console.log("req = ", req);
    const filter = req.queryTest?.filter;
    const value = req.queryTest?.value;

    if (filter && value) {
      const newUsers = users.filter((user) => user[filter].includes(value));
      return res.send(newUsers);
    }
    return res.send(users);
  },
);

//------------------
app.get("/api/v1/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res
      .status(400)
      .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).send({ msg: "User Not Found." });
  }
  return res.send(user);
});

//------------------ body validation and messages
app.post(
  "/api/v1/users/",
  body(["name", "email", "password"])
    .notEmpty()
    .withMessage("name, email & password cannot be empty"),
  body(["name"])
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 2, max: 20 })
    .withMessage("name min-length: 2 &  max-length: 12"),
  body(["email"]).isEmail().withMessage("email must be valid"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 2,
      minUppercase: 2,
      minNumbers: 2,
      returnScore: true,
    })
    .withMessage("password is not strong: ")
    .isLength({ min: 6 })
    .withMessage("password min-length: 6 characters"),
  body("username")
    .isString()
    .withMessage("username must be a string")
    .notEmpty()
    .withMessage("username cannot be empty"), // Ensure username is not empty

  (req, res) => {
    // console.log("req = ", req["express-validator#contexts"]);
    const result = validationResult(req);
    // console.log("result = ", result);
    // console.log("result.array() = ", result.array());

    // handle error
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const validatedData = matchedData(req) as IPostUserValidatedData;

    const newUser = { id: new Date().getTime(), ...validatedData };
    users.push(newUser);
    return res.status(201).json({ message: "post OK", users });
  },
);

//------------------ validation using an external schema
app.put(
  "/api/v1/users/:userId",
  checkSchema(putUserValidationSchema),
  resolveUserIndex,
  (req: Request, res: Response) => {
    const result = validationResult(req);
    // handle error from validator
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const validatedData = matchedData(req) as IPutUserValidatedData;

    users[req.userIndex!] = {
      id: req.userId!,
      email: users[req.userIndex!].email,
      ...validatedData,
    };
    return res.status(200).send(users);
  },
);

//------------------
app.patch(
  "/api/v1/users/:userId",
  checkSchema(patchUserValidationSchema),
  resolveUserIndex,
  (req: Request, res: Response) => {
    const result = validationResult(req);
    // handle error from validator
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    const validatedData = matchedData(req) as IPatchUserValidatedData;

    users[req.userIndex!] = { ...users[req.userId!], ...validatedData };
    return res.status(200).send(users);
  },
);

//------------------
app.delete("/api/v1/users/:userId", resolveUserIndex, (req, res) => {
  users.splice(req.userIndex!, 1);

  return res.status(200).send(users);
});

//------------------
app.use((_req, _res, next) => {
  console.log("End of logic");
  next();
});

//------------------
app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
