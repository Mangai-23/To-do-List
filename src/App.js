import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect} from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
function App() {
  const API_URL ="http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
const [search,setSearch] =useState('')
const [newerror, setNewError] = useState(null);
const [isLoad, setIsLoad] = useState(true);
//Function is update the Local Storage

// const updateStore = (listItems) =>
// {
//   setItems(listItems)
//   //localStorage.setItem("todo_List" , JSON.stringify(listItems))
// }

useEffect(()=>{
  //JSON.parse(localStorage.getItem('todo_List'))
  const fetchItems = async () => {
    try{
      const res= await fetch(API_URL);
      //console.log(res);
      if(!res.ok) throw Error("Data fetch error");
      const listItems = await res.json();
      //console.log(listItems);
      setItems(listItems);
      setNewError(null);
    }
    catch(err){
      // console.log(err.stack)
      setNewError(err.message);
    }
    finally{
      setIsLoad(false)
    }
  }

  setTimeout(() =>{
    (async () => await fetchItems())();
  },2000)
  
},[]) 

const addItem = async (item) => {
  const id =items.length ? items[items.length - 1].id +1 : 1;
  console.log(id);
  const addNewItem ={id,checked:false, item}
  const listItems =[...items,addNewItem]
  setItems(listItems)
  const postOptions = {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addNewItem)
  }
   const result = await apiRequest(API_URL, postOptions);
   if(result)
   {
    setNewError(result)
   }
}
const handleCheck = async(id) => {
  const listItems = items.map((item) => item.id === id ? {...item, checked:!item.checked} : item)
  setItems(listItems)
   const myitem = listItems.filter((item) => item.id === id)
   const updateOptions = {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({checked:myitem[0].checked})
  }
   const requrl =  `${API_URL}/${id}`
   const result = await apiRequest(requrl, updateOptions);
   if(result)
   {
    setNewError(result)
   }
}
const handleDelete = async(id) => {
  const listItems = items.filter((item) => item.id !== id)
  setItems(listItems)
   const delOptions = {
    method: 'DELETE',
  }
   const requrl =  `${API_URL}/${id}`
   const result = await apiRequest(requrl, delOptions);
   if(result)
   {
    setNewError(result)
   }
}

const  handleSubmit = (e) =>{
  e.preventDefault();
  if(!newItem) return;  
  console.log(newItem);
  addItem(newItem)
  setNewItem('')
}
  return (
    <div className="App">
        <Header title="To do List"/>
        <AddItem 
          newItem ={newItem}
          setNewItem ={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem 
          search ={search}
          setSearch ={setSearch}
        />
        <main>
        {isLoad && <p> {`Loading Items...`}</p>}
          {newerror && <p> {`Error: ${newerror}`}</p>}
          {!isLoad && !newerror && <Content 
            items ={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />}
        </main>
        <Footer 
          length = {items.length} 
        />
    </div>
  );
} 

export default App;

