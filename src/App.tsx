import { useEffect, useMemo, useState } from "react";
import productsData from "./data/products.json";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { DetailsPage } from "./pages/DetailsPage";
import { CartPage } from "./pages/CartPage";
import { StaticPage } from "./pages/StaticPage";
import type { CartItem, Page, Product } from "./types";

const products = productsData as Product[];
const STORAGE_KEY = "tiaw-feira-viva-cart";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? "");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((product) => product.category)))],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, searchTerm]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function navigate(nextPage: Page) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProduct(productId: string) {
    setSelectedProductId(productId);
    navigate("details");
  }

  function addToCart(productId: string, quantity = 1) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);

      if (!existingItem) {
        return [...currentCart, { productId, quantity }];
      }

      return currentCart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
      );
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }

  function removeFromCart(productId: string) {
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? products[0];

  return (
    <div className="app-shell">
      <Header currentPage={page} cartCount={cartCount} onNavigate={navigate} />

      <main>
        {page === "home" && (
          <HomePage
            featuredProducts={products.slice(0, 4)}
            onNavigate={navigate}
            onOpenProduct={openProduct}
            onAddToCart={addToCart}
          />
        )}

        {page === "catalog" && (
          <CatalogPage
            categories={categories}
            category={category}
            products={filteredProducts}
            searchTerm={searchTerm}
            onAddToCart={addToCart}
            onCategoryChange={setCategory}
            onOpenProduct={openProduct}
            onSearchChange={setSearchTerm}
          />
        )}

        {page === "details" && selectedProduct && (
          <DetailsPage product={selectedProduct} onAddToCart={addToCart} onNavigate={navigate} />
        )}

        {page === "cart" && (
          <CartPage
            cart={cart}
            products={products}
            onNavigate={navigate}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
          />
        )}

        {page === "about" && <StaticPage type="about" />}
        {page === "contact" && <StaticPage type="contact" />}
        {page === "privacy" && <StaticPage type="privacy" />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
