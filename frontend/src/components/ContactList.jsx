import React from 'react'

const ContactList = ({contacts, updateContact, updateCallBack}) => {
    const onDelete = async (id) => {
        try{
            const options = {
                method: 'DELETE'
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if(response.status !== 204){
                const data = await response.json()
                alert(data.message)
            }else{
                updateCallBack()
            }
        } catch (error){
            console.error(error)
        }
    }
  return (
    <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                <tr key={contact.id}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                        <button onClick={() => updateContact(contact)}>Edit</button>
                        <button onClick={() => onDelete(contact.id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ContactList