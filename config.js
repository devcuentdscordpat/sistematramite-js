const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.set("view engine", "ejs"); // Configurando el motor de plantillas EJS
  app.set("views", path.join(__dirname, "app/views")); // Definiendo la carpeta de nuestras Vistas
  app.use(express.static(path.join(__dirname, "app/statics"))); // Definiendo la carpeta de los archivos estaticos globales
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
};

