import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <PackingList/>
      <Stats/>
    </div>
  );
}

function Logo(){
  return <h1>Far Away!</h1>
}

function Form(){
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(event){
    event.preventDefault()
    if(!description) return

    const newItem = {
      description:{description},
      quantity:{quantity},
      id:Date.now()
    }

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

function PackingList(){
  return <div className="list">
        <ul>
          {initialItems.map(
            (item) => <Item item = {item} />
          )}
        </ul>
  </div>
}

function  Item({item}){
  return (
    <li>
      <span style={item.packed ? { textDecoration: '' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats(){
  return <footer className="stats">
          <em>You have X items packed from X items.</em>
        </footer>
}

export default App;
