//////The entire test file is created by GenAI with some minor fix from me to make it works///////
import sinon from "sinon";
import {
  describe,
  it,
  expect,
  afterEach,
  afterAll,
  beforeEach,
} from "@jest/globals";

import { userControllers } from "../userControllers";
import { userService } from "../../services/userService";

// Create stubs for userService functions
const getByIdStub = sinon.stub(userService, "getById");
const addStub = sinon.stub(userService, "add");
const validateLoginStub = sinon.stub(userService, "validateLogin");
const deleteItStub = sinon.stub(userService, "deleteIt");
const updateByIdStub = sinon.stub(userService, "updateById");
const addMistakeStub = sinon.stub(userService, "addMistake");

describe("User Controllers", () => {
  let req, res;

  beforeEach(() => {
    // Set up environment variables to prevent db initialization
    process.env.MONGO_URI = "mongodb://localhost:27017";
    process.env.MONGO_DBNAME = "testdb";

    // Create mock request and response objects
    req = {
      params: {},
      body: {},
      query: {},
    };

    res = {
      json: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      sendStatus: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    // Reset all stubs after each test
    getByIdStub.reset();
    addStub.reset();
    validateLoginStub.reset();
    deleteItStub.reset();
    updateByIdStub.reset();
    addMistakeStub.reset();
  });

  afterAll(() => {
    // Restore all stubs
    getByIdStub.restore();
    addStub.restore();
    validateLoginStub.restore();
    deleteItStub.restore();
    updateByIdStub.restore();
    addMistakeStub.restore();
  });

  describe("getUserById()", () => {
    it("should return user by ID", async () => {
      const mockUser = {
        id: "user123",
        name: "Test User",
        email: "test@example.com",
      };

      req.params.id = "user123";
      getByIdStub.withArgs("user123").resolves(mockUser);

      await userControllers.getUserById(req, res);

      expect(getByIdStub.calledOnceWith("user123")).toBe(true);
      expect(res.json.calledOnceWith(mockUser)).toBe(true);
    });

    it("should handle errors from service", async () => {
      req.params.id = "invalidId";
      const error = new Error("User not found");
      getByIdStub.withArgs("invalidId").rejects(error);

      await expect(userControllers.getUserById(req, res)).rejects.toThrow(
        "User not found"
      );
      expect(getByIdStub.calledOnceWith("invalidId")).toBe(true);
    });
  });

  describe("createUser()", () => {
    it("should create a new user successfully", async () => {
      req.body = {
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      };

      const mockCreatedUser = {
        id: "newUserId123",
        name: "New User",
        email: "newuser@example.com",
      };

      addStub
        .withArgs("New User", "newuser@example.com", "password123")
        .resolves("newUserId123");
      getByIdStub.withArgs("newUserId123").resolves(mockCreatedUser);

      await userControllers.createUser(req, res);

      expect(
        addStub.calledOnceWith("New User", "newuser@example.com", "password123")
      ).toBe(true);
      expect(getByIdStub.calledOnceWith("newUserId123")).toBe(true);
      expect(res.status.calledOnceWith(201)).toBe(true);
      expect(res.json.calledOnce).toBe(true);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).toMatchObject({
        id: "newUserId123",
        name: "New User",
        email: "newuser@example.com",
      });
    });

    it("should return 500 if service throws error", async () => {
      req.body = {
        name: "Existing User",
        email: "existing@example.com",
        password: "password",
      };

      const error = new Error(
        "Account with this email already exists. Please try a different email."
      );
      addStub
        .withArgs("Existing User", "existing@example.com", "password")
        .rejects(error);

      await userControllers.createUser(req, res);

      expect(addStub.calledOnce).toBe(true);
      expect(res.status.calledOnceWith(500)).toBe(true);
      expect(res.json.calledOnce).toBe(true);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).toHaveProperty("error");
    });

    it("should not include hashedPassword in response", async () => {
      req.body = {
        name: "New User",
        email: "new@example.com",
        password: "secretPassword",
      };

      const mockUserWithPassword = {
        id: "userId123",
        name: "New User",
        email: "new@example.com",
        hashedPassword: "hashed123",
      };

      addStub.resolves("userId123");
      getByIdStub.withArgs("userId123").resolves(mockUserWithPassword);

      await userControllers.createUser(req, res);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).not.toHaveProperty("password");
      expect(jsonCall.args[0]).not.toHaveProperty("hashedPassword");
    });
  });

  describe("login()", () => {
    it("should return user with JWT on successful login", async () => {
      req.body = {
        email: "test@example.com",
        password: "correctpassword",
      };

      const mockUser = {
        id: "userId123",
        name: "Test User",
        email: "test@example.com",
        jwt: "mock-jwt-token",
      };

      validateLoginStub
        .withArgs("test@example.com", "correctpassword")
        .resolves(mockUser);

      await userControllers.login(req, res);

      expect(
        validateLoginStub.calledOnceWith("test@example.com", "correctpassword")
      ).toBe(true);
      expect(res.status.calledOnceWith(200)).toBe(true);
      expect(res.json.calledOnceWith(mockUser)).toBe(true);
    });

    it("should return 401 if email not found", async () => {
      req.body = {
        email: "nonexistent@example.com",
        password: "password",
      };

      const error = new Error("account not found.");
      validateLoginStub
        .withArgs("nonexistent@example.com", "password")
        .rejects(error);

      await userControllers.login(req, res);

      expect(validateLoginStub.calledOnce).toBe(true);
      expect(res.status.calledOnceWith(401)).toBe(true);
      expect(res.json.calledOnce).toBe(true);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).toEqual({ error: "account not found." });
    });

    it("should return 401 if password is incorrect", async () => {
      req.body = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const error = new Error("invalid password");
      validateLoginStub
        .withArgs("test@example.com", "wrongpassword")
        .rejects(error);

      await userControllers.login(req, res);

      expect(validateLoginStub.calledOnce).toBe(true);
      expect(res.status.calledOnceWith(401)).toBe(true);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).toEqual({ error: "invalid password" });
    });
  });

  describe("deleteUser()", () => {
    it("should delete user and return deleted count", async () => {
      req.params.id = "user123";
      deleteItStub.withArgs("user123").resolves({ deletedCount: 1 });

      await userControllers.deleteUser(req, res);

      expect(deleteItStub.calledOnceWith("user123")).toBe(true);
      expect(res.json.calledOnceWith({ deletedCount: 1 })).toBe(true);
    });

    it("should return 0 if user not found", async () => {
      req.params.id = "nonexistent";
      deleteItStub.withArgs("nonexistent").resolves({ deletedCount: 0 });

      await userControllers.deleteUser(req, res);

      expect(deleteItStub.calledOnceWith("nonexistent")).toBe(true);
      expect(res.json.calledOnceWith({ deletedCount: 0 })).toBe(true);
    });

    it("should handle errors from service", async () => {
      req.params.id = "user123";
      const error = new Error("Database error");
      deleteItStub.withArgs("user123").rejects(error);

      await expect(userControllers.deleteUser(req, res)).rejects.toThrow(
        "Database error"
      );
      expect(deleteItStub.calledOnceWith("user123")).toBe(true);
    });
  });

  describe("updateUser()", () => {
    it("should update user successfully and return updated user", async () => {
      req.params.id = "user123";
      req.body = {
        name: "Updated Name",
      };

      const mockUpdatedUser = {
        id: "user123",
        name: "Updated Name",
        email: "test@example.com",
      };

      updateByIdStub.withArgs("user123", req.body).resolves(mockUpdatedUser);

      await userControllers.updateUser(req, res);

      expect(updateByIdStub.calledOnceWith("user123", req.body)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWith(mockUpdatedUser)).toBe(true);
    });

    it("should update user with password and not return hashedPassword", async () => {
      req.params.id = "user123";
      req.body = {
        password: "newPassword123",
        name: "Updated Name",
      };

      const mockUpdatedUser = {
        id: "user123",
        name: "Updated Name",
        email: "test@example.com",
        hashedPassword: "hashedNewPassword",
      };

      updateByIdStub.withArgs("user123", req.body).resolves(mockUpdatedUser);

      await userControllers.updateUser(req, res);

      expect(updateByIdStub.calledOnce).toBe(true);
      expect(res.json.calledOnce).toBe(true);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).not.toHaveProperty("hashedPassword");
    });

    it("should handle multiple field updates", async () => {
      req.params.id = "user456";
      req.body = {
        name: "Updated Name",
        email: "updated@example.com",
      };

      const mockUpdatedUser = {
        id: "user456",
        name: "Updated Name",
        email: "updated@example.com",
      };

      updateByIdStub.withArgs("user456", req.body).resolves(mockUpdatedUser);

      await userControllers.updateUser(req, res);

      expect(updateByIdStub.calledOnce).toBe(true);
      const updateCall = updateByIdStub.getCall(0);
      expect(updateCall.args[0]).toBe("user456");
      expect(updateCall.args[1]).toEqual(req.body);
    });

    it("should handle errors from service", async () => {
      req.params.id = "user123";
      req.body = { name: "Updated" };

      const error = new Error("Update failed");
      updateByIdStub.withArgs("user123", req.body).rejects(error);

      await expect(userControllers.updateUser(req, res)).rejects.toThrow(
        "Update failed"
      );
      expect(updateByIdStub.calledOnce).toBe(true);
    });
  });

  describe("addMistake()", () => {
    it("should add mistake to user and return updated user", async () => {
      req.params.id = "user123";
      req.body = {
        exerciseId: "exercise456",
        lessonId: "lesson789",
      };

      const mockUpdatedUser = {
        id: "user123",
        name: "Test User",
        email: "test@example.com",
        mistakes: [
          {
            exerciseId: "exercise456",
            lessonId: "lesson789",
          },
        ],
      };

      addMistakeStub
        .withArgs("user123", {
          exerciseId: "exercise456",
          lessonId: "lesson789",
        })
        .resolves(mockUpdatedUser);

      await userControllers.addMistake(req, res);

      expect(
        addMistakeStub.calledOnceWith("user123", {
          exerciseId: "exercise456",
          lessonId: "lesson789",
        })
      ).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWith(mockUpdatedUser)).toBe(true);
    });

    it("should not return hashedPassword in response", async () => {
      req.params.id = "user123";
      req.body = {
        exerciseId: "exercise456",
        lessonId: "lesson789",
      };

      const mockUpdatedUser = {
        id: "user123",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashed123",
        mistakes: [
          {
            exerciseId: "exercise456",
            lessonId: "lesson789",
          },
        ],
      };

      addMistakeStub.resolves(mockUpdatedUser);

      await userControllers.addMistake(req, res);

      const jsonCall = res.json.getCall(0);
      expect(jsonCall.args[0]).not.toHaveProperty("hashedPassword");
      expect(jsonCall.args[0]).toHaveProperty("mistakes");
    });

    it("should handle errors from service", async () => {
      req.params.id = "user123";
      req.body = {
        exerciseId: "exercise456",
        lessonId: "lesson789",
      };

      const error = new Error("Failed to add mistake");
      addMistakeStub.rejects(error);

      await expect(userControllers.addMistake(req, res)).rejects.toThrow(
        "Failed to add mistake"
      );
      expect(addMistakeStub.calledOnce).toBe(true);
    });
  });
});
