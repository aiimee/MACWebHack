import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Pet from '../../components/TasksTab/Pet/Pet'
import ToDo from '../../components/TasksTab/ToDo/ToDo'
import UpComingTasks from '../../components/TasksTab/UpComingTasks/UpComingTasks'
import Character from '../../components/VirtualPet/Character'

const TaskPage = () => {
  return (
    <>
      <NavigationBar />

      <div class='container'>
        <div class='row'>

          {/* LEFT-HAND BOX */}
          <div class='col-md-6'>

            {/* UPCOMING TASKS */}
            <UpComingTasks />

            {/* TODO TASK */}
            <ToDo />
          </div>

          {/* RIGHT-HAND BOX */}
          <div class='col-md-6'>
            {/* PETCOMPONENT? ??? */}
            <Pet />
          </div>
        </div>

        <div>
          <Character />
        </div>

        {/* SHOP */}
        <div class='row'>
          <div class='col-md-12 text-center mt-4'>
            <button class='btn btn-primary btn-lg'>SHOP???</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default TaskPage
