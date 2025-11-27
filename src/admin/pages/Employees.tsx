import { useState } from 'react';
import { toast } from 'sonner';

const mockEmployees = [
  { id: 1, name: 'Asha Juma', role: 'Manager', email: 'asha.juma@kijanirestaurant.com', phone: '0712345678', salary: 80000 },
  { id: 2, name: 'David Mwangi', role: 'Head Chef', email: 'david.mwangi@kijanirestaurant.com', phone: '0723456789', salary: 65000 },
  { id: 3, name: 'Fatuma Ali', role: 'Waiter', email: 'fatuma.ali@kijanirestaurant.com', phone: '0734567890', salary: 45000 },
  { id: 4, name: 'John Okello', role: 'Waiter', email: 'john.okello@kijanirestaurant.com', phone: '0745678901', salary: 45000 },
];

export default function Employees() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const openModal = (employee = null) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeData = Object.fromEntries(formData.entries());
    employeeData.salary = parseFloat(employeeData.salary);

    if (currentEmployee) {
      // Edit
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? { ...emp, ...employeeData } : emp));
      toast.success('Employee updated successfully!');
    } else {
      // Add
      employeeData.id = employees.length + 1;
      setEmployees([...employees, employeeData]);
      toast.success('Employee added successfully!');
    }
    closeModal();
  };

  const handleDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
    toast.error('Employee has been deleted.');
    closeDeleteModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Employee Management</h2>
        <button onClick={() => openModal()} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Add Employee
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['Name', 'Role', 'Email', 'Phone', 'Salary (KES)', 'Actions'].map(header => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {employees.map(employee => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{employee.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{employee.salary.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(employee)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => openDeleteModal(employee)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input type="text" name="name" id="name" defaultValue={currentEmployee?.name} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                  <input type="text" name="role" id="role" defaultValue={currentEmployee?.role} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" name="email" id="email" defaultValue={currentEmployee?.email} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <input type="tel" name="phone" id="phone" defaultValue={currentEmployee?.phone} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salary (KES)</label>
                  <input type="number" name="salary" id="salary" defaultValue={currentEmployee?.salary} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
             <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Confirm Deletion</h3>
             <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete {employeeToDelete?.name}? This action cannot be undone.</p>
             <div className="flex justify-end space-x-4">
               <button onClick={closeDeleteModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
               <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Delete</button>
             </div>
           </div>
         </div>
      )}
    </div>
  );
}