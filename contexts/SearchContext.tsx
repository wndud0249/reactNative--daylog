import {createContext, useState} from 'react';

interface SearchContext {
  keyword: string;
  onChangeText: any;
}

const SearchContext = createContext<SearchContext>({} as SearchContext);

export function SearchContextProvider({children}: any) {
  const [keyword, onChangeText] = useState('');
  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
