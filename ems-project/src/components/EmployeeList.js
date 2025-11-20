import React from 'react';

const EmployeeList = ({ employees, selectedEmployee, onSelectEmployee }) => {
  return (
    <ul className="employee-list">
      {employees.length === 0 ? (
        <li style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          No employees found
        </li>
      ) : (
        employees.map((employee) => (
          <li
            key={employee.id}
            className={`employee-item ${selectedEmployee?.id === employee.id ? 'active' : ''}`}
            onClick={() => onSelectEmployee(employee)}
          >
            <div className="employee-name">{employee.name}</div>
            <div className="employee-position">{employee.position}</div>
            <div className="employee-email">{employee.email}</div>
          </li>
        ))
      )}
    </ul>
  );
};

export default EmployeeList;
