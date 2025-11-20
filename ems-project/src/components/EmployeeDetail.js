import React from 'react';

const EmployeeDetail = ({ employee, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(salary);
  };

  return (
    <div className="employee-detail">
      <div className="detail-header">
        <h2>{employee.name}</h2>
        <p>{employee.position}</p>
      </div>

      <div className="detail-field">
        <div className="detail-label">Email</div>
        <div className="detail-value">{employee.email}</div>
      </div>

      <div className="detail-field">
        <div className="detail-label">Phone</div>
        <div className="detail-value">{employee.phone}</div>
      </div>

      <div className="detail-field">
        <div className="detail-label">Department</div>
        <div className="detail-value">{employee.department}</div>
      </div>

      <div className="detail-field">
        <div className="detail-label">Salary</div>
        <div className="detail-value">{formatSalary(employee.salary)}</div>
      </div>

      <div className="detail-field">
        <div className="detail-label">Join Date</div>
        <div className="detail-value">{formatDate(employee.joinDate)}</div>
      </div>

      <div className="detail-actions">
        <button className="btn btn-success" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
