import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminProductsPage from "../pages/AdminProductsPage";

export const AppRoutes = () => {
    return (
      <Routes>
        {/* USER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" 
                element={
                <ProtectedRoute>
                    <CheckoutPage />
                </ProtectedRoute>
                } 
          />
        </Route>
        {/* ADMIN */}
        <Route element={<AdminLayout />}>   
          <Route path="/adminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage/>
              </ProtectedRoute>
            }
          />
          <Route path="/adminProducts" element={<AdminProductsPage />} />
        </Route>
        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    );
}