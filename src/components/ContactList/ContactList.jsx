import { useDispatch, useSelector } from 'react-redux';

import { getContacts, getFilter } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactSlice';

import { BsFillPersonDashFill } from 'react-icons/bs';
import {
  ContactsList,
  ContactsListItem,
  ItemWrap,
  ContactsWrap,
  DeleteBtn,
  NoContacts,
} from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (!visibleContacts.length) {
    return <NoContacts>No contacts added yet.</NoContacts>;
  }

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ContactsList>
      {visibleContacts.map(({ name, number, id }) => {
        return (
          <ContactsListItem key={id}>
            <ItemWrap>
              <ContactsWrap>{name}:</ContactsWrap>
              <ContactsWrap>{number}</ContactsWrap>
            </ItemWrap>
            <DeleteBtn type="button" onClick={() => onDeleteContact(id)}>
              Delete
              <BsFillPersonDashFill size="16" />
            </DeleteBtn>
          </ContactsListItem>
        );
      })}
    </ContactsList>
  );
};
