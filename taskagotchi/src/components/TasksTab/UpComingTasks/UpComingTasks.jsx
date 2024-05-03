const UpComingTasks = () => {
    
    return (
        <>
            {/* UPCOMING TASKS */}
            <div class="card mt-4">
                <div class="card-header">
                    <h4>Upcoming Tasks</h4>
                </div>
                <div class="card-body">
                    <div class="task">
                        <div class="task-header">
                            <span class="task-title">some urgent task here</span>
                            <span class="task-date">due date: 00/00</span>
                        </div>
                        <div class="task-actions">
                            <button class="btn btn-primary">hard</button>
                        </div>
                    </div>
                    <div class="task">
                        <div class="task-header">
                            <span class="task-title">some urgent task here</span>
                            <span class="task-date">due date: 00/00</span>
                        </div>
                        <div class="task-actions">
                            <button class="btn btn-primary">easy</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpComingTasks