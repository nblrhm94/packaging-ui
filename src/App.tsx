import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Product, PackageResult } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL is not defined. Please check your .env files.");
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(new Set());
  const [packages, setPackages] = useState<PackageResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please ensure the backend server is running.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (productId: number) => {
    const newSelection = new Set(selectedProductIds);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProductIds(newSelection);
  };

  const handlePlaceOrder = async () => {
    if (selectedProductIds.size === 0) {
      alert('Please select at least one item.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setPackages([]);

    try {
      const response = await axios.post<PackageResult[]>(`${API_BASE_URL}/orders/package`, {
        productIds: Array.from(selectedProductIds)
      });
      setPackages(response.data);
    } catch (err) {
      setError('An error occurred while processing your order. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalSelectedPrice = useMemo(() => {
    return products
      .filter(p => selectedProductIds.has(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  }, [products, selectedProductIds]);


  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1>Online Order Packaging</h1>
        <p className="lead">A full-stack solution with React and Spring Boot</p>
      </header>

      <main>
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>Select Products</h3>
            <span className={`badge ${totalSelectedPrice > 250 ? 'bg-danger' : 'bg-success'}`}>
              Selected Total: ${totalSelectedPrice.toFixed(2)}
            </span>
          </div>
          <div className="card-body" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
            {isLoading && <div className="text-center p-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}
            {error && !isLoading && <div className="alert alert-danger">{error}</div>}
            {!isLoading && (
              <ul className="list-group list-group-flush">
                {products.map(product => (
                  <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        id={`product-${product.id}`}
                        checked={selectedProductIds.has(product.id)}
                        onChange={() => handleProductSelect(product.id)}
                      />
                      <label className="form-check-label" htmlFor={`product-${product.id}`}>{product.name}</label>
                    </div>
                    <span className="badge bg-light text-dark rounded-pill">${product.price.toFixed(2)} - {product.weight}g</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card-footer text-end">
            <button
              className="btn btn-primary btn-lg"
              onClick={handlePlaceOrder}
              disabled={isProcessing || selectedProductIds.size === 0}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

        {packages.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-3">Order Result: {packages.length} Package(s)</h2>
            {packages.map((pkg, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="card-header bg-info text-white">
                  <h4>Package {index + 1}</h4>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Items:</strong> {pkg.items.join(', ')}</li>
                  <li className="list-group-item"><strong>Total Weight:</strong> {pkg.totalWeight}g</li>
                  <li className="list-group-item"><strong>Total Price:</strong> ${pkg.totalPrice.toFixed(2)}</li>
                  <li className="list-group-item"><strong>Courier Price:</strong> ${pkg.courierPrice.toFixed(2)}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;