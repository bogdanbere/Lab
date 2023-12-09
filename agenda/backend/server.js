import express from "express";
import cors from "cors";
import fs from "fs";

const port = 5050;
const app = express();

app.use(cors());
app.use(express.json());

let lista = [];

const citesteLista = () => {
    const response = fs. readFileSync(`./lista.json`, "utf-8");
    lista = JSON.parse(response);
};

citesteLista();

app.get("/", (req, res) => {
    citesteLista();
    res.status(200).send(lista);
});

app.post("/adaug", (req, res) => {
    const listaNoua = JSON.stringify([...lista, req.body]);
    fs.writeFileSync(`/lista.json`, listaNoua);
    citesteLista();
    res.status(200).send(lista);
});

app.delete("/sterg/:id", (req, res) => {
    const id = req.params.id;
    const listaFiltrata = lista.filter(
        (item) => parseInt(item.id, 10) !== parseInt(id, 10)
    );
    fs.writeFileSync(`./lista.json`, JSON.stringify(listaFiltrata));
    citesteLista();
    res.status(200).send(lista);
});

app.listen(port, () => {
    console.log(`Serverul asteapta comenzi pe portul ${port}`);
});