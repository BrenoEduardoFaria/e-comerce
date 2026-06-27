type QuantityStepperProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export function QuantityStepper({ quantity, onChange }: QuantityStepperProps) {
  return (
    <div className="quantity-stepper" aria-label="Quantidade">
      <button type="button" onClick={() => onChange(quantity - 1)} aria-label="Diminuir quantidade">
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={() => onChange(quantity + 1)} aria-label="Aumentar quantidade">
        +
      </button>
    </div>
  );
}
