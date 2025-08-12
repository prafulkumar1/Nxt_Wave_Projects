import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (text.trim() === '') return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text }
    ]);
    setText('');
  };

  const updateTodo = () => {
    if (text.trim() === '') return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editId ? { ...todo, text } : todo
      )
    );
    setText('');
    setEditId(null);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editId === id) {
      setEditId(null);
      setText('');
    }
  };

  const startEdit = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    if (todoToEdit) {
      setText(todoToEdit.text);
      setEditId(id);
    }
  };

  return (
    <UserContext.Provider
      value={{
        todos,
        text,
        setText,
        editId,
        addTodo,
        updateTodo,
        deleteTodo,
        startEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
