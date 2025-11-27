import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout.tsx';
import Dashboard from './admin/pages/Dashboard.tsx';
import Employees from './admin/pages/Employees.tsx';
import Orders from './admin/pages/Orders.tsx';
import Tables from './admin/pages/Tables.tsx';
import Sales from './admin/pages/Sales.tsx';
import Payroll from './admin/pages/Payroll.tsx';
import Finance from './admin/pages/Finance.tsx';

export default function App() {
  return (
    <Router>
      <Toaster richColors />
      <Routes>
        {/* Existing website routes would go here */}
        {/* For now, we focus on the admin dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tables" element={<Tables />} />
          <Route path="sales" element={<Sales />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="finance" element={<Finance />} />
        </Route>
        <Route path="/" element={<div className='h-screen w-full grid place-content-center'>Welcome to Kijani Restaurant. Visit /admin to see the dashboard.</div>} />
      </Routes>
    </Router>
  );
}