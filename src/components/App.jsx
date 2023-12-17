import { GlobalStyle } from './GlobalStyle';
import { Toaster } from 'react-hot-toast';

import { BsCardList } from 'react-icons/bs';
import { BsBook } from 'react-icons/bs';

import { Main, Wrapper } from './Helper/Layout';
import { HeaderWrap, MainHeader, Header } from './Helper/Headers';
import { ContactForm } from './ContactForm/ContactForm';
import { SearchBar } from './SearchBar/SearchBar';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  return (
    <Main>
      <Wrapper>
        <HeaderWrap>
          <BsBook size="40" />
          <MainHeader>Phonebook</MainHeader>
        </HeaderWrap>
        <ContactForm />

        <HeaderWrap>
          <BsCardList size="28" />
          <Header>Contacts</Header>
        </HeaderWrap>
        <SearchBar />
        <ContactList />
      </Wrapper>

      <GlobalStyle />
      <Toaster />
    </Main>
  );
};
