
import './App.css';
import Products from './components/Products';
import Header from './components/layout/header';
import Subheader from './components/layout/Subheader';
import { useState } from 'react';
import {Switch,Route} from 'react-router-dom'

function App() {

  const [cartItems,setCartItems]=useState([]);
  const [eventQueue,setEventQueue]=useState({
    id:"",
    type:""
  });

  const handleAddItem = item =>{
    let items = [...cartItems]
    let index = items.findIndex(i => i.id === item.id)

    if(index > -1){
        items[index] = item
    }
    else{
        items.push(item)
    }

    setCartItems([...items])
  }

  const handleRemoveItem = item =>{
    let items = [...cartItems]
    let index = items.findIndex(i => i.id === item.id)
    
    if(items[index].quantity === 0){
        items.splice(index, 1)
    }
    else{
      items[index]= item
    }
      setCartItems([...items])
    // setCartItems(cartItems-1);
  }

  const handleEventQueue = (id,type)=>{
     setEventQueue({
      id,
      type
     })
  }

  return (
    <div className="App">
     <Header count={cartItems.length} items={cartItems} onHandleEvent={handleEventQueue}/>
     <Subheader/>
     <Products onAddItem={handleAddItem} onRemoveItem={handleRemoveItem}  eventState={eventQueue} />
    </div>
  );
}

export default App;
