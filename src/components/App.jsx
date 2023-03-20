import { Component } from 'react';
import Form from './Form';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    console.log('Component did mount');

    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({ contacts: savedContacts });
  }

  createUser = data => {
    const newUser = {
      ...data,
    };
    console.log(newUser);
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newUser],
    }));
  };

  handleFilterChange = ({ target }) => {
    this.setState({ filter: target.value });
  };

  checkUser = name => {
    const { contacts } = this.state;

    for (let contact of contacts) {
      if (contact.name === name) {
        alert(`${name} is already in contacts`);
        return false;
      }
    }
  };

  handleDelete = ({ target }) => {
    const { contacts } = this.state;

    const updatedContacts = contacts.filter(
      contact => contact.id !== target.dataset.id
    );

    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <Form createUser={this.createUser} checkUser={this.checkUser}></Form>
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} value={filter}></Filter>
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDelete}
        ></ContactList>
      </div>
    );
  }
}

export default App;
