import React, { useState } from 'react';
import './App.css';

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    const handleAddTask = () => {
        if (task.trim() === '') {
            alert('Task cannot be empty');
            return;
        }

        if (editIndex !== null) {
            const updatedTasks = tasks.map((t, index) =>
                index === editIndex ? { ...t, text: task } : t
            );
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, { text: task, completed: false }]);
        }
        setTask('');
    };

    const handleEditTask = (index) => {
        setTask(tasks[index].text);
        setEditIndex(index);
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(tasks.length / tasksPerPage)));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>
                {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
            <ul>
                {currentTasks.length === 0 && tasks.length === 0 ? (
                    <li>No tasks available</li>
                ) : (
                    currentTasks.map((t, index) => (
                        <li key={indexOfFirstTask + index}>
                            <span
                                className={t.completed ? 'completed' : ''}
                                style={{
                                    textDecoration: t.completed ? 'line-through' : 'none'
                                }}
                            >
                                {t.text}
                            </span>
                            <button onClick={() => handleEditTask(indexOfFirstTask + index)}>Edit</button>
                            <button onClick={() => handleDeleteTask(indexOfFirstTask + index)}>Delete</button>
                            <button onClick={() => handleToggleComplete(indexOfFirstTask + index)}>
                                {t.completed ? 'Undo' : 'Complete'}
                            </button>
                        </li>
                    ))
                )}
            </ul>
            {tasks.length > 0 && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}>Next</button>
                </div>
            )}
        </div>
    );
};

export default ToDo;
