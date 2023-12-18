import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  selectContacts,
  selectVisibleContacts,
  selectError,
  selectIsLoading,
} from '../../redux/selectors';
import { fetchContacts, deleteContact } from '../../redux/operations';

import { Loader } from '../Loader/Loader';

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
  const contacts = useSelector(selectContacts);
  const visibleContacts = useSelector(selectVisibleContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (!contacts.length) {
    return <NoContacts>No contacts added yet.</NoContacts>;
  }

  if (!visibleContacts.length) {
    return (
      <NoContacts>There is no such name in your contacts list.</NoContacts>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <ContactsList>
        {visibleContacts.map(({ name, phone, id }) => {
          return (
            <ContactsListItem key={id}>
              <ItemWrap>
                <ContactsWrap>{name}:</ContactsWrap>
                <ContactsWrap>{phone}</ContactsWrap>
              </ItemWrap>
              <DeleteBtn
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
                <BsFillPersonDashFill size="16" />
              </DeleteBtn>
            </ContactsListItem>
          );
        })}
      </ContactsList>
    </>
  );
};
