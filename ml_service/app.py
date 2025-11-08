# Flask API for ML model predictions
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)


# Load the reccomendation model at startup
try:
    reccomendation_model = joblib.load('saved_models/random_forest_Recommendation.joblib')
    print("Reccomendation Model loaded successfully!")
except Exception as e:
    print(f"Error loading reccomendation model: {str(e)}")
    reccomendation_model = None

# # Load the diet model at startup
# try:
#     diet_model = joblib.load('saved_models/random_forest_Diet.joblib')
#     print("Model loaded successfully!")
# except Exception as e:
#     print(f"Error loading model: {str(e)}")
#     diet_model = None


#listens to data from nodeJS backend
@app.route('/flask', methods=['GET'])
def index():
    return jsonify({"message": "Flask server is running"})

@app.route('/flask-predict', methods=['POST'])
def predict():
    try:
        # Ensure the model is loaded for all models
        if reccomendation_model is None:
            return jsonify({"error": "Model not loaded"}), 500

        data = request.json.get('data')
        if not data:
            return jsonify({"error": "No data provided"})
        
        print("Raw Data Received:", data)
        
        # Validate required fields
        required_fields = ['age', 'bmi', 'sex', 'hypertension', 'fitnessGoal']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {missing_fields}"}), 400
        
        # Convert input data to the format expected by the model
        try:
            # convert height and weight from imperial to metric if needed
            if 'units' in data and data['units'] == 'imperial':
                if 'height' in data:
                    data['height'] = float(data['height']) * 0.0254  # inches to meters
                if 'weight' in data:
                    data['weight'] = float(data['weight']) * 0.453592  # pounds to kg


            # generate level based on bmi, align with the data preprocessing during model training which uses 0-3 levels
            if 'bmi' in data:
                bmi = float(data['bmi'])
                if bmi < 18.5:
                    data['level'] = 0  # Underweight
                elif 18.5 <= bmi < 24.9:
                    data['level'] = 1  # Normal weight
                elif 25 <= bmi < 29.9:
                    data['level'] = 2  # Overweight
                else:
                    data['level'] = 3 # Obesity

            

            # Convert boolean/string values to proper format
            processed_data = {
                'sex': 1 if data['sex'] == 'male' else 0,  # Assuming male=1, female=0
                'age': float(data['age']),
                'height': float(data['height']),
                'weight': float(data['weight']),
                'hypertension': 1 if data['hypertension'] == 'yes' else 0,
                'diabetes': 1 if data['diabetes'] == 'yes' else 0,
                'bmi': float(data['bmi']),
                'level': float(data['level']),
                'fitnessGoal': 1 if data['fitnessGoal'] == 'gain' else 0 # Assuming gain=1, loss=0
            }
            
            # Create DataFrame with features in correct order
            input_data = pd.DataFrame([processed_data])
            
            # Make prediction
            prediction = reccomendation_model.predict(input_data)
            prediction_proba = reccomendation_model.predict_proba(input_data)
            
            # Get the confidence score (probability of the predicted class)
            confidence = np.max(prediction_proba)
            
            response = {
                "result": prediction[0],  # Get first prediction
                "confidence": float(confidence)
            }
            
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": f"Prediction error: {str(e)}"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500 #return error message with status code of 500 to signal server error


if __name__ == "__main__":
    app.run(port=5000, debug=True) #running on port 5000, use this port to connect to in node 