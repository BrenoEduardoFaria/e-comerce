import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types";

type CatalogPageProps = {
  products: Product[];
  categories: string[];
  category: string;
  searchTerm: string;
  onAddToCart: (productId: string) => void;
  onCategoryChange: (category: string) => void;
  onOpenProduct: (productId: string) => void;
  onSearchChange: (searchTerm: string) => void;
};

export function CatalogPage({
  products,
  categories,
  category,
  searchTerm,
  onAddToCart,
  onCategoryChange,
  onOpenProduct,
  onSearchChange,
}: CatalogPageProps) {
  return (
    <section className="content-band">
      <div className="catalog-heading">
        <div>
          <span className="eyebrow">Catalogo</span>
          <h1>Escolha o produto</h1>
        </div>
        <strong>{products.length} resultado(s)</strong>
      </div>

      <div className="catalog-tools">
        <label>
          <span>Buscar</span>
          <input
            type="search"
            value={searchTerm}
            placeholder="Nome, categoria ou descricao"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label>
          <span>Categoria</span>
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
            {categories.map((currentCategory) => (
              <option key={currentCategory} value={currentCategory}>
                {currentCategory}
              </option>
            ))}
          </select>
        </label>
      </div>

      {products.length > 0 ? (
        <div className="product-grid catalog-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nenhum produto encontrado</h2>
          <p>Altere a busca ou escolha outra categoria.</p>
        </div>
      )}
    </section>
  );
}
