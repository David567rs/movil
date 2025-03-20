import Empresa from "../models/dtsEm.model.js";
import Faq from "../models/pregyres.model.js";
import Politicas from "../models/politicas.model.js"
import TeryCond from "../models/tyc.model.js"
import mongoose from "mongoose";

// Función para crear dasto
export const createDatos = async (req, res) => {
    try {
      const { nombre, mision, imgMision, vision, imgVision, ubicacion, redes, telefono, fechaRegistro } = req.body;
  
      const newEmpresa = new Empresa({
        nombre,
        mision,
        imgMision,
        vision,
        imgVision,
        ubicacion,
        redes,
        telefono,
        fechaRegistro,
      });
  
      const savedEmpresa = await newEmpresa.save();
      res.status(201).json(savedEmpresa);
    } catch (error) {
      res.status(500).json({ message: "Error al crear los datos de la empresa", error });
    }
};
// Funcion apara actualizar los dats
export const updateDatos = async (req, res) => {
    try {
        const updateFields = req.body;

        const updatedEmpresa = await Empresa.findOneAndUpdate(
            {}, 
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedEmpresa) {
            return res.status(404).json({ message: "No hay datos de empresa para actualizar" });
        }

        res.json(updatedEmpresa);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar los datos de la empresa", error });
    }
};
//Funcion ontene datos
export const getDatosEmpresa = async (req, res) => {
    try {
      const datos = await Empresa.findOne(); 
  
      if (!datos) {
        return res.status(404).json({ message: "No hay datos de la empresa registrados" });
      }
  
      res.json(datos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los datos de la empresa", error });
    }
};

//Preguntas y Respuestas
//Crea Pregunta y su Respuesta
export const createPreyRes = async (req, res) => {
  try {
      const { pregunta, respuesta, estado } = req.body;
      
      const nuevaFaq = new Faq({
          pregunta,
          respuesta,
          estado
      });

      const savedFaq = await nuevaFaq.save();
      res.status(201).json({ message: "Pregunta creada exitosamente", savedFaq });
  } catch (error) {
      res.status(500).json({ message: "Error al crear la pregunta y respuesta", error });
  }
};
//Taer por id
export const getPryRe = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const pregunta = await Faq.findById(id);

      if (!pregunta) {
          return res.status(404).json({ message: "Pregunta no encontrada" });
      }

      res.json(pregunta);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener la pregunta", error });
  }
};
//Trae a las preguntas y su res[uesta]
export const getPreyRes = async (req, res) => {
  try {
      const preguntasRespuestas = await Faq.find();

      if (preguntasRespuestas.length === 0) {
          return res.status(404).json({ message: "No hay preguntas y respuestas registradas" });
      }

      res.json(preguntasRespuestas);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener preguntas y respuestas", error });
  }
};
//actualiza a la pregunta o respuesta
export const updatePreyRes = async (req, res) => {
  try {
      const { id } = req.params;
      const updateFields = req.body;

      const updatedFaq = await Faq.findByIdAndUpdate(id, updateFields, { new: true });

      if (!updatedFaq) {
          return res.status(404).json({ message: "Pregunta no encontrada" });
      }

      res.json({ message: "Pregunta actualizada exitosamente", updatedFaq });
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar la pregunta y respuesta", error });
  }
};
//Elimina
export const deletePreyRes = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const deletedFaq = await Faq.findByIdAndDelete(id);

      if (!deletedFaq) {
          return res.status(404).json({ message: "Pregunta no encontrada" });
      }

      res.json({ message: "Pregunta eliminada exitosamente", deletedFaq });
  } catch (error) {
      res.status(500).json({ message: "Error al eliminar la pregunta y respuesta", error });
  }
};


//terminos y condiciones
//Crea
export const createTyC = async (req, res) => {
  try {
      const { contenido } = req.body;

      const newTyC = new TeryCond({ contenido });
      const savedTyC = await newTyC.save();

      res.status(201).json({ message: "Términos y Condiciones creados exitosamente", savedTyC });
  } catch (error) {
      res.status(500).json({ message: "Error al crear Términos y Condiciones", error });
  }
};
//Actualiza
export const updateTyC = async (req, res) => {
  try {
      const { id } = req.params;
      const { contenido } = req.body;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const updatedTyC = await TeryCond.findByIdAndUpdate(id, { contenido }, { new: true });

      if (!updatedTyC) {
          return res.status(404).json({ message: "Término y Condición no encontrado" });
      }

      res.json(updatedTyC);
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar Términos y Condiciones", error });
  }
};
//Traer por id
export const getTyCid = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const tyc = await TeryCond.findById(id);

      if (!tyc) {
          return res.status(404).json({ message: "Término y Condición no encontrado" });
      }

      res.json(tyc);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener Términos y Condiciones", error });
  }
};
//Trae
export const getTyC = async (req, res) => {
  try {
      const tyc = await TeryCond.find();

      if (tyc.length === 0) {
          return res.status(404).json({ message: "No hay Términos y Condiciones registrados" });
      }

      res.json(tyc);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener Términos y Condiciones", error });
  }
};
//Elimina
export const deleteTyC = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const deletedTyC = await TeryCond.findByIdAndDelete(id);

      if (!deletedTyC) {
          return res.status(404).json({ message: "Término y Condición no encontrado" });
      }

      res.json({ message: "Término y Condición eliminado exitosamente" });
  } catch (error) {
      res.status(500).json({ message: "Error al eliminar Términos y Condiciones", error });
  }
};


//Politicas
// Crear 
export const createPoliticas = async (req, res) => {
  try {
      const { contenido } = req.body;

      const newPoliticas = new Politicas({ contenido });
      const savedPoliticas = await newPoliticas.save();

      res.status(201).json({ message: "Política creada exitosamente", savedPoliticas });
  } catch (error) {
      res.status(500).json({ message: "Error al crear Políticas", error });
  }
};
// Actualizar 
export const updatePoliticas = async (req, res) => {
  try {
      const { id } = req.params;
      const { contenido } = req.body;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const updatedPoliticas = await Politicas.findByIdAndUpdate(id, { contenido }, { new: true });

      if (!updatedPoliticas) {
          return res.status(404).json({ message: "Política no encontrada" });
      }

      res.json(updatedPoliticas);
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar Políticas", error });
  }
};
//Traer id
export const getPolid = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const politica = await Politicas.findById(id);

      if (!politica) {
          return res.status(404).json({ message: "Política no encontrada" });
      }

      res.json(politica);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener la Política", error });
  }
};
// Traer
export const getPoliticas = async (req, res) => {
  try {
      const politicas = await Politicas.find();

      if (!politicas) {
          return res.status(404).json({ message: "No hay Políticas registradas" });
      }

      res.json(politicas);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener Políticas", error });
  }
};
//Eliminar
export const deletePoliticas = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const deletedPoliticas = await Politicas.findByIdAndDelete(id);

      if (!deletedPoliticas) {
          return res.status(404).json({ message: "Política no encontrada" });
      }

      res.json({ message: "Política eliminada exitosamente", deletedPoliticas });
  } catch (error) {
      res.status(500).json({ message: "Error al eliminar Políticas", error });
  }
};