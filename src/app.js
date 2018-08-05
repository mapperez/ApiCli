import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import { GraphQLSchema } from "graphql";
import cors from "cors";

// Modelos
import auth from "./funciones/auth";
import Models from "./models";
import RootQueryType from "./resolvers/rootQuery";
import MutationQueryType from "./resolvers/mutationQuery";
import SubscriptionType from "./resolvers/subscriptionQuery"

//Crear Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationQueryType,
  subscription: SubscriptionType
});

// Enviroment
import dotenv from "dotenv";
dotenv.config();
// ======================================================

// Applicacion principal
const app = express();
mongoose.connect("mongodb://localhost:27017/neomercado");
//=========================================================

//Middleware Autenticacion y Acceso 
app.use(auth.checkHeaders);
//=========================================================

//Cors

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,token");
  next();
};
app.use(allowCrossDomain);
//==========================================================

app.use(
  "/graphql",
  graphqlHTTP(req => {
    return {
      schema,
      context: {
        db: Models,
        user: req.user,
        acceso: req.acceso
      },
      graphiql: true
    };
  })
);

mongoose.connection.once("open", () => {
  console.log("Conectado a mongo");
  app.listen(process.env.PORT, () => {
    console.log("Expreess Run Port: " + process.env.PORT);
  });
});
