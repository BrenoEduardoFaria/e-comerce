import type { CSSProperties } from "react";

type ProductVisualProps = {
  image: string;
  color: string;
  name: string;
  category: string;
};

const categoryLabels: Record<string, string> = {
  bebidas: "BD",
  cestas: "CS",
  frutas: "FR",
  graos: "GR",
  hortifruti: "HF",
  mercearia: "MC",
};

export function ProductVisual({ image, color, name, category }: ProductVisualProps) {
  if (image.startsWith("/")) {
    return (
      <div className="product-photo">
        <img src={image} alt={name} />
      </div>
    );
  }

  const key = image.toLowerCase();
  const label = categoryLabels[key] ?? category.slice(0, 2).toUpperCase();

  return (
    <div className="product-visual" style={{ "--accent": color } as CSSProperties}>
      <span>{label}</span>
      <small>{category}</small>
    </div>
  );
}
