import { useState } from "react";

function App() {
  const [items,setItems] = useState([])

  function handleAddItems(item){
    setItems(items => [...items,item])
  }

  function handleDeleteItems(id){
    console.log(id)
    setItems(items=> items.filter(item=> item.id !== id))
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItem = {handleAddItems}/>
      <PackingList items= {items} onDeleteItem={handleDeleteItems}/>
      <Stats/>
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

    console.log(newItem)
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

function PackingList({items, onDeleteItem}){
  return <div className="list">
        <ul>
          {items.map(
            (item) => <Item item = {item} onDeleteItem={onDeleteItem} key={item.id}/>
          )}
        </ul>
  </div>
}

function  Item({item, onDeleteItem}){
  const { description, quantity, packed } = item;
  return (
    <li>
      <span style={packed ? { textDecoration: '' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats(){
  return <footer className="stats">
          <em>You have X items packed from X items.</em>
        </footer>
}

export default App;
