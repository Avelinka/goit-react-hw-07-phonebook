import { useDispatch, useSelector } from 'react-redux';

import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/operations';

import { Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { BsFillPersonFill } from 'react-icons/bs';
import { BsTelephoneFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';

import {
  Form,
  Label,
  LabelWrap,
  Field,
  ErrorMessage,
  AddBtn,
} from './ContactForm.styled';

const сontactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я'. -]+$/,
      'Name may contain only letters, apostrophe, dot, dash and spaces. For example Jane Dou'
    )
    .required('Required'),
  phone: Yup.string()
    .trim()
    .matches(
      /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      'Please enter a valid phone number. For example 111-11-11'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const onAddContact = (newContact, { resetForm }) => {
    const isExistName = contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    const isExistPhone = contacts.some(
      ({ phone }) => phone === newContact.phone
    );

    if (isExistName) {
      return toast.error(`${newContact.name}: is already in contacts`);
    }

    if (isExistPhone) {
      return toast.error(`${newContact.phone}: is already in contacts`);
    }

    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={сontactSchema}
      onSubmit={onAddContact}
    >
      <Form autoComplete="off">
        <Label htmlFor="name">
          <LabelWrap>
            <BsFillPersonFill size="18" />
            Name
          </LabelWrap>
          <Field
            autoComplete="off"
            type="text"
            id="name"
            name="name"
            placeholder="Jane Doe"
            required
          />
          <ErrorMessage name="name" component="span" />
        </Label>
        <Label htmlFor="phone">
          <LabelWrap>
            <BsTelephoneFill size="16" />
            Phone
          </LabelWrap>
          <Field
            autoComplete="off"
            type="tel"
            id="phone"
            name="phone"
            placeholder="111-11-11"
            required
          />
          <ErrorMessage name="phone" component="span" />
        </Label>
        <AddBtn type="submit">
          Add contact
          <BsFillPersonPlusFill size="16" />
        </AddBtn>
      </Form>
    </Formik>
  );
};
