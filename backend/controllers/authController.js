const { Usuarios } = require('../models/relations');
const jwt = require("jsonwebtoken");
const secretJWT = process.env.JWT_SECRET;
const express = require('express');
const expressJwt = require("express-jwt");
const server = express();
server.use(
    expressJwt({
      secret: secretJWT,
      algorithms: ["HS256"],
    }).unless({
      path: ["/login"]
    })
  );

const login = async (req, res) => {
    // traer usuario id para mandarlo como payload en el JWT
    try {
      const thisUsuario = await Usuarios.findOne({
        where: {
          email: req.body.email
        }
      });
      console.log(thisUsuario.id)
      // sign jwt
      const token = await jwt.sign(
        {
          usuario: thisUsuario.usuario,
          email: req.body.email,
          id: thisUsuario.id
        },
        secretJWT,
        { expiresIn: "120min" }
      );
      console.log(`Usuario logueado, token es: ${token}`);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
  };

module.exports = { login }