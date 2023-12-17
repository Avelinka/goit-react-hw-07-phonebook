import { useDispatch, useSelector } from 'react-redux';

import { getContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactSlice';

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
      /^[a-zA-Zа-яА-Я' -]+$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Jane Dou'
    )
    .required('Required'),
  number: Yup.string()
    .trim()
    .matches(
      /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      'Please enter a valid phone number. For example 111-11-11'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onAddContact = newContact => {
    const isExist = contacts.some(
      ({ name, number }) =>
        name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    );

    if (isExist) {
      return toast.error(`${newContact.name}: is already in contacts`);
    }

    dispatch(addContact(newContact));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={сontactSchema}
      onSubmit={(values, actions) => {
        onAddContact({ ...values });
        actions.resetForm();
      }}
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
        <Label htmlFor="number">
          <LabelWrap>
            <BsTelephoneFill size="16" />
            Number
          </LabelWrap>
          <Field
            autoComplete="off"
            type="tel"
            id="number"
            name="number"
            placeholder="111-11-11"
            required
          />
          <ErrorMessage name="number" component="span" />
        </Label>
        <AddBtn type="submit">
          Add contact
          <BsFillPersonPlusFill size="16" />
        </AddBtn>
      </Form>
    </Formik>
  );
};
