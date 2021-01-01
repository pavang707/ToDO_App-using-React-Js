import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React,{useState,useEffect,useRef} from 'react'
const App=()=> {
  const firstrender=useRef(true)
  const [inputvalue,setinputvalue]=useState('')
  const [todo,settodo]=useState([])
  const addtodo=(e)=>{
     e.preventDefault();
     if(inputvalue.trim() === "") return;
     settodo([...todo,{
       text:inputvalue,
       id:uuidv4()
     }])
     setinputvalue('')
  }
  const deletetodo=(itemid)=>{
     settodo(todo.filter((item)=>item.id!==itemid))
 }
   useEffect(()=>{
    if(firstrender.current){
      firstrender.current=false;
      
    }
    else{
      localStorage.setItem('ToDo',JSON.stringify([...todo]))
    }
   },[todo])
   useEffect(()=>{
     if(localStorage.getItem("ToDo")!==null){
     const newtodo=localStorage.getItem("ToDo")
     settodo(JSON.parse([...todo,newtodo]))}
   },[])
  return (
    <div className="App">
     <div className="container">
       <form onSubmit={addtodo}>
         <input 
         type="text"
         placeholder="Add To Do"
         value={inputvalue}
         onChange={(e)=>setinputvalue(e.target.value)}
         />
         <button type="submit">Add</button>
        </form>
        {todo.map(todos=>{return(
          <div key={todos.id} className="todo">
            <p>{todos.text}</p>
            <i className="far fa-trash-alt" onClick={()=>deletetodo(todos.id)}></i>
          </div>)
        })}
       </div> 
    </div>
  );
}

export default App;
