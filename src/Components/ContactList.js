import React, { useRef } from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';
const ContactList = (props) => {
    const inputEl = useRef("");
    const deleteContacthandler = (id) => {
        props.getContactId(id);
    }
    const contactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} contactListHandler={deleteContacthandler} key={contact.id} />
        )
    });
    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };

    return (
        <div className='ui celled list'>
            <h1>Contact List</h1>
            <div className="ui two column grid">.
                <div className="container d-flex py-4 mx-0">
                    <div className="column px-2">
                        <Link to='/add'>
                            <button className="ui button blue right">Add Contact</button>
                        </Link>
                    </div>
                    <div className="column">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input ref={inputEl} type="text" placeholder='Search Contacts' className='prompt' value={props.term} onChange={getSearchTerm} />
                                <i className="ui celled list"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {contactList.length>0?contactList:<h1>No Contacts available</h1>}
        </div>
    );
}

export default ContactList;