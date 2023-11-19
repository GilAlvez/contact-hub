import express from "express";

export default abstract class Middleware {
  static async json() {
    return express.json;
  }
}
