import { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface Todo {
  itemName: string
  done: boolean
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoInput, setNewTodoInput] = useState('')

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos')|| '""')
    if (localTodos) {
      setTodos(localTodos)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  function checkHandler(itemName: string) {
    const changedTodo: Todo = todos.filter(
      (todo: Todo) => todo.itemName === itemName
    )[0]
    changedTodo.done = !changedTodo.done
    setTodos([
      ...todos.filter((todo: Todo) => todo.itemName != itemName),
      changedTodo,
    ])
  }

  function submitHandler(itemName: string) {
    const newItem = {
      itemName,
      done: false,
    }
    setTodos([...todos, newItem])
    setNewTodoInput('')
  }
  
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl'>Minimal Todo List</h1>
      <div className='flex flex-col mt-4 text-xl border-2 rounded-lg p-2 w-full'>
        <h2>Add todo</h2>
        <div className='flex gap-2 mt-1'>
          <Input
            type='text'
            placeholder='New todo'
            value={newTodoInput}
            onChange={(e) => setNewTodoInput(e.target.value)}
            className='text-zinc-900 text-base'
          />
          <Button
            variant='outline'
            type='submit'
            onClick={() => submitHandler(newTodoInput)}
            className='text-zinc-900'>
            Add
          </Button>
        </div>
      </div>
      <div className='flex flex-col mt-4 text-xl border-2 rounded-lg p-2 w-full'>
        <h2 className=' text-xl'>Current todos</h2>
        <div className='flex flex-col items-start my-2'>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.itemName}
                className={cn(
                  'flex items-center gap-2 mt-2 text-sm',
                  todo.done ? 'line-through' : ''
                )}>
                <Checkbox
                  checked={todo.done}
                  onCheckedChange={() => checkHandler(todo.itemName)}
                  className='border-white w-5 h-5 border-2'
                />
                <p>{todo.itemName}</p>
              </div>
            ))
          ) : (
            <p>There is no to-do</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList
