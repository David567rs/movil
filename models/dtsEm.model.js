import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },

  // Misión y Visión
  mision: { 
    type: String, 
    required: true 
},
  imgMision: { 
    type: String, 
    required: true 
},
  vision: { 
    type: String, 
    required: true 
},
  imgVision: { 
    type: String, 
    required: true },

  // Ubicación
  ubicacion: {
    calle: { 
        type: String, 
        required: true 
    },
    colonia: { 
        type: String, 
        required: true 
    },
    ciudad: { 
        type: String, 
        required: true 
    },
    estado: { 
        type: String, 
        required: true 
    },
    codigoPostal: { 
        type: String, 
        required: true 
    },
    lat: { 
        type: Number, 
        required: true 
    },
    lon: { 
        type: Number, 
        required: true 
    }
  },

  // Redes Sociales
  redes: {
    instagram: { 
        type: String, 
        required: false 
    },
    facebook: { 
        type: String, 
        required: false 
    },
    twitter: { 
        type: String, 
        required: false 
    }
  },

  // Teléfono
  telefono: { 
    type: String, 
    required: true 
},

  // Fecha de Creación
  fechaRegistro: { 
    type: Date, 
    default: Date.now 
}
});

export default mongoose.model("Empresa", EmpresaSchema,"empresa")
