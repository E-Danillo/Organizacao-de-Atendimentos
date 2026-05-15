const MANHA_INICIO = 8 * 60
const MANHA_FIM = 11 * 60 + 30

const TARDE_INICIO = 13 * 60 + 30

const REUNIAO_MINIMA = 17 * 60 + 1
const REUNIAO_MAXIMA = 18 * 60

function criarConsultorio() {
    return {
        manha: [],
        tarde: [],
        proximoHorarioManha: MANHA_INICIO,
        proximoHorarioTarde: TARDE_INICIO,
        higienizacao: MANHA_FIM,
        reuniao: REUNIAO_MINIMA
    }
}

function encaixarNaManha(consultorio, atendimento) {
    const inicio = consultorio.proximoHorarioManha
    const fim = inicio + atendimento.duracao

    if (fim > MANHA_FIM) {
        return false
    }

    consultorio.manha.push({
        ...atendimento,
        inicio,
        fim
    })

    consultorio.proximoHorarioManha = fim

    return true
}

function encaixarNaTarde(consultorio, atendimento) {
    const inicio = consultorio.proximoHorarioTarde
    const fim = inicio + atendimento.duracao

    if (fim >= REUNIAO_MAXIMA) {
        return false
    }

    consultorio.tarde.push({
        ...atendimento,
        inicio,
        fim
    })

    consultorio.proximoHorarioTarde = fim
    consultorio.reuniao = Math.max(consultorio.proximoHorarioTarde, REUNIAO_MINIMA)

    return true
}

function encaixarAtendimento(consultorio, atendimento) {
    if (encaixarNaManha(consultorio, atendimento)) {
        return true
    }

    if (encaixarNaTarde(consultorio, atendimento)) {
        return true
    }

    return false
}

function finalizarConsultorio(consultorio) {
    return {
        manha: consultorio.manha,
        tarde: consultorio.tarde,
        higienizacao: consultorio.higienizacao,
        reuniao: Math.max(consultorio.proximoHorarioTarde, REUNIAO_MINIMA)
    }
}

function organizarAtendimentos(atendimentos) {
    const lista = atendimentos
        .filter(atendimento => atendimento !== null)
        .sort((a, b) => b.duracao - a.duracao)

    const consultorios = []

    for (const atendimento of lista) {
        let colocado = false

        for (const consultorio of consultorios) {
            if (encaixarAtendimento(consultorio, atendimento)) {
                colocado = true
                break
            }
        }

        if (!colocado) {
            const novoConsultorio = criarConsultorio()

            if (!encaixarAtendimento(novoConsultorio, atendimento)) {
                throw new Error(
                    `Atendimento muito longo para caber em uma sessão: ${atendimento.nome}`
                )
            }

            consultorios.push(novoConsultorio)
        }
    }

    return consultorios.map(finalizarConsultorio)
}

module.exports = {
    organizarAtendimentos,
    MANHA_INICIO,
    MANHA_FIM,
    TARDE_INICIO,
    REUNIAO_MINIMA,
    REUNIAO_MAXIMA
}