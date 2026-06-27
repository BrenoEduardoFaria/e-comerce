import type { Page } from "../types";

type FooterProps = {
  onNavigate: (page: Page) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div>
        <strong>Feira Viva Organicos</strong>
        <p>Projeto final de e-commerce com React, TypeScript, catalogo, filtros e carrinho.</p>
      </div>

      <div className="footer-actions">
        <button type="button" onClick={() => onNavigate("catalog")}>
          Catalogo
        </button>
        <button type="button" onClick={() => onNavigate("privacy")}>
          Privacidade
        </button>
      </div>
    </footer>
  );
}
