const fs = require("fs")

const { parseLinha } = require("./parser")
const { organizarAtendimentos } = require("./organizador")

// Lê o arquivo de entrada
const texto = fs.readFileSync("atendimentos.txt", "utf-8")

// Separa linhas
const linhas = texto.trim().split("\n")

// Transforma em objetos
const atendimentos = linhas.map(parseLinha)

// Organiza
const resultado = organizarAtendimentos(atendimentos)

// Exibe resultado
resultado.forEach((consultorio, indice) => {

    console.log(`\nConsultório ${indice + 1}`)

    consultorio.forEach(atendimento => {

        console.log(
            `${atendimento.nome} | ${atendimento.tipo} | ${atendimento.inicio} -> ${atendimento.fim}`
        )
    })
})