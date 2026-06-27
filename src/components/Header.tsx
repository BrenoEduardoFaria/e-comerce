import type { Page } from "../types";

type HeaderProps = {
  currentPage: Page;
  cartCount: number;
  onNavigate: (page: Page) => void;
};

const links: Array<{ label: string; page: Page }> = [
  { label: "Inicio", page: "home" },
  { label: "Catalogo", page: "catalog" },
  { label: "Sobre", page: "about" },
  { label: "Contato", page: "contact" },
];

export function Header({ currentPage, cartCount, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={() => onNavigate("home")}>
        <span className="brand-mark">FV</span>
        <span>
          <strong>Feira Viva</strong>
          <small>Produtos organicos</small>
        </span>
      </button>

      <nav className="main-nav" aria-label="Navegacao principal">
        {links.map((link) => (
          <button
            className={currentPage === link.page ? "nav-link active" : "nav-link"}
            key={link.page}
            type="button"
            onClick={() => onNavigate(link.page)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button className="cart-button" type="button" onClick={() => onNavigate("cart")}>
        <span className="cart-icon" aria-hidden="true">
          Carrinho
        </span>
        <span className="cart-count">{cartCount}</span>
      </button>
    </header>
  );
}
