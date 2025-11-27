import { NavLink } from 'react-router-dom';

const iconUrl = (name) => `https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/${name}.webp`;

const navLinks = [
  { to: '/admin', icon: iconUrl('dashboard-icon-s7tmfsy-1764241213180'), text: 'Dashboard' },
  { to: '/admin/employees', icon: iconUrl('employees-icon-wqb7rzx-1764241219075'), text: 'Employees' },
  { to: '/admin/orders', icon: iconUrl('orders-icon-6vcyoba-1764241225358'), text: 'Orders' },
  { to: '/admin/tables', icon: iconUrl('tables-icon-x91293u-1764241231645'), text: 'Table Status' },
  { to: '/admin/sales', icon: iconUrl('sales-icon-2btd77c-1764241237076'), text: 'Sales' },
  { to: '/admin/payroll', icon: iconUrl('payroll-icon-qqe0st9-1764241241963'), text: 'Payroll' },
  { to: '/admin/finance', icon: iconUrl('finance-icon-br7a964-1764241248014'), text: 'P&L' },
];

const NavItem = ({ to, icon, text }) => (
  <li>
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center p-3 my-1 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 ${isActive ? 'bg-green-200 dark:bg-gray-800 font-semibold text-green-800 dark:text-green-300' : ''}`
      }
    >
      <img src={icon} alt={`${text} icon`} className="w-6 h-6 mr-3" />
      <span className="text-sm">{text}</span>
    </NavLink>
  </li>
);

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-green-600">Usimamizi Hub</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {navLinks.map(link => <NavItem key={link.to} {...link} />)}
        </ul>
      </nav>
    </div>
  );
}