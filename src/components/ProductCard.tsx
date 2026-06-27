import type { Product } from "../types";
import { ProductVisual } from "./ProductVisual";

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: string) => void;
  onOpenProduct: (productId: string) => void;
};

export function ProductCard({ product, onAddToCart, onOpenProduct }: ProductCardProps) {
  return (
    <article className="product-card">
      <ProductVisual
        category={product.category}
        color={product.color}
        image={product.image}
        name={product.name}
      />

      <div className="product-card-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <strong>{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-actions">
          <button className="button secondary" type="button" onClick={() => onOpenProduct(product.id)}>
            Detalhes
          </button>
          <button className="button primary" type="button" onClick={() => onAddToCart(product.id)}>
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
