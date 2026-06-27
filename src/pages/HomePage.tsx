import { ProductCard } from "../components/ProductCard";
import type { Page, Product } from "../types";

type HomePageProps = {
  featuredProducts: Product[];
  onNavigate: (page: Page) => void;
  onOpenProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
};

export function HomePage({
  featuredProducts,
  onNavigate,
  onOpenProduct,
  onAddToCart,
}: HomePageProps) {
  return (
    <>
      <section className="home-band">
        <div className="home-layout">
          <div className="home-copy">
            <span className="eyebrow">E-commerce organico</span>
            <h1>Produtos frescos direto da agricultura familiar</h1>
            <p>
              Monte sua compra com frutas, verduras, graos e cestas selecionadas. O catalogo usa
              dados em JSON, filtros, busca e carrinho com resumo do pedido.
            </p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={() => onNavigate("catalog")}>
                Ver catalogo
              </button>
              <button className="button secondary" type="button" onClick={() => onNavigate("about")}>
                Sobre a loja
              </button>
            </div>
          </div>

          <div className="feature-panel market-panel">
            <div className="market-visual" aria-label="Ilustracao de banca de produtos organicos">
              <span>FV</span>
            </div>
            <div>
              <strong>Feira Viva Organicos</strong>
              <span>Hortifruti, cestas, graos, bebidas naturais e itens de mercearia.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="section-heading">
          <span className="eyebrow">Destaques</span>
          <h2>Destaques da semana</h2>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      </section>
    </>
  );
}
