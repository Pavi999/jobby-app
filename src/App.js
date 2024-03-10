import {useState} from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState('')
  const [editTodoId, setEditTodoId] = useState(null)
  const [editTodoText, setEditTodoText] = useState('')

  const handleAddTodo = () => {
    if (todoInput.trim() !== '') {
      setTodos([
        ...todos,
        {id: Date.now(), text: todoInput, completed: false, changed: 0},
      ])
      setTodoInput('')
    }
  }

  console.log(todos)

  const handleToggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    )
  }

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEditTodo = (id, text) => {
    setEditTodoId(id)
    setEditTodoText(text)
  }

  const handleSaveEdit = () => {
    setTodos(
      todos.map(todo =>
        todo.id === editTodoId
          ? {...todo, text: editTodoText, changed: todo.changed + 1}
          : todo,
      ),
    )
    setEditTodoId(null)
    setEditTodoText('')
  }

  const handleCancelEdit = () => {
    setEditTodoId(null)
    setEditTodoText('')
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={todoInput}
          onChange={e => setTodoInput(e.target.value)}
          placeholder="Enter todo..."
        />
        <button type="button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={e => setEditTodoText(e.target.value)}
                />
                <div>
                  <button type="button" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button type="button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <p className={todo.completed ? 'para completed' : 'para'}>
                  {todo.text}
                </p>
                <span>(Changed {todo.changed} times)</span>
                <div>
                  <button
                    type="button"
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
