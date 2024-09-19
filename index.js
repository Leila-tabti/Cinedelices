import "dotenv/config";
import express from "express";
import { bodySanitizer } from "./src/middlewares/sanitizeHtml.js";
import cors from "cors";
import { router } from "./src/routers/index.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize } from "./src/models/sequelize.js";


import { MovieAndSerie } from "./src/models/movieAndSerie.js";
import { Recipe } from "./src/models/recipe.js";

import helmet from "helmet";
import { notFound } from "./src/middlewares/notFound.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;

export const app = express();
app.use(helmet());
app.use(cookieParser());

app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin:", origin);
      if (
        process.env.ALLOWED_DOMAINS.split(",").indexOf(origin) !== -1 ||
        !origin
        // Check if the origin is in the allowed domains list or if no origin is provided (e.g., in server-side requests)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(bodySanitizer);

app.use(router);

app.use(notFound);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
