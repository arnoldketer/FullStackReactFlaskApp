from flask import request, jsonify
from config import app, db
from models import Contact

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    contacts_json = [contact.to_json() for contact in contacts]
    return jsonify({"contacts": contacts_json})

@app.route('/create_contact', methods=['POST'])
def create_contact():
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')
    email = request.json.get('email')
    message = request.json.get('message')

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}), 
            400
        )
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email, message=message)
    
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400
    
    return jsonify({"message": "User created"}), 201

@app.route("/update_contact/<int:id>", methods=["PUT"])
def update_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404
    
    contact.first_name = request.json.get('firstName', contact.first_name)
    contact.last_name = request.json.get('lastName', contact.last_name)
    contact.email = request.json.get('email', contact.email)
    contact.message = request.json.get('message', contact.message)
    
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400
    
    return jsonify({"message": "Contact updated"}), 200

@app.route("/delete_contact/<int:id>", methods=["DELETE"])
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404
    
    db.session.delete(contact)
    
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400
    
    return jsonify({"message": "Contact deleted"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Create tables for the models
    app.run(debug=True)