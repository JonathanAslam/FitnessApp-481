import React, { useState } from 'react';
import '../pagestyle/FormStyle.css';

const Calculator = () => {
    // State for form values
    const [formData, setFormData] = useState({
        units: 'metric',
        age: 25,
        sex: 'female',
        height: '',
        weight: ''
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
            units: 'metric',
            age: 25,
            sex: 'female',
            height: '',
            weight: ''
        });
    };

    return (
        <div className="container">
            <h3>Calculate BMI and BF%</h3>

            <div className="form">
                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-row">
                        <label>Units</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="units"
                                    value="metric"
                                    checked={formData.units === 'metric'}
                                    onChange={handleChange}
                                />
                                Metric (cm, kgs)
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="units"
                                    value="imperial"
                                    checked={formData.units === 'imperial'}
                                    onChange={handleChange}
                                />
                                Imperial (in, lbs)
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            min="1"
                            max="120"
                            value={formData.age}
                            onChange={handleChange}
                            className="form-select"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="sex">Sex</label>
                        <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label htmlFor="height">Height</label>
                        <div className="input-with-unit">
                            <input
                                id="height"
                                name="height"
                                type="number"
                                min="0"
                                step="any"
                                value={formData.height}
                                onChange={handleChange}
                                className='form-select'
                                placeholder="e.g., 172"
                                required
                            />
                            <span className="unit-label">
                                {formData.units === 'metric' ? 'cm' : 'in'}
                            </span>
                        </div>
                    </div>

                    <div className="form-row">
                        <label htmlFor="weight">Weight</label>
                        <div className="input-with-unit">
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                min="0"
                                step="any"
                                value={formData.weight}
                                onChange={handleChange}
                                className='form-select'
                                placeholder="e.g., 68"
                                required
                            />
                            <span className="unit-label">
                                {formData.units === 'metric' ? 'kg' : 'lb'}
                            </span>
                        </div>
                    </div>

                    <div className="form-actions">
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
                            Calculate
                        </button>
                    </div>
                    
                </form>
            </div>

        </div>
    );
};

export default Calculator
