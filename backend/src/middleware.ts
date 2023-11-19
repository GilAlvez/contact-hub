import express from "express";

export default abstract class Middleware {
  static json = express.json;
}
