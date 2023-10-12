
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Fragment, useState } from "react";
import Modal from "./UI/Modal"


const ItemList = ({data,onAdd,onRemove})=>{

  //  const [counter,setCounter] = useState(0);
   const [showModal,setShowModal] = useState(false);

    const increaseCounterByOne = event =>{
       event.stopPropagation()
       onAdd(data.id)
      //  setCounter(counter+1);
    }
 
    const decreaseCounterByOne = event =>{
      event.stopPropagation()
      onRemove(data.id);
      // if(counter===0)return ;
      // if(counter==1){
      //   onRemove(data.id);
      // }
      // setCounter(counter-1);
   }

   const handleModal = () =>{
      setShowModal(previousState => !previousState)
   }
    return (
        <Fragment>
          <div onClick={handleModal} className={"item-card"}>
          <img className={"img-fluid"} src="ProductImage.png" alt ="product image"/>
          <div className={"item-card_information"}>
            <div className={"pricing"}>
              <span>₹{data.discountedPrice}</span>
              <small><strike>₹{data.price}</strike></small>
            </div>  
            <div className={"title"}> 
              <h5>{data.title}</h5>
            </div>
          </div>

          {
            data.quantity<1?
              <button className={"cart-add"} onClick={increaseCounterByOne}>
              <span>Add to cart </span>
              <AiOutlineShoppingCart/>
              </button>
              :
              <div className="cart-addon">
                
                  <button onClick={decreaseCounterByOne}><span>-</span></button>
                  <span>{data.quantity}</span>
                  <button onClick={increaseCounterByOne}><span>+</span></button>
              
              </div>
          }
          </div>
        {showModal && 
          <Modal onClose={handleModal}>
              <div className="item-card__modal">
                  <div className="img-wrap">
                      <img className={"img-fluid"} src="ProductImage.png" alt ="product image"/>
                  </div>
                  <div className="meta">
                       <h3>{data.title}</h3>
                       <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small><strike>₹{data.price}</strike></small>
                        </div>  
                        <p>{data.description}</p>
                                  
                      {
                        data.quantity<1?
                          <button className={"cart-add  card-add__modal"} onClick={increaseCounterByOne}>
                          <span>Add to cart </span>
                          <AiOutlineShoppingCart/>
                          </button>
                          :
                          <div className="cart-addon card-addon__modal">
                            
                              <button onClick={decreaseCounterByOne}><span>-</span></button>
                              <span>{data.quantity}</span>
                              <button onClick={increaseCounterByOne}><span>+</span></button>
                          
                          </div>
                      }
                  
                  </div>
                    
              </div>
          </Modal>
        } 
        </Fragment>
    )
}

export default ItemList;