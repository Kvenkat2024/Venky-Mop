import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load employees from localStorage
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      // Sample data
      const sampleEmployees = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          position: 'Software Engineer',
          department: 'Engineering',
          salary: 75000,
          joinDate: '2022-01-15',
          phone: '555-0101'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          position: 'Product Manager',
          department: 'Product',
          salary: 85000,
          joinDate: '2021-06-20',
          phone: '555-0102'
        }
      ];
      setEmployees(sampleEmployees);
      localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    }
  }, []);

  // Save employees to localStorage
  const saveEmployees = (updatedEmployees) => {
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  const addEmployee = (newEmployee) => {
    const employee = {
      ...newEmployee,
      id: Date.now()
    };
    const updated = [...employees, employee];
    saveEmployees(updated);
    setIsFormVisible(false);
    setSelectedEmployee(null);
  };

  const updateEmployee = (updatedEmployee) => {
    const updated = employees.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    saveEmployees(updated); 
    setEditingEmployee(null);
    setSelectedEmployee(updatedEmployee);
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter(emp => emp.id !== id);
      saveEmployees(updated);
      setSelectedEmployee(null);
      setEditingEmployee(null);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="app-header">
        <h1>Employee Management System</h1>
      </header>

      <div className="app-container">
        <div className="left-panel">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setIsFormVisible(true);
              setEditingEmployee(null);
              setSelectedEmployee(null);
            }}
          >
            + Add Employee
          </button>

          <EmployeeList
            employees={filteredEmployees}
            selectedEmployee={selectedEmployee}
            onSelectEmployee={setSelectedEmployee}
          />
        </div>

        <div className="right-panel">
          {isFormVisible && (
            <EmployeeForm
              employee={editingEmployee}
              employees={employees}
              onSubmit={editingEmployee ? updateEmployee : addEmployee}
              onCancel={() => {
                setIsFormVisible(false);
                setEditingEmployee(null);
              }}
            />
          )}

          {!isFormVisible && selectedEmployee && (
            <EmployeeDetail
              employee={selectedEmployee}
              onEdit={() => {
                setEditingEmployee(selectedEmployee);
                setIsFormVisible(true);
              }}
              onDelete={() => deleteEmployee(selectedEmployee.id)}
            />
          )}

          {!isFormVisible && !selectedEmployee && (
            <div className="empty-state">
              <p>Select an employee or add a new one to get started</p>
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
