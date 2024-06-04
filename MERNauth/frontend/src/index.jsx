import React, { useState } from "react";
import { Modal } from "antd";
import { Row, Col } from "antd";
import styled from "styled-components";
import { useSignup } from "./hooks/useSignup";  // Adjust the path as needed

function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occupation, setOccupation] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    registrationNo: '',
    semester: '',
    designation: '',
    qualification: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { signup, error, isLoading } = useSignup();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOccupationChange = (value) => {
    setOccupation(value);
    setFormData({ ...formData, occupation: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.occupation) errors.occupation = 'Occupation is required';
    if (formData.occupation === 'student' && !formData.registrationNo) errors.registrationNo = 'Registration No is required';
    if (formData.occupation === 'student' && !formData.semester) errors.semester = 'Semester is required';
    if (formData.occupation === 'supervisor' && !formData.designation) errors.designation = 'Designation is required';
    if (formData.occupation === 'supervisor' && !formData.qualification) errors.qualification = 'Qualification is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
  
    // Signup
    await signup(formData);
    
    if (!error) {
      setFormData({
        name: '',
        email: '',
        password: '',
        occupation: '',
        registrationNo: '',
        semester: '',
        designation: '',
        qualification: ''
      });
      setIsModalOpen(false); // Close the modal on successful registration
    }
  };

  return (
    <>
   
        <Row justify={"space-between"}>
          <Col>
            <h3>Projects Status</h3>
          </Col>
          <Col>
            <button className="btn" onClick={showModal}>
              Register
            </button>
          </Col>
        </Row>
       
  
  
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onSubmit={handleSubmit}>
          <h4>Registration</h4>
          <div className="flex">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            {formErrors.name && <Error>{formErrors.name}</Error>}
          </div>
          <div className="flex">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {formErrors.email && <Error>{formErrors.email}</Error>}
          </div>
  
          <div className="flex">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {formErrors.password && <Error>{formErrors.password}</Error>}
          </div>
          <div className="flex">
            <label htmlFor="occupation">Occupation</label>
            <select
              name="occupation"
              id="occupation"
              value={occupation}
              onChange={(e) => handleOccupationChange(e.target.value)}
            >
              <option value="">Select Occupation</option>
              <option value="student">Student</option>
              <option value="supervisor">Supervisor</option>
            </select>
            {formErrors.occupation && <Error>{formErrors.occupation}</Error>}
          </div>
          
          {occupation === "student" && (
            <section>
              <div className="flex">
                <label htmlFor="registrationNo">Registration No</label>
                <input
                  type="text"
                  name="registrationNo"
                  id="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleChange}
                  placeholder="Enter Registration No"
                />
                {formErrors.registrationNo && <Error>{formErrors.registrationNo}</Error>}
              </div>
              <div className="flex">
                <label htmlFor="semester">Semester</label>
                <select
                  name="semester"
                  id="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Select Semester</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </select>
                {formErrors.semester && <Error>{formErrors.semester}</Error>}
              </div>
            </section>
          )}

          {occupation === "supervisor" && (
            <section>
              <div className="flex">
                <label htmlFor="designation">Designation</label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter Designation"
                />
                {formErrors.designation && <Error>{formErrors.designation}</Error>}
              </div>
              <div className="flex">
                <label htmlFor="qualification">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="Enter Qualification"
                />
                {formErrors.qualification && <Error>{formErrors.qualification}</Error>}
              </div>
            </section>
          )}

          <section>
            <p>Forgot Password?</p>
          </section>
          <section className="flex">
            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </section>
          {error && <Error>{error}</Error>}
        </Form>
      </Modal>
  </>
  );
}

export default Admin;

const Form = styled.form`
  text-align: center;
  .flex {
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
  }
  label {
    font-size: 16px;
    margin-bottom: 5px;
  }
  input, select {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 10px;
 
`;