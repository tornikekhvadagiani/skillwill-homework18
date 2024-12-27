import  { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const apiBaseUrl = 'https://crudapi.co.uk/todos';

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(apiBaseUrl);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Add task
  const addTask = async (name) => {
    try {
      const response = await axios.post(apiBaseUrl, { name, isCompleted: false });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task
  const updateTask = async (id, updatedFields) => {
    try {
      await axios.patch(`${apiBaseUrl}/${id}`, updatedFields);
      setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedFields } : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>TODO App</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
