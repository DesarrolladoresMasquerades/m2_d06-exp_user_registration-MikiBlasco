const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const favicon = require("serve-favicon");
const MongoStore = require("connect-mongo")
const path = require("path");

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, //The cookie is one day old as maximum now. Will last 24h
      },
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
          ttl: 24 * 60 * 60,
        })
      }
  ));


  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
};
