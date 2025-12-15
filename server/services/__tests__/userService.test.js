//////The entire test file is created by GenAI with some minor fix from me to make it works///////
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  describe,
  it,
  expect,
  afterEach,
  afterAll,
  beforeEach,
} from "@jest/globals";

import { userService } from "../userService.js";
import { db } from "../../db/db.js";
import { User } from "../../models/user.js";

// Create stubs for db functions
const getFromCollectionByIdStub = sinon.stub(db, "getFromCollectionById");
const getFromCollectionByFieldValueStub = sinon.stub(
  db,
  "getFromCollectionByFieldValue"
);
const addToCollectionStub = sinon.stub(db, "addToCollection");
const updateToCollectionByIdStub = sinon.stub(db, "updateToCollectionById");
const deleteFromCollectionByIdStub = sinon.stub(db, "deleteFromCollectionById");
const pushToArrayInCollectionStub = sinon.stub(db, "pushToArrayInCollection");

// Create stubs for User model and bcrypt/jwt
const fromUserDocumentStub = sinon.stub(User, "fromUserDocument");
const bcryptHashStub = sinon.stub(bcrypt, "hash");
const bcryptCompareStub = sinon.stub(bcrypt, "compare");
const jwtSignStub = sinon.stub(jwt, "sign");

describe("User Service", () => {
  beforeEach(() => {
    // Set up environment variables for JWT
    process.env.JWT_PRIVATE_KEY = "test-private-key";
    process.env.JWT_PUBLIC_KEY = "test-public-key";
  });

  afterEach(() => {
    // Reset all stubs after each test (clears behavior and history)
    getFromCollectionByIdStub.reset();
    getFromCollectionByFieldValueStub.reset();
    addToCollectionStub.reset();
    updateToCollectionByIdStub.reset();
    deleteFromCollectionByIdStub.reset();
    pushToArrayInCollectionStub.reset();
    fromUserDocumentStub.reset();
    bcryptHashStub.reset();
    bcryptCompareStub.reset();
    jwtSignStub.reset();
  });

  afterAll(() => {
    // Restore all stubs
    getFromCollectionByIdStub.restore();
    getFromCollectionByFieldValueStub.restore();
    addToCollectionStub.restore();
    updateToCollectionByIdStub.restore();
    deleteFromCollectionByIdStub.restore();
    pushToArrayInCollectionStub.restore();
    fromUserDocumentStub.restore();
    bcryptHashStub.restore();
    bcryptCompareStub.restore();
    jwtSignStub.restore();
  });

  describe("getById()", () => {
    it("should throw an error on falsy ID", async () => {
      await expect(userService.getById()).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
      await expect(userService.getById(null)).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
      await expect(userService.getById(undefined)).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
    });

    it("should return a user when valid ID matches document", async () => {
      const mockUserDoc = {
        _id: "testId",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashedPass",
      };

      getFromCollectionByIdStub
        .withArgs(db.USERS, "testId")
        .resolves(mockUserDoc);
      fromUserDocumentStub.returns({
        id: "testId",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashedPass",
      });

      const result = await userService.getById("testId");

      expect(result).toMatchObject({
        id: "testId",
        name: "Test User",
        email: "test@example.com",
      });
      expect(getFromCollectionByIdStub.calledOnceWith(db.USERS, "testId")).toBe(
        true
      );
    });
  });

  describe("add()", () => {
    it("should add a new user successfully", async () => {
      getFromCollectionByFieldValueStub
        .withArgs(db.USERS, "email", "newuser@example.com")
        .resolves(null); // User doesn't exist
      bcryptHashStub.withArgs("password123", 11).resolves("hashedPassword123");
      addToCollectionStub.withArgs(db.USERS, sinon.match.object).resolves({
        acknowledged: true,
        insertedId: "newUserId123",
      });

      const result = await userService.add(
        "New User",
        "newuser@example.com",
        "password123"
      );

      expect(result).toBe("newUserId123");
      expect(
        getFromCollectionByFieldValueStub.calledWith(
          db.USERS,
          "email",
          "newuser@example.com"
        )
      ).toBe(true);
      expect(bcryptHashStub.calledWith("password123", 11)).toBe(true);
      expect(addToCollectionStub.calledOnce).toBe(true);

      // Verify the object passed to addToCollection
      const addCall = addToCollectionStub.getCall(0);
      expect(addCall.args[0]).toBe(db.USERS);
      expect(addCall.args[1]).toMatchObject({
        name: "New User",
        email: "newuser@example.com",
        hashedPassword: "hashedPassword123",
      });
    });

    it("should throw error if email already exists", async () => {
      getFromCollectionByFieldValueStub
        .withArgs(db.USERS, "email", "existing@example.com")
        .resolves({
          _id: "existingId",
          email: "existing@example.com",
        });

      await expect(
        userService.add("Existing User", "existing@example.com", "password")
      ).rejects.toThrow("Account with this email already exists. Please try a different email.");

      expect(bcryptHashStub.called).toBe(false);
      expect(addToCollectionStub.called).toBe(false);
    });

    it("should throw error if database insert fails", async () => {
      getFromCollectionByFieldValueStub.resolves(null);
      bcryptHashStub.resolves("hashedPassword");
      addToCollectionStub.resolves({
        acknowledged: false,
      });

      await expect(
        userService.add("New User", "new@example.com", "password")
      ).rejects.toThrow("error adding user to DB");
    });

    it("should throw error if insertedId is missing", async () => {
      getFromCollectionByFieldValueStub.resolves(null);
      bcryptHashStub.resolves("hashedPassword");
      addToCollectionStub.resolves({
        acknowledged: true,
        insertedId: null,
      });

      await expect(
        userService.add("New User", "new@example.com", "password")
      ).rejects.toThrow("error adding user to DB");
    });
  });

  describe("validateLogin()", () => {
    it("should return user with JWT token on successful login", async () => {
      const mockUserDoc = {
        _id: "userId123",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashedPassword",
      };

      getFromCollectionByFieldValueStub
        .withArgs(db.USERS, "email", "test@example.com")
        .resolves(mockUserDoc);
      fromUserDocumentStub.returns({
        id: "userId123",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashedPassword",
      });
      bcryptCompareStub
        .withArgs("correctpassword", "hashedPassword")
        .resolves(true);
      jwtSignStub.returns("mock-jwt-token");

      const result = await userService.validateLogin(
        "test@example.com",
        "correctpassword"
      );

      expect(result.email).toBe("test@example.com");
      expect(result.jwt).toBe("mock-jwt-token");
      expect(result.hashedPassword).toBeUndefined();
      expect(
        bcryptCompareStub.calledWith("correctpassword", "hashedPassword")
      ).toBe(true);
      expect(jwtSignStub.calledOnce).toBe(true);
    });

    it("should throw error if email not found", async () => {
      getFromCollectionByFieldValueStub
        .withArgs(db.USERS, "email", "nonexistent@example.com")
        .resolves(null);

      await expect(
        userService.validateLogin("nonexistent@example.com", "password")
      ).rejects.toThrow("account not found.");

      expect(bcryptCompareStub.called).toBe(false);
      expect(fromUserDocumentStub.called).toBe(false);
    });

    it("should throw error if password is incorrect", async () => {
      const mockUserDoc = {
        _id: "userId123",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashedPassword",
      };

      getFromCollectionByFieldValueStub
        .withArgs(db.USERS, "email", "test@example.com")
        .resolves(mockUserDoc);
      fromUserDocumentStub.returns({
        id: "userId123",
        name: "Test User",
        email: "test@example.com",
        hashedPassword: "hashedPassword",
      });
      bcryptCompareStub
        .withArgs("wrongpassword", "hashedPassword")
        .resolves(false);

      await expect(
        userService.validateLogin("test@example.com", "wrongpassword")
      ).rejects.toThrow("invalid password");

      expect(jwtSignStub.called).toBe(false);
    });
  });

  describe("updateById()", () => {
    it("should throw error on falsy ID", async () => {
      await expect(userService.updateById()).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
      await expect(userService.updateById(null, {})).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
    });

    it("should update user info without password and return updated user", async () => {
      const mockUpdatedUserDoc = {
        _id: "userId123",
        name: "Updated Name",
        email: "test@example.com",
        hashedPassword: "hashedPassword",
      };

      updateToCollectionByIdStub
        .withArgs(db.USERS, "userId123", sinon.match.object)
        .resolves();
      getFromCollectionByIdStub
        .withArgs(db.USERS, "userId123")
        .resolves(mockUpdatedUserDoc);
      fromUserDocumentStub.returns({
        id: "userId123",
        name: "Updated Name",
        email: "test@example.com",
      });

      const result = await userService.updateById("userId123", {
        name: "Updated Name",
      });

      expect(
        updateToCollectionByIdStub.calledOnceWith(db.USERS, "userId123", {
          name: "Updated Name",
        })
      ).toBe(true);
      expect(bcryptHashStub.called).toBe(false);
      expect(result.name).toBe("Updated Name");
    });

    it("should hash password when updating password and return updated user", async () => {
      const mockUpdatedUserDoc = {
        _id: "userId123",
        name: "Updated Name",
        email: "test@example.com",
        hashedPassword: "newHashedPassword",
      };

      bcryptHashStub
        .withArgs("newPassword123", 11)
        .resolves("newHashedPassword");
      updateToCollectionByIdStub.resolves();
      getFromCollectionByIdStub
        .withArgs(db.USERS, "userId123")
        .resolves(mockUpdatedUserDoc);
      fromUserDocumentStub.returns({
        id: "userId123",
        name: "Updated Name",
        email: "test@example.com",
      });

      const userInfo = {
        password: "newPassword123",
        name: "Updated Name",
      };

      const result = await userService.updateById("userId123", userInfo);

      expect(bcryptHashStub.calledWith("newPassword123", 11)).toBe(true);
      expect(userInfo.hashedPassword).toBe("newHashedPassword");
      expect(userInfo.password).toBeUndefined();
      expect(updateToCollectionByIdStub.calledOnce).toBe(true);

      // Verify the updated object
      const updateCall = updateToCollectionByIdStub.getCall(0);
      expect(updateCall.args[2]).toMatchObject({
        hashedPassword: "newHashedPassword",
        name: "Updated Name",
      });
      expect(updateCall.args[2].password).toBeUndefined();
      expect(result.name).toBe("Updated Name");
    });
  });

  describe("deleteIt()", () => {
    it("should throw error on falsy ID", async () => {
      await expect(userService.deleteIt()).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
      await expect(userService.deleteIt(null)).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
    });

    it("should delete user and return deleted count", async () => {
      deleteFromCollectionByIdStub
        .withArgs(db.USERS, "userId123")
        .resolves({ deletedCount: 1 });

      const result = await userService.deleteIt("userId123");

      expect(result).toEqual({ deletedCount: 1 });
      expect(
        deleteFromCollectionByIdStub.calledOnceWith(db.USERS, "userId123")
      ).toBe(true);
    });

    it("should return 0 deleted count if user not found", async () => {
      deleteFromCollectionByIdStub
        .withArgs(db.USERS, "nonexistentId")
        .resolves({ deletedCount: 0 });

      const result = await userService.deleteIt("nonexistentId");

      expect(result).toEqual({ deletedCount: 0 });
      expect(
        deleteFromCollectionByIdStub.calledOnceWith(db.USERS, "nonexistentId")
      ).toBe(true);
    });
  });

  describe("addMistake()", () => {
    it("should throw error on falsy ID", async () => {
      await expect(userService.addMistake()).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
      await expect(userService.addMistake(null, {})).rejects.toThrow(
        "Null or undefined ID not allowed."
      );
    });

    it("should add mistake to user and return updated user", async () => {
      const mistake = {
        lessonId: "lesson123",
        question: "What is UX?",
        userAnswer: "User Experience",
        correctAnswer: "User Experience Design",
      };

      const mockUpdatedUserDoc = {
        _id: "userId123",
        name: "Test User",
        email: "test@example.com",
        mistakes: [mistake],
      };

      pushToArrayInCollectionStub
        .withArgs(db.USERS, "userId123", "mistakes", mistake)
        .resolves();
      getFromCollectionByIdStub
        .withArgs(db.USERS, "userId123")
        .resolves(mockUpdatedUserDoc);
      fromUserDocumentStub.returns({
        id: "userId123",
        name: "Test User",
        email: "test@example.com",
        mistakes: [mistake],
      });

      const result = await userService.addMistake("userId123", mistake);

      expect(
        pushToArrayInCollectionStub.calledOnceWith(
          db.USERS,
          "userId123",
          "mistakes",
          mistake
        )
      ).toBe(true);
      expect(result.mistakes).toHaveLength(1);
      expect(result.mistakes[0]).toMatchObject(mistake);
    });
  });
});
