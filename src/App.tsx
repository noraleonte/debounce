import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getModeForResolutionAtIndex } from 'typescript';

const getAutocompleteResults = (query: string): Promise<string[]> => {
  const fruits = [
    'Apple',
    'Mango',
    'Pineapple',
    'Orange',
    'Lemon',
    'Strawberry',
    'BlueBerry',
    'Raspberry',
    'Cranberry',
    'Cucumber',
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
};

const useDebounce = (value: string, time = 250) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    // whenever something changes in the dependency array, useEffect runs again, and the cleanup function clears the previous effect
    return () => {
      clearTimeout(timeOut);
    };
  }, [value, time]);

  return debounceValue;
};

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const debounceQuery = useDebounce(query);

  useEffect(() => {
    (async () => {
      setSuggestions([]);
      if (debounceQuery.length > 0) {
        const data = await getAutocompleteResults(debounceQuery);
        setSuggestions(data);
      }
    })();
  }, [debounceQuery]);

  return (
    <div className='App'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {suggestions.map((suggestion) => (
          <div key={suggestion}>{suggestion}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
