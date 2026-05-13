import knex from "../../../db.js";

export default async function authToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Missing token",
    });
  }

  const token = authHeader.split(" ")[1];

  const tokenRecord = await knex("tokens").where({ token }).first();

  if (!tokenRecord) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  req.user = tokenRecord;

  next();
}
