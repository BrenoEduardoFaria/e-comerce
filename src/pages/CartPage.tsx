import { useState, type ChangeEvent, type FormEvent } from "react";
import { CartSummary, getCartTotal } from "../components/CartSummary";
import { QuantityStepper } from "../components/QuantityStepper";
import type { CartItem, Page, Product } from "../types";

type CartPageProps = {
  cart: CartItem[];
  products: Product[];
  onNavigate: (page: Page) => void;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
};

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

type SubmittedOrder = {
  customerName: string;
  itemCount: number;
  protocol: string;
  total: number;
};

const initialCheckoutForm: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

export function CartPage({
  cart,
  products,
  onNavigate,
  onRemove,
  onUpdateQuantity,
  onClearCart,
}: CartPageProps) {
  const [checkoutForm, setCheckoutForm] = useState(initialCheckoutForm);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);

  const items = cart
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item): item is CartItem & { product: Product } => Boolean(item.product));

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = getCartTotal(cart, products);

  function handleCheckoutChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof CheckoutForm;
    setCheckoutForm((currentForm) => ({ ...currentForm, [field]: event.target.value }));
  }

  function handleCheckoutSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    setSubmittedOrder({
      customerName: checkoutForm.name.trim() || "Cliente",
      itemCount,
      protocol: `FV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      total,
    });
    setCheckoutForm(initialCheckoutForm);
    onClearCart();
  }

  if (submittedOrder) {
    return (
      <section className="content-band">
        <div className="empty-state checkout-success">
          <span className="eyebrow">Pedido finalizado</span>
          <h1>Pedido recebido, {submittedOrder.customerName}</h1>
          <p>
            O pedido foi registrado como simulacao academica do e-commerce. Use o protocolo para
            apresentar o fluxo de compra funcionando.
          </p>

          <div className="success-details">
            <div className="success-row">
              <span>Protocolo</span>
              <strong>{submittedOrder.protocol}</strong>
            </div>
            <div className="success-row">
              <span>Itens</span>
              <strong>{submittedOrder.itemCount}</strong>
            </div>
            <div className="success-row">
              <span>Total</span>
              <strong>
                {submittedOrder.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </div>
          </div>

          <div className="hero-actions">
            <button
              className="button primary"
              type="button"
              onClick={() => {
                setSubmittedOrder(null);
                onNavigate("catalog");
              }}
            >
              Continuar comprando
            </button>
            <button className="button secondary" type="button" onClick={() => onNavigate("contact")}>
              Ver contato
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="content-band">
        <div className="empty-state">
          <h1>Carrinho vazio</h1>
          <p>Escolha um produto no catalogo para iniciar o pedido.</p>
          <button className="button primary" type="button" onClick={() => onNavigate("catalog")}>
            Abrir catalogo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="content-band">
      <div className="catalog-heading">
        <div>
          <span className="eyebrow">Carrinho</span>
          <h1>Resumo do pedido</h1>
        </div>
        <button className="button secondary" type="button" onClick={onClearCart}>
          Limpar
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map(({ product, quantity }) => {
            const subtotal = product.price * quantity;

            return (
              <article className="cart-item" key={product.id}>
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>
                    {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} cada
                  </p>
                </div>

                <QuantityStepper
                  quantity={quantity}
                  onChange={(value) => onUpdateQuantity(product.id, value)}
                />

                <strong>{subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>

                <button className="remove-button" type="button" onClick={() => onRemove(product.id)}>
                  Remover
                </button>
              </article>
            );
          })}
        </div>

        <div className="checkout-column">
          <CartSummary cart={cart} products={products} />

          <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <h3>Dados para entrega</h3>
            <label>
              Nome
              <input
                autoComplete="name"
                name="name"
                onChange={handleCheckoutChange}
                placeholder="Seu nome"
                required
                type="text"
                value={checkoutForm.name}
              />
            </label>
            <label>
              E-mail
              <input
                autoComplete="email"
                name="email"
                onChange={handleCheckoutChange}
                placeholder="seuemail@exemplo.com"
                required
                type="email"
                value={checkoutForm.email}
              />
            </label>
            <label>
              Telefone
              <input
                autoComplete="tel"
                name="phone"
                onChange={handleCheckoutChange}
                placeholder="(34) 99999-0000"
                required
                type="tel"
                value={checkoutForm.phone}
              />
            </label>
            <label>
              Endereco de entrega
              <input
                autoComplete="street-address"
                name="address"
                onChange={handleCheckoutChange}
                placeholder="Rua, numero, bairro e cidade"
                required
                type="text"
                value={checkoutForm.address}
              />
            </label>
            <label>
              Observacoes
              <textarea
                name="notes"
                onChange={handleCheckoutChange}
                placeholder="Horario, referencia ou observacoes sobre o pedido"
                rows={4}
                value={checkoutForm.notes}
              />
            </label>
            <button className="button primary" type="submit">
              Finalizar pedido
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
