import { useEffect, useState } from "react";
import "../styles/Shop.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const Shop = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        //transform data to match the defined type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedProducts = data.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
        }));

        setProducts(transformedProducts);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Simple Shop</h1>
        <button
          className="cart-button"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          Cart ({totalItems})
        </button>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <h3>{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart sidebar remains the same */}
        {isCartOpen && (
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button
                className="close-cart"
                onClick={() => setIsCartOpen(false)}
              >
                &times;
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h4>{item.product.title}</h4>
                        <p>${item.product.price.toFixed(2)}</p>
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <h3>Total: ${totalPrice.toFixed(2)}</h3>
                  <button className="checkout-button">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
