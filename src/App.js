import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  const [items, setItems] = useState([
    { id: 1, checked: true, item: 'Learn React' },
    { id: 2, checked: true, item: 'Learn TailwindCss' },
    { id: 3, checked: false, item: 'Learn Node' },
    { id: 4, checked: true, item: 'Learn Express' },
    { id: 5, checked: true, item: 'Learn MongoDB' },
    { id: 6, checked: false, item: 'Learn Mongoose' },
    { id: 7, checked: false, item: 'Learn GraphQL' },
    { id: 8, checked: false, item: 'Learn Apollo' },
    { id: 9, checked: false, item: 'Learn Firebase' },
    { id: 10, checked: true, item: 'Learn AWS' },
  ]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [newError, setNewError] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todo_List'));
    if (storedItems) {
      setItems(storedItems);
    }
    setIsLoad(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('todo_List', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <div className="App">
      <Header title="To do List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoad && <p>{`Loading Items...`}</p>}
        {newError && <p>{`Error: ${newError}`}</p>}
        {!isLoad && !newError && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
