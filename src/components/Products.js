import ItemList from "./ItemList"
import { useEffect,useState} from "react"
import axios from "axios";
import Loader from "./UI/Loader";

const Products = ({onAddItem,onRemoveItem,eventState}) =>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);
  

    useEffect(()=>{

        async function fetechItems(){

            try{
               const response=await axios.get('https://shipkart-66798-default-rtdb.firebaseio.com/items.json')
                const data = response.data
                const transformedData = data.map((item,index)=>{
                    return {
                        ...item,
                        quantity:0,
                        id: index
                    }
            })
             setLoader(false);
             setItems(transformedData)
            }
            catch(error){
                setLoader(false);
                console.log("Error: ",error);
                alert("Some error occured");
            }
            finally{
                setLoader(false)
            }
    }

    fetechItems();
    },[])

    useEffect(()=>{
        if(eventState.id>-1){
           if(eventState.type ===1){
            handleAddItem(eventState.id)
           }
           else if(eventState.type===-1){
            handleRemoveItem(eventState.id)
           }
        }
    },[eventState])

    const handleAddItem = id =>{
        
       

        let data=[...items]
        let index = data.findIndex(i => i.id==id)
        data[index].quantity+=1;
        setItems([...data])
         onAddItem(data[index]);        
    }

    const handleRemoveItem = id =>{
     

        let data=[...items]
        let index = data.findIndex(i => i.id==id)

        if(data[index].quantity!==0){
            data[index].quantity-=1;
            setItems([...data])

            onRemoveItem(data[index]);
        }
        
    }
    
    return (
        <>
        <div className="product-list">
          <div className="product-list--wrapper">

          {
            items.map(item=>{
                return (  <ItemList onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data = {item}></ItemList>);
            })
          }

           </div>
        </div>
        {loader && <Loader/>}
        </>
    )
}

export default Products