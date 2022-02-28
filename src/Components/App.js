import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import Header from "./Header"
import './App.css'
import AddContact from './AddContact'
import ContactList from "./ContactList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactDetail from './ContactDetail'
import api from '../api/contacts';
import EditContact from './EditContact';

export default function App() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchresults] = useState([]);
    // const LOCAL_CONTACT_KEY = 'contact'

    const addContactHandler = async (contact) => {
        // console.log('addContactHandler');
        const request = {
            id: uuid(),
            ...contact
        }
        console.log(request);

        const response = await api.post("/contacts", request)
        setContacts([...contacts, response.data]);
        // console.log('contacts',contacts);
    }

    const updateContacthandler = async (contact) => {
        console.log('contact===', contact);
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id, name, email } = response.data;
        console.log(response.data);
        setContacts(
            contacts.map((contact) => {
                return contact.id === id ? { ...response.data } : contact;
            })
        )
    }

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        var newContactList = contacts.filter((contact) => {
            return contact.id !== id;
        });
        setContacts(newContactList);
    }

    const retreiveContacts = async () => {
        const response = await api.get('/contacts/');
        return response.data;
    }

    const searchHandler = (searchTerm) => {
        // console.log(searchTerm);
        setSearchTerm(searchTerm);
        console.log('searchTerm===',searchTerm);
        if (searchTerm !== "") {
            const newContactList = contacts.filter((contact) => {
                // console.log(Object.values(contact).join(" "));
                return Object.values(contact)
                    .join(" ").toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            console.log(newContactList);

            setSearchresults(newContactList);
        }
        else {
            setSearchresults(contacts);
        }
    };
    useEffect(() => {
        // var retreiveItems = JSON.parse(localStorage.getItem(LOCAL_CONTACT_KEY));
        console.log('didmount');
        // if(retreiveItems) setContacts(retreiveItems);
        const getAllContacts = async () => {
            const allContacts = await retreiveContacts();
            if (allContacts) setContacts(allContacts);
        }
        getAllContacts();
    }, []);

    useEffect(() => {
        // localStorage.setItem(LOCAL_CONTACT_KEY,JSON.stringify(contacts));
        console.log('onchange',contacts);
    }, [contacts]);


    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path='/' exact render={(props) => (<ContactList {...props} contacts={searchTerm.length<1?contacts:searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />)} />
                    <Route path='/add' exact render={(props) => <AddContact {...props} addContactHandler={addContactHandler} />} />
                    <Route path='/contact/:id' exact component={ContactDetail}></Route>
                    <Route path='/edit' render={(props) => <EditContact {...props} updateContacthandler={updateContacthandler} />} />
                </Switch>
            </Router>
        </div>
    )
}

