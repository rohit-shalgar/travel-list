import { useState } from "react";

export function Form({onAddItem}){
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