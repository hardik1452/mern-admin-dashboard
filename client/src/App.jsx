import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard/index.jsx";
import Products from "./scenes/products/index.jsx";
import Customer from "./scenes/customers/index.jsx";
import Layout from "./scenes/layout/index.jsx";
import Transactions from "./scenes/transaction/index.jsx";
import Geography from "./scenes/geography/index.jsx";
import Overview from "./scenes/overview/index.jsx";
import { themeSettings } from "./theme";
import Daily from "./scenes/daily/index.jsx";
import Breakdown from './scenes/breakdown/index.jsx';
import Monthly from "./scenes/monthly/index.jsx";
import Admin from './scenes/admin/index.jsx';
import Performance from './scenes/performance/index.jsx'
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
