import { useState } from "react";

const DetailTaskPopup = ({ onClose, onTaskSaved, onTaskDeleted, selectedTask }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(selectedTask ? selectedTask.title : '');
    const [description, setDescription] = useState(selectedTask ? selectedTask.description : '');
    const [startDate, setStartDate] = useState(selectedTask ? selectedTask.startDate : '');
    const [endDate, setEndDate] = useState(selectedTask ? selectedTask.endDate : '');
    const [priority, setPriority] = useState(selectedTask ? selectedTask.priority : '');

    const handleSaveTask = () => {
        const updatedTask = {
            ...selectedTask,
            title,
            description,
            startDate,
            endDate,
            priority,
        };
        onTaskSaved(updatedTask);
        setIsEditMode(false);
    };

    const handleDeleteTask = () => {
        onTaskDeleted(selectedTask.id);
        onClose();
    };

    const handleCloseTaskDetail = (event) => {
        event.stopPropagation();
        onClose();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Task Details</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={(event) => handleCloseTaskDetail(event)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {isEditMode ? (
                    <form>
                        {/* Render form fields for editing task details */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Start Date */}
                        <div className="mb-4">
                            <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">
                                Start Date:
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* End Date */}
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">
                                End Date:
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Priority */}
                        <div className="mb-4">
                            <label htmlFor="priority" className="block text-gray-700 font-semibold mb-2">
                                Priority:
                            </label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>


                        {/* Add other form fields */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSaveTask}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditMode(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        {/* Render task details */}
                        <div className="mb-4">
                            <strong className="block text-gray-700 font-semibold mb-2">Title:</strong>
                            <p className="text-gray-800">{title}</p>
                        </div>
                        <div className="mb-4">
                            <strong className="block text-gray-700 font-semibold mb-2">Description:</strong>
                            <p className="text-gray-800">{description}</p>
                        </div>
                        <div className="mb-4">
                            <strong className="block text-gray-700 font-semibold mb-2">Start Date:</strong>
                            <p className="text-gray-800">{startDate}</p>
                        </div>
                        <div className="mb-4">
                            <strong className="block text-gray-700 font-semibold mb-2">End Date:</strong>
                            <p className="text-gray-800">{endDate}</p>
                        </div>
                        <div className="mb-4">
                            <strong className="block text-gray-700 font-semibold mb-2">Priority:</strong>
                            <p className="text-gray-800">{priority}</p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsEditMode(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteTask}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );


};
export default DetailTaskPopup;