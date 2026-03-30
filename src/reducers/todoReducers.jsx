import { v4 as uuidv4 } from "uuid";
export default function todoReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        description: "",
        isCompleted: false,
      };
      const setTodoslist = [...currentTodos, newTodo];

      localStorage.setItem("todos", JSON.stringify(setTodoslist));
      return setTodoslist;
    }
    case "deleted": {
      const todosUpdate = currentTodos.filter((t) => {
        if (t.id == action.payload.id) {
          return false;
        } else {
          return true;
        }
      });

      localStorage.setItem("todos", JSON.stringify(todosUpdate));
      return todosUpdate;
    }
    case "update": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            description: action.payload.description,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const strogeTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return strogeTodos;
    }
    case "toggledCompleted":{
         const updateTodos = currentTodos.map((t) => {
      if (t.id == action.payload.id) {
         const updatedTodo = {
            ...t ,
            isCompleted: !t.isCompleted,

         };
         return updatedTodo;
        
      }
      return t;
    });

  
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    return updateTodos;
    
    }
    default: {
      throw Error("Unknow Action " + action.type);
    }
  }
//   return [];
}
