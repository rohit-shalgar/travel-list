import { useState } from "react";

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

  return (
    <div className="app">
      <Logo/>
      <Form onAddItem = {handleAddItems}/>
      <PackingList items= {items} onDeleteItem={handleDeleteItems} onToggleItem={handleOnToggleItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(){
  return <h1>Far Away!</h1>
}

function Form({onAddItem}){
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(event){
    event.preventDefault()
    if(!description) return

    const newItem = {
      description,
      quantity,
      packed:false,
      id:Date.now()
    }

    onAddItem(newItem)

    setDescription('')
    setQuantity(1)
  }
  
  return (
  <form className="add-form" onSubmit={handleSubmit}>
    <h3 >What do you need for the trip?</h3>
    <select value={quantity} onChange={e => setQuantity(e.target.value)}>
    {Array.from({length:20},(_,i)=>i+1).map((item) => (<option value ={item} key={item}>{item}</option>))}
    </select>
    <input type="text" placeholder="..." value={description} onChange={e => setDescription(e.target.value)}/>
    <button>ADD</button>
  </form>
  )
}

function PackingList({items, onDeleteItem, onToggleItem}){
  return <div className="list">
        <ul>
          {items.map(
            (item) => <Item item = {item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>
          )}
        </ul>
  </div>
}

function  Item({item, onDeleteItem, onToggleItem}){
  const { description, quantity, packed } = item;
  console.log(packed)
  return (
    <li>
      <input type="checkbox" checked={packed} onChange={() =>onToggleItem(item.id)}/>
      <span style={packed ? { textDecoration: '' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({items}){
  if(!items.length)return(
   <footer className="stats">
    <p>
      <em>Start ading items.</em>
    </p>
   </footer>
  )
  const numOfItems = items.length;
  const packed = items.filter(item=> item.packed).length;
  const percPacked = Math.round(packed/numOfItems * 100);

  return <footer className="stats">
          <em>You have {packed} items packed from {numOfItems} items({percPacked}%).</em>
        </footer>
}

export default App;
