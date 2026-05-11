function horaParaMinutos(hora) {
    const [h, m] = hora.trim().split(":").map(Number)
    return h * 60 + m
}

function parseLinha(linha) {

    const limpa = linha.trim().replace("\r", "")

    const [nome, inicio, fim, tipo] =
        limpa.split(",").map(p => p.trim())

    return {
        nome,
        inicio: horaParaMinutos(inicio),
        fim: horaParaMinutos(fim),
        tipo: tipo.toUpperCase()
    }
}

module.exports = {
    parseLinha
}