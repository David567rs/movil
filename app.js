// src/app.js
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouters from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import ventRouter from "./routes/ventana.routes.js"
import datosEmpRouter from "./routes/empresa.routes.js"
import favoritosRoutes from "./routes/favoritos.routes.js";

const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));


// const allowedOrigins = ['http://localhost:5173', 'http://192.168.0.103:5173'];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Origin not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouters);
app.use("/api", productsRouter);
app.use("/api", ventRouter);
app.use("/api", datosEmpRouter);
app.use("/api", favoritosRoutes);



export default app;
