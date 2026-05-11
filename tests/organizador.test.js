const { organizarAtendimentos } = require("../organizador")

test("deve separar atendimentos sem conflito em consultórios diferentes", () => {

    const input = [
        {
            nome: "Ana",
            inicio: 540,
            fim: 600,
            tipo: "NORMAL"
        },
        {
            nome: "Bruno",
            inicio: 550,
            fim: 610,
            tipo: "NORMAL"
        }
    ]

    const resultado = organizarAtendimentos(input)

    expect(resultado.length).toBe(2)
})

test("deve reutilizar o mesmo consultório quando não há conflito", () => {

    const input = [
        {
            nome: "Ana",
            inicio: 540,
            fim: 600,
            tipo: "NORMAL"
        },
        {
            nome: "Bruno",
            inicio: 600,
            fim: 650,
            tipo: "NORMAL"
        }
    ]

    const resultado = organizarAtendimentos(input)

    expect(resultado.length).toBe(1)
})

test("deve priorizar expressos na ordenação", () => {

    const input = [
        {
            nome: "Normal",
            inicio: 540,
            fim: 600,
            tipo: "NORMAL"
        },
        {
            nome: "Expresso",
            inicio: 530,
            fim: 550,
            tipo: "EXPRESSO"
        }
    ]

    const resultado = organizarAtendimentos(input)

    // expresso deve vir primeiro no processamento
    expect(resultado[0][0].tipo).toBe("EXPRESSO")
})