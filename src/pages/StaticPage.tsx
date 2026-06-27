type StaticPageProps = {
  type: "about" | "contact" | "privacy";
};

const content = {
  about: {
    label: "Sobre",
    title: "Uma loja virtual de produtos organicos",
    paragraphs: [
      "Este e-commerce foi criado como projeto final de Tecnologias para Interfaces de Aplicacoes Web. A proposta simula uma loja de produtos organicos, com produtos cadastrados em JSON, catalogo interativo, detalhes e carrinho.",
      "O tema escolhido facilita a organizacao de frutas, verduras, graos, cestas e bebidas naturais. O cliente pode navegar pelo catalogo, consultar informacoes e montar um pedido com os produtos desejados.",
    ],
  },
  contact: {
    label: "Contato",
    title: "Fale com a Feira Viva",
    paragraphs: [
      "E-mail: contato@feiravivaorganicos.com",
      "Telefone: (34) 99999-0000",
      "Endereco simbolico: Mercado Municipal, Uberaba, MG",
    ],
  },
  privacy: {
    label: "Privacidade",
    title: "Politica de privacidade",
    paragraphs: [
      "Os dados informados no checkout sao usados apenas para identificar o cliente e organizar o pedido.",
      "Este projeto e academico. Em uma versao de producao, os dados seriam protegidos por regras de seguranca no servidor e por conexao HTTPS.",
    ],
  },
};

export function StaticPage({ type }: StaticPageProps) {
  const page = content[type];

  return (
    <section className="content-band static-page">
      <span className="eyebrow">{page.label}</span>
      <h1>{page.title}</h1>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
