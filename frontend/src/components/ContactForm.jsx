import React from 'react'
import { useState } from 'react'

const ContactForm = ({existingContact = {}, updateCallback}) => {

    const [firstName, setFirstName] = useState(existingContact.firstName || '')
    const [lastName, setLastName] = useState(existingContact.lastName || '')
    const [email, setEmail] = useState(existingContact.email || '')
    const [message, setMessage] = useState(existingContact.message || '')

    const updating = Object.entries(existingContact).length !==0

    const onSubmit = async(e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email,
            message
        }

        const url = 'http://127.0.0.1:5000/' + (updating ? `update_contact/${existingContact.id}` : 'create_contact')

        const options = {
            method: updating ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)

        if(response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)


        }else{
            updateCallback()
           
        }
    
    
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='firstName'>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <label htmlFor='lastName'>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <label htmlFor='email'>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor='message'>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <button type='submit'>{updating ? "Update" : "Create"}</button>
        </form>
    </div>
  )
}

export default ContactForm