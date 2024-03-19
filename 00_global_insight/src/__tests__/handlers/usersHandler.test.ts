import { mockRequest, mockResponse } from "../../__mocks__";
import { getUsers } from "../../handlers/usersHandler";

describe("getUsers", () => {
  it("should return an array of users", () => {
    getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});
