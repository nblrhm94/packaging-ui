export interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
}

export interface PackageResult {
  items: string[];
  totalWeight: number;
  totalPrice: number;
  courierPrice: number;
}