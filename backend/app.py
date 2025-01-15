from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from pprint import pprint

app = Flask(__name__)
CORS(app)  # This will allow all cross-origin requests by default

# Adjust BASE_RECRUITU_API to match the correct environment URL (dev, prod, etc.)
BASE_RECRUITU_API = "https://dev-dot-recruit-u-f79a8.uc.r.appspot.com/api"


def filter_dict_keys(data, allowed_keys):
    """
    Return a new dictionary containing only the allowed keys.
    
    Parameters:
    - data (dict): the original dictionary
    - allowed_keys (iterable): keys you want to keep
    
    Example:
        data = {'name': 'Alice', 'age': 30, 'role': 'Engineer'}
        keep = ['name', 'role']
        result = filter_dict_keys(data, keep)
        # result => {'name': 'Alice', 'role': 'Engineer'}
    """
    return {k: data[k] for k in allowed_keys if k in data}

@app.route('/api/professionals', methods=['GET'])
def get_professionals():
    """
    Example endpoint: /api/professionals?previous_company=McKinsey&school=Harvard&current_company=Evercore&current_company=Lazard
    This function fetches data from the RecruitU People API (lateral-recruiting)
    using the same query parameters, then returns the results as JSON.
    """
    print("Running GET /api/professionals")
    # Extract query parameters from the request
    previous_company = request.args.get('previous_company')  # e.g. "McKinsey"
    school = request.args.get('school')                      # e.g. "Harvard"
    current_companies = request.args.getlist('current_company')
    # Note: Flask's request.args.getlist('current_company') will give you an array
    # of all "current_company" query params:
    # e.g. ?current_company=Evercore&current_company=Lazard => ["Evercore", "Lazard"]

    # Build the RecruitU API URL with these query parameters
    # Example:  https://dev-dot-recruit-u-f79a8.uc.r.appspot.com/api/lateral-recruiting?previous_company=McKinsey&school=Harvard&current_company=Evercore&current_company=Lazard
    recruitu_url = f"{BASE_RECRUITU_API}/lateral-recruiting"
    params = {}

    if previous_company:
        params['previous_company'] = previous_company
    if school:
        params['school'] = school
    for cc in current_companies:
        # each company needs to be appended separately
        # "requests" in Python does not have an "append" method like in JS,
        # so we'll handle it manually
        # or we can do:  params.setdefault('current_company', []).append(cc)
        # but let's do it with a simpler approach:
        if 'current_company' not in params:
            params['current_company'] = []
        params['current_company'].append(cc)

    try:
        print("Making request")
        # Make the GET request to the RecruitU People API
        response = requests.get(recruitu_url, params=params, timeout=10)
        response.raise_for_status()  # raise an HTTPError if status != 200
        data = response.json()

        data = data["results"]
        professionals = [prof["document"] for prof in data]
        
        output = []
        keys = ["city", "company_name", "email", "full_name", "id", "linkedin"]
        for prof in professionals: 
            output.append(filter_dict_keys(prof, keys))           
        
        pprint(output)
        return jsonify(output), 200

    except requests.exceptions.RequestException as e:
        # Handle network errors, timeouts, non-2xx status, etc.
        print(f"Error connecting to RecruitU API: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # In production, you'd run this with a proper WSGI server, or behind Gunicorn, etc.
    app.run(debug=True, port=5000)
