import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []) 

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:5000/contacts')
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  const openEditModal = (contact) => {
    if (!isModalOpen) return
      setCurrentContact(contact) 
      setIsModalOpen(true)
  }
  
  const onUpdated = () => {
    closeModal()
    fetchContacts()
  }

  return <>
  <ContactList contacts={contacts} updateContact={openEditModal} updateCallBack={onUpdated}/>
  <button onClick={openModal}>Add Contact</button>
  {isModalOpen && <div className='modal'>
    <div className='modal-content'>
      <span onClick={closeModal} className='close'>&times;</span>
      <ContactForm existingContact={currentContact} updateCallBack={onUpdated}/>
    </div>
  </div>
  }
  </>
}

export default App
