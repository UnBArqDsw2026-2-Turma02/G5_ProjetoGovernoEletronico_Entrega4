# Grupo 05 — Governo Eletrônico | Entrega 04

- [Documento de Arquitetura de Software](Entrega_4_DAS.md)
- [Passo a passo para executar os códigos no terminal](C%C3%B3digo/README.md)
- [Diagramas PlantUML](C%C3%B3digo/diagramas/)

## Executar a demonstração

Requer **Node.js 22.18 ou superior**. Não é necessário instalar bibliotecas.

```bash
cd "Codigo"
npm start
```

Para executar somente um cenário:

```bash
npm start -- parcial
```

As opções são `deferida`, `parcial`, `indeferida`, `invalida` e `todos`.

Para executar os testes:

```bash
npm test
```

O programa é de terminal e usa dados fictícios em memória. Não abre navegador, não acessa serviços governamentais e não precisa de credenciais.
