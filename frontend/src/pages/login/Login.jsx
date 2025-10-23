import React, { useState } from 'react'
import '../pagestyle/FormStyle.css';

const Login = () => {
  // Toggle between login and signup
  const [hasAccount, setHasAccount] = useState(false);

  // State for form values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your calculation logic here
    console.log('Form submitted:', formData);
  };

  // Reset form to initial values
  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
    });


  };
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>

        <h3>{hasAccount ? 'Login' : 'Sign Up'}</h3>

        <button
          onClick={() => setHasAccount(!hasAccount)}
          className="button button-primary"
        >
          {hasAccount ? "Sign Up Here" : " Login Here"}
        </button>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit} noValidate>

          {!hasAccount && (
            <div className="form-row">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className='form-select'
                required
              />
            </div>
          )}

          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='form-select'
              required
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className='form-select'
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="button button-secondary"
            >
              Reset
            </button>

            <button
              type="submit"
              className="button button-primary"
            >
              {hasAccount ? 'Login' : 'Create Account'}
            </button>

          </div>


        </form>
      </div>
    </div>
  )
}

export default Login
