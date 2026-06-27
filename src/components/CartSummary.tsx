import type { CartItem, Product } from "../types";

type CartSummaryProps = {
  cart: CartItem[];
  products: Product[];
};

export function getCartTotal(cart: CartItem[], products: Product[]) {
  return cart.reduce((total, item) => {
    const product = products.find((currentProduct) => currentProduct.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export function CartSummary({ cart, products }: CartSummaryProps) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = getCartTotal(cart, products);

  return (
    <aside className="cart-summary">
      <h3>Resumo do pedido</h3>
      <div className="summary-row">
        <span>Itens</span>
        <strong>{itemCount}</strong>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <strong>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
      </div>
      <p>
        O pedido final pode ser confirmado por contato direto com a loja. Esta tela simula o fluxo
        de compra exigido no projeto.
      </p>
    </aside>
  );
}
