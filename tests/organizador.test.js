const { parseLinha } = require("../parser")
const {
    organizarAtendimentos,
    MANHA_FIM,
    REUNIAO_MINIMA,
    REUNIAO_MAXIMA
} = require("../organizador")

test("deve transformar atendimento normal em objeto com duração", () => {
    const resultado = parseLinha("Castração de gato adulto 90min")

    expect(resultado).toEqual({
        nome: "Castração de gato adulto",
        duracao: 90,
        tipo: "NORMAL"
    })
})

test("deve transformar atendimento expresso em duração de 10 minutos", () => {
    const resultado = parseLinha("Aplicação de vacina antirrábica expresso")

    expect(resultado).toEqual({
        nome: "Aplicação de vacina antirrábica",
        duracao: 10,
        tipo: "EXPRESSO"
    })
})

test("não deve ultrapassar o horário final da manhã", () => {
    const atendimentos = [
        { nome: "Cirurgia A", duracao: 120, tipo: "NORMAL" },
        { nome: "Cirurgia B", duracao: 90, tipo: "NORMAL" },
        { nome: "Consulta C", duracao: 60, tipo: "NORMAL" }
    ]

    const resultado = organizarAtendimentos(atendimentos)

    resultado.forEach(consultorio => {
        consultorio.manha.forEach(atendimento => {
            expect(atendimento.fim).toBeLessThanOrEqual(MANHA_FIM)
        })
    })
})

test("deve marcar reunião depois das 17h e antes das 18h", () => {
    const atendimentos = [
        { nome: "Consulta A", duracao: 60, tipo: "NORMAL" },
        { nome: "Consulta B", duracao: 60, tipo: "NORMAL" },
        { nome: "Consulta C", duracao: 60, tipo: "NORMAL" }
    ]

    const resultado = organizarAtendimentos(atendimentos)

    resultado.forEach(consultorio => {
        expect(consultorio.reuniao).toBeGreaterThanOrEqual(REUNIAO_MINIMA)
        expect(consultorio.reuniao).toBeLessThan(REUNIAO_MAXIMA)
    })
})

test("deve abrir novo consultório quando não houver espaço", () => {
    const atendimentos = [
        { nome: "Procedimento A", duracao: 120, tipo: "NORMAL" },
        { nome: "Procedimento B", duracao: 120, tipo: "NORMAL" },
        { nome: "Procedimento C", duracao: 120, tipo: "NORMAL" },
        { nome: "Procedimento D", duracao: 120, tipo: "NORMAL" }
    ]

    const resultado = organizarAtendimentos(atendimentos)

    expect(resultado.length).toBeGreaterThan(1)
})

test("deve organizar todos os atendimentos sem perder nenhum", () => {
    const atendimentos = [
        { nome: "A", duracao: 90, tipo: "NORMAL" },
        { nome: "B", duracao: 45, tipo: "NORMAL" },
        { nome: "C", duracao: 10, tipo: "EXPRESSO" },
        { nome: "D", duracao: 60, tipo: "NORMAL" }
    ]

    const resultado = organizarAtendimentos(atendimentos)

    const totalOrganizado = resultado.reduce((total, consultorio) => {
        return total + consultorio.manha.length + consultorio.tarde.length
    }, 0)

    expect(totalOrganizado).toBe(atendimentos.length)
})