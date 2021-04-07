import React, { Component } from "react";
import { connect } from "react-redux";
import contactsActions from "../../redux/contacts/contact-actions";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name } = this.state;
    const { contacts } = this.props;

    const uniqueContact = contacts.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (uniqueContact) {
      alert(`${name} is already in your list`);
      return;
    }

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.wrapper} onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="number"
            value={number}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => dispatch(contactsActions.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
