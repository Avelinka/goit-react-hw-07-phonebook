import { useDispatch, useSelector } from 'react-redux';

import { BsSearch } from 'react-icons/bs';
import { SearchLabel, SearchWrap, SearchInput } from './SearchBar.styled';

import { selectFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/filterSlice';

export const SearchBar = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeFilter = evt => {
    dispatch(setFilter(evt.target.value.toLowerCase().trim()));
  };

  return (
    <SearchLabel>
      <SearchWrap>
        <BsSearch size="16" /> Find contacts by name
      </SearchWrap>
      <SearchInput
        name="filter"
        autoComplete="off"
        type="text"
        value={filter}
        onChange={changeFilter}
        placeholder="search"
      />
    </SearchLabel>
  );
};
