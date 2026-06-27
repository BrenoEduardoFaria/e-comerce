import { useState } from "react";
import { ProductVisual } from "../components/ProductVisual";
import { QuantityStepper } from "../components/QuantityStepper";
import type { Page, Product } from "../types";

type DetailsPageProps = {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: Page) => void;
};

export function DetailsPage({ product, onAddToCart, onNavigate }: DetailsPageProps) {
  const [quantity, setQuantity] = useState(1);
  const total = product.price * quantity;

  return (
    <section className="content-band details-band">
      <button className="back-button" type="button" onClick={() => onNavigate("catalog")}>
        Voltar ao catalogo
      </button>

      <div className="details-layout">
        <ProductVisual
          category={product.category}
          color={product.color}
          image={product.image}
          name={product.name}
        />

        <div className="details-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <ul className="details-list">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <div className="purchase-panel">
            <div>
              <span>Valor unitario</span>
              <strong>
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </strong>
            </div>

            <QuantityStepper quantity={quantity} onChange={(value) => setQuantity(Math.max(1, value))} />

            <div>
              <span>Total</span>
              <strong>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
            </div>

            <button
              className="button primary"
              type="button"
              onClick={() => {
                onAddToCart(product.id, quantity);
                onNavigate("cart");
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
