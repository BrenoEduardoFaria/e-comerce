# Projeto Final TIAW - Feira Viva Organicos

Projeto de comercio eletronico desenvolvido em React com TypeScript para a disciplina Tecnologias para Interfaces de Aplicacoes Web.

O tema escolhido e uma loja virtual de produtos organicos, inspirado nos exemplos de e-commerce do enunciado do professor.

## O que foi implementado

- Pagina inicial com vitrine e chamada para o catalogo.
- Catalogo dinamico consumindo `src/data/products.json`.
- Busca por palavra-chave e filtro por categoria.
- Pagina de detalhes de produto/servico.
- Carrinho de compras com adicionar, remover, atualizar quantidades e calcular total.
- Checkout simulado com validacao de dados de entrega e protocolo de pedido.
- Paginas estaticas de Sobre, Contato e Politica de Privacidade.
- Componentes reutilizaveis: `Header`, `Footer`, `ProductCard`, `QuantityStepper` e `CartSummary`.
- Design responsivo para desktop e mobile.

## Como abrir a versao pronta

Para apresentar ou entregar sem servidor, abra:

```text
dist/index.html
```

O arquivo `index.html` da raiz redireciona automaticamente para `dist/index.html` quando for aberto por `file:///`.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra o endereco exibido no terminal, normalmente `http://127.0.0.1:5173`.

## Como gerar versao de entrega

```bash
npm run build
```

Os arquivos finais serao gerados na pasta `dist`.

Depois do build, compacte a pasta do projeto sem depender do `node_modules`. O professor pode abrir a versao pronta em `dist/index.html` ou rodar o projeto com os comandos acima.

## Estrutura principal

```text
src/
  components/
  data/products.json
  pages/
  types/
  App.tsx
  main.tsx
  styles.css
```

## Explicacao rapida para apresentacao

O arquivo `products.json` guarda os dados dos produtos organicos. O `App.tsx` concentra o estado principal da aplicacao: pagina atual, produto selecionado, filtros e carrinho. As paginas recebem funcoes por propriedades para adicionar produtos, alterar quantidade e navegar entre telas. O carrinho fica salvo no `localStorage`, entao os itens continuam no navegador mesmo apos atualizar a pagina. O checkout finaliza uma simulacao de pedido, limpa o carrinho e mostra um protocolo para demonstrar o fluxo completo.
