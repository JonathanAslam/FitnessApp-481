import React, { useState } from 'react'
import '../pagestyle/FormStyle.css';

const Nutrition = () => {
  const [formData, setFormData] = useState({
    foodConsumed: ''
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
      foodConsumed: ''
    });
  };
  return (
    <div className='container'>
      <h3>Describe what you ate to estimate its nutritional breakdown.</h3>

      <div className='form'>
        <form onSubmit={handleSubmit}>

          <div className='form-row'>
            <label>Food</label>
            <input
              id="foodConsumed"
              name="foodConsumed"
              type="text"
              value={formData.foodConsumed}
              placeholder="e.g. 1 apple and 1 cup of oatmeal"
              onChange={handleChange}
              className='form-select'
            />
          </div>


          <div className='form-actions'>
            <button
              type="button"
              onClick={handleReset}
              className="button button-secondary"
            >
              Reset
            </button>

            {/* no onClick because we handle submit at the form definition above */}
            <button
              type="submit"
              className="button button-primary"
            >
              Analyze
            </button>
          </div>

        </form>
      </div>


    </div>
  )
}

export default Nutrition
