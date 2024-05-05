import React, { useState, useContext } from 'react';
import DetailTaskPopup from '../DetailTaskPopup/DetailTaskPopup';
import { useExperience } from '../ExperienceContext/ExperienceProvider';
import { TaskUpdateContext } from '../TaskUpdateContext/TaskUpdateContext';
import './TaskLine.css';

const TaskLine = ({ task, onTaskAdded }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [detailTaskPopUp, setDetailTaskPopUp] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const { triggerUpdate } = useContext(TaskUpdateContext);

    const { addExperience } = useExperience(); // Using the context to manage experience

    // Function to get color based on task priority
    const getTaskPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return '#f27c7c';
            case 'medium':
                return '#93aaff';
            case 'low':
                return '#a8ff93';
            default:
                return 'inherit';
        }
    };

    const handleOpenDetailTaskPopUp = () => {
        setDetailTaskPopUp(true);
        setSelectedTask(task);
    };

    const handleCloseDetailTaskPopUp = () => {
        setDetailTaskPopUp(false);
        setSelectedTask(null);
    };

    const handleCheckboxChange = (checked) => {
        const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (checked && !task.completed) {
            const updatedTasks = currentUser.tasks.map(t =>
                t.id === task.id ? { ...t, completed: true } : t
            );

            const expAmount = task.priority === 'high' ? 10 : task.priority === 'medium' ? 5 : 2;
            addExperience(expAmount);

            currentUser.tasks = updatedTasks;
            localStorage.setItem('loggedInUser', JSON.stringify(currentUser));

            const updatedUsers = users.map(user =>
                user.id === currentUser.id ? currentUser : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            onTaskAdded(); // Notify parent component to refresh task list
            triggerUpdate(); // RERENDER THEE DONE LIST
        }
    };

    const handleTaskDeleted = (taskId) => {
        onTaskAdded(); // Handle task deletion effects
    };

    const handleTaskSaved = (updatedTask) => {
        onTaskAdded(); // Handle task update effects
    };

    return (
        <div className='task-line' onClick={handleOpenDetailTaskPopUp}>
            {detailTaskPopUp && (
                <DetailTaskPopup
                    onClose={handleCloseDetailTaskPopUp}
                    onTaskSaved={handleTaskSaved}
                    onTaskDeleted={handleTaskDeleted}
                    selectedTask={selectedTask}
                />
            )}
            <div
                className='task-checkbox'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(!task.completed);
                }}
            >
                {(isHovered || task.completed) && <span className='text-4xl'>&#10003;</span>}
            </div>
            <div className='task-details'>
                <div className='task-title'>{task.title.length > 20 ? `${task.title.slice(0, 20)}...` : task.title}</div>
                <div className='task-info'>
                    <div className='task-end-date'>due date: {task.endDate}</div>
                    <div className='flex justify-end'>
                        <div
                            className='task-priority inline-block px-2 py-1 rounded text-white'
                            style={{ backgroundColor: getTaskPriorityColor(task.priority) }}
                        >
                            {task.priority}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskLine;


