import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import contactsActions from "../../redux/contacts/contact-actions";
import s from "./Filter.module.css";

const Filter = ({ filterValue, onFilter }) => {
  return (
    <form className={s.wrapper}>
      <label>
        Find contacts by name{" "}
        <input type="text" value={filterValue} onChange={onFilter} />
      </label>
    </form>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filterValue: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onFilter: (ev) => dispatch(contactsActions.changeFilter(ev.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
