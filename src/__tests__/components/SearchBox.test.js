import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchBox from '../../components/SearchBox';

describe('SearchBox', () => {
  let input, inputAction;

  beforeEach(() => {
    inputAction = jest.fn();
    const searchBox = render(
      <SearchBox searchValue={'initial value'} setSearchValue={inputAction} />
    );
    input = searchBox.getByRole('textbox');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('starts with provided value', () => {
    expect(input.value).toBe('initial value');
  });

  it('triggers input action when value changes', () => {
    fireEvent.change(input, { target: { value: 'something else' } });
    expect(inputAction).toHaveBeenCalledTimes(1);
  });

  it('calls the input action with the new value', () => {
    fireEvent.change(input, { target: { value: 'something else' } });
    expect(inputAction).toHaveBeenCalledWith('something else' );
  });
});
