function organizarAtendimentos(atendimentos) {

    atendimentos.sort((a, b) => {

        // EXPRESSOS têm prioridade
        if (a.tipo === "EXPRESSO" && b.tipo !== "EXPRESSO") {
            return -1
        }

        if (b.tipo === "EXPRESSO" && a.tipo !== "EXPRESSO") {
            return 1
        }

        // Depois ordena por horário
        return a.inicio - b.inicio
    })

    const consultorios = []

    for (const atendimento of atendimentos) {

        let colocado = false

        for (const consultorio of consultorios) {

            const ultimoAtendimento =
                consultorio[consultorio.length - 1]

            // Se não houver conflito de horário
            if (ultimoAtendimento.fim <= atendimento.inicio) {

                consultorio.push(atendimento)

                colocado = true

                break
            }
        }

        // Se não conseguiu encaixar
        if (!colocado) {
            consultorios.push([atendimento])
        }
    }

    return consultorios
}

module.exports = {
    organizarAtendimentos
}