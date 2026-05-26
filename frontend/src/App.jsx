import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;