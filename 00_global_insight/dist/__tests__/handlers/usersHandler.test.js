"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __mocks__1 = require("../../__mocks__");
const usersHandler_1 = require("../../handlers/usersHandler");
describe("getUsers", () => {
    it("should return an array of users", () => {
        (0, usersHandler_1.getUsers)(__mocks__1.mockRequest, __mocks__1.mockResponse);
        expect(__mocks__1.mockResponse.send).toHaveBeenCalledWith([]);
    });
});
