const fs = require("fs")

const { parseLinha } = require("./parser")
const { organizarAtendimentos } = require("./organizador")

function minutosParaHora(minutos) {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60

    return `${String(horas).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}

const texto = fs.readFileSync("atendimentos.txt", "utf-8")

const linhas = texto
    .trim()
    .split("\n")
    .filter(linha => linha.trim() !== "")

const atendimentos = linhas.map(parseLinha)

const consultorios = organizarAtendimentos(atendimentos)

consultorios.forEach((consultorio, indice) => {
    console.log(`Consultório ${indice + 1}:`)

    consultorio.manha.forEach(atendimento => {
        console.log(
            `${minutosParaHora(atendimento.inicio)} ${atendimento.nome} ${atendimento.duracao}min`
        )
    })

    console.log(`${minutosParaHora(consultorio.higienizacao)} Higienização`)

    consultorio.tarde.forEach(atendimento => {
        console.log(
            `${minutosParaHora(atendimento.inicio)} ${atendimento.nome} ${atendimento.duracao}min`
        )
    })

    console.log(`${minutosParaHora(consultorio.reuniao)} Reunião de encerramento`)
    console.log("")
})

module.exports = {
    minutosParaHora
}