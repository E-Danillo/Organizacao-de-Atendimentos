function parseLinha(linha) {
    const limpa = linha.trim().replace("\r", "")

    if (limpa === "") {
        return null
    }

    const ehExpresso = limpa.toLowerCase().endsWith("expresso")

    if (ehExpresso) {
        const nome = limpa.replace(/expresso$/i, "").trim()

        return {
            nome,
            duracao: 10,
            tipo: "EXPRESSO"
        }
    }

    const resultado = limpa.match(/^(.*)\s+(\d+)min$/i)

    if (!resultado) {
        throw new Error(`Linha inválida: ${linha}`)
    }

    const nome = resultado[1].trim()
    const duracao = Number(resultado[2])

    return {
        nome,
        duracao,
        tipo: "NORMAL"
    }
}

module.exports = {
    parseLinha
}