import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, employees, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    joinDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        salary: employee.salary,
        joinDate: employee.joinDate,
      });
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else {
      // Check for duplicate name (excluding current employee if editing)
      const duplicateName = employees.some(
        emp => emp.name.toLowerCase() === formData.name.toLowerCase() && emp.id !== employee?.id
      );
      if (duplicateName) {
        newErrors.name = 'This name is already registered';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else {
      // Check for duplicate email (excluding current employee if editing)
      const duplicateEmail = employees.some(
        emp => emp.email.toLowerCase() === formData.email.toLowerCase() && emp.id !== employee?.id
      );
      if (duplicateEmail) {
        newErrors.email = 'This email is already registered';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      // Check for duplicate phone (excluding current employee if editing)
      const duplicatePhone = employees.some(
        emp => emp.phone === formData.phone && emp.id !== employee?.id
      );
      if (duplicatePhone) {
        newErrors.phone = 'This phone number is already registered';
      }
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Valid salary is required';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        id: employee?.id,
        salary: parseInt(formData.salary),
      });
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h3 className="form-title">
        {employee ? 'Edit Employee' : 'Add New Employee'}
      </h3>

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="position">Position *</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter job position"
        />
        {errors.position && <div className="error">{errors.position}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="department">Department *</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Product">Product</option>
          <option value="Operations">Operations</option>
        </select>
        {errors.department && <div className="error">{errors.department}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="salary">Annual Salary *</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter annual salary"
          min="0"
        />
        {errors.salary && <div className="error">{errors.salary}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="joinDate">Join Date *</label>
        <input
          type="date"
          id="joinDate"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
        />
        {errors.joinDate && <div className="error">{errors.joinDate}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">
          {employee ? 'Update' : 'Add'} Employee
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
