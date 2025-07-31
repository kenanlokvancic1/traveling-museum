"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import process from "process";
import configModule from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configModule[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const initializeModels = async () => {
  const modelFiles = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });

  for (const file of modelFiles) {
    const modelPath = `file://${path.join(__dirname, file)}`;
    const model = await import(modelPath);
    if (model.default && model.default.name) {
      db[model.default.name] = model.default;
    }
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.initialize = initializeModels;

export default db;
