import React, { useState } from 'react'
import '../pagestyle/FormStyle.css';

const Recipe = () => {
  const [formData, setFormData] = useState({
    recipe: ''
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
      recipe: ''
    });
  };
  
  return (
    <div className='container'>
      <h3>Enter an ingredient or dish to discover recipe ideas</h3>

      <div className='form'>
        <form onSubmit={handleSubmit}>

          <div className='form-row'>
            <label>Search</label>
            <input
              type="text"
              name="recipe"
              value={formData.recipe}
              placeholder="e.g. chicken tacos"
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
              Find Recipes
            </button>
          </div>

        </form>
      </div>


    </div>
  )
}

export default Recipe
