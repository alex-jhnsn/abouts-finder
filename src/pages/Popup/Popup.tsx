import React, { SyntheticEvent, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Search } from "./components/Search";
import { ResultsContainer } from './components/Results';
import './Popup.scss';
import styled from 'styled-components';

interface Link {
  Name: string,
  Url: string
}

const App = styled.div`
  height: 100%;
`;

const Popup = () => {

  const [results, setResults] = useState<Link[]>([]);

  const searchHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;

    if (query) {
      const results = await doSearch(query);
      setResults(results);
    } else {
      setResults([])
    }
  };

  const doSearch = async (search: string): Promise<Link[]> => {
     return new Promise((resolve, reject) => {
      chrome.storage.local.get("data", (result) => {
        resolve(result.data.filter((item: Link)  => 
          item.Name.toLowerCase().includes(search)
        ));
      });
    });
  };

  return (
    <App>
      <Toaster position="bottom-center" />
      <Search ChangeHandler={searchHandler} />
      <ResultsContainer Results={results} />
    </App>
  );
};

export default Popup;
