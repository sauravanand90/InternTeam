import {
    useReducer,
    useState
 } from "react"
 function todoReducer(items, action) {
    
    // action = { type: 'add / delete', payload: 'new todo item'}
    let newTodoList = []
    switch (action.type) {
       case 'add':
          var id = 0
          for(let i = 0; i < items.length; i++) {
             if(id < items[i].id) {
                id = items[i].id
             }
          }
          action.payload.id = id + 1
          newTodoList = [...items, action.payload]
       break;
       case 'delete':
          for(let i = 0; i < items.length; i++) {
             if(items[i].id != action.payload.id) {
                newTodoList.push(items[i])
          }
       }
       break;
       default:
          throw new Error()
    }
    return newTodoList
 }
 function TodoReducerList() {
    const [todo, setTodo] = useState('')
    const [items, dispatch] = useReducer(todoReducer, [])
    const handleInput = (e) => {
       setTodo(e.target.value)
    }
    const handleAddButton = () => {
       dispatch({
          type: 'add',
          payload: {
             todo: todo
          }
       })
       setTodo('')
    }
    const handleDeleteButton = (id) => {
       dispatch({
          type: 'delete',
          payload: {
             id: id
          }
       })
    }
    return (
       <div>
          <p>List of Todo list</p>
          <ul>
             {items && items.map((item) =>
             <li key={item.id}>{item.todo} <span><button onClick={() => 
                handleDeleteButton(item.id)}>Delete</button></span></li>
             )}
             <li><input type="text" name="todo" value={todo} onChange={handleInput} />
                <button onClick={handleAddButton}>Add</button></li>
          </ul>
       </div>
    )
 }
 export default TodoReducerList