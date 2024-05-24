import { useState } from "react";
import { Logo } from "./components/logo-component";
import { Form } from "./components/form-component";
import { PackingList } from "./components/PackingList-component";
import { Stats } from "./components/Stats-component";

function App() {
  const [items,setItems] = useState([])

  function handleAddItems(item){
    setItems(items => [...items,item])
  }

  function handleDeleteItems(id){
    setItems(items=> items.filter(item=> item.id !== id))
  }

  function handleOnToggleItem(id){
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
    console.log(items);
  }

  function handlerClearList(){
    const confirmed = window.confirm('Are you sure to delete all the items?')
    if(confirmed)setItems([])
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItem = {handleAddItems}/>
      <PackingList items= {items} onDeleteItem={handleDeleteItems} onToggleItem={handleOnToggleItem} onClearList={handlerClearList}/>
      <Stats items={items}/>
    </div>
  );
}

export default App;
