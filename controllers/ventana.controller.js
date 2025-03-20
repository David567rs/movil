import Iot from "../models/ventana.models.js";

//Trae ventanas de usuaris
export const getVentanas= async(req,res)=>{
    const vent = await Iot.find();
}

//Registra y actualiza ventana
export const postVentana = async (req, res) => {
    const { codigo, temp, estVentana } = req.body;

    try {
        const updatedVentana = await Iot.findOneAndUpdate(
            { codigo },
            { temp, estVentana },
            { new: true } 
        );

        if (updatedVentana) {
            return res.json(updatedVentana);
        }

        const newVentana = new Iot({ codigo, temp, estVentana });
        const savedVentana = await newVentana.save();

        res.json(savedVentana);
    } catch (error) {
        console.error("Error al procesar:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

//da los datos de una ventana especifica
export const getVentana = async(req,res)=>{
    const vtn = await Iot.findById(req.params.codigo);
    if(!vtn) return res.status(404).json({message:"No se encontro la ventana"})
    res.json(vtn);
}



// export const prueba = async (req,res) => {
//     res.json({ message: 'Hola Mundo' });
// }
