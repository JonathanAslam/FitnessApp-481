import React, { useState } from 'react'
import '../pagestyle/FormStyle.css'

const Workout = () => {
  // State for form values
  const [formData, setFormData] = useState({
    // Add your form fields here
    workoutName: '',
    muscleGroup: '',
    exerciseType: '',
    difficulty: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your calculation logic here
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      workoutName: '',
      muscleGroup: '',
      exerciseType: '',
      difficulty: '',
    });
  };


  return (
    <div className='container'>

      <h3>Search by any combination of fields to find matching exercises.</h3>


      <div className="form">
        <form onSubmit={handleSubmit} noValidate>

          <div className='form-row'>
            <label>Name</label>
            <input
              type="text"
              name="workoutName"
              value={formData.workoutName}
              placeholder="e.g. push-up"
              onChange={handleChange}
              className='form-select'
            />
          </div>

          <div className='form-row'>
            <label>Muscle Group</label>
            <select
              id="muscleGroup"
              name='muscleGroup'
              value={formData.muscleGroup}
              onChange={handleChange}
              className='form-select'
            >
              <option value="">Any</option>
              <option value="abdominals">Abdominals</option>
              <option value="abductors">Abductors</option>
              <option value="adductors">Adductors</option>
              <option value="biceps">Biceps</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="forearms">Forearms</option>
              <option value="glutes">Glutes</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="lats">Lats</option>
              <option value="lower_back">Lower Back</option>
              <option value="middle_back">Middle Back</option>
              <option value="neck">Neck</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="shoulders">Shoulders</option>
              <option value="traps">Traps</option>
              <option value="triceps">Triceps</option>
            </select>
          </div>

          <div className='form-row'>
            <label>Exercise Type</label>
            <select
              id="exerciseType"
              name='exerciseType'
              value={formData.exerciseType}
              onChange={handleChange}
              className='form-select'
            >
              <option value="">Any</option>
              <option value="cardio">Cardio</option>
              <option value="olympic_weightlifting">Olympic Weightlifting</option>
              <option value="plyometrics">Plyometrics</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="strength">Strength</option>
              <option value="stretching">Stretching</option>
              <option value="strongman">Strongman</option>
            </select>
          </div>

          <div>
            <label>Difficulty</label>
            <select
              id="difficulty"
              name='difficulty'
              value={formData.difficulty}
              onChange={handleChange}
              className='form-select'
            >
              <option value="">Any</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
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
              Search
            </button>
          </div>


        </form>
      </div>
    </div>
  )
}

export default Workout
