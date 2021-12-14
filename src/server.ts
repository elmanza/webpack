
import express from "express";
import dotenv from "dotenv";
import {Perimetro} from './libs/perimetro';
import {Superficie} from './libs/superficie'
let perimetro:Perimetro = new Perimetro();
let superficie:Superficie = new Superficie();
dotenv.config();
let app = express();
const PORT = process.env.PORT;

app.get("/", (req, res, next)=>{
    res.json([{
        "Tipo de operación": "Perimetro",
        "data":{
            "Caudrado": perimetro.cuadrado(3),
            "Rectangulo": perimetro.rectangulo(2, 4),
            "Circulo": perimetro.circulo(8),
        }
    },{
        "Tipo de operación": "Superficie",
        "data":{
            "Caudrado": superficie.cuadrado(3),
            "Rectangulo": superficie.rectangulo(2, 4),
            "Circulo": superficie.circulo(8),
        }
    }])
});

app.get("/:operacion/:figura", (req, res, next)=>{
    let {operacion, figura} = req.params;
    let op_clase;
    if(operacion == "perimetro"){
        op_clase = perimetro;
    }else{
        op_clase = superficie;
    }
    let resultado = false;

    switch (figura) {
        case "cuadrado":
            resultado = op_clase.cuadrado(3);
            break;
        case "rectangulo":
            resultado = op_clase.rectangulo(2, 4);
            break;
        case "circulo":
            resultado = op_clase.circulo(8);
            break;
    }
    res.json({"Tipo de operación": operacion, "Figura": figura, "Resultado": resultado});
});



app.listen(PORT, ()=>{
    console.log(`Server On! http://localhost:${PORT}`);
});