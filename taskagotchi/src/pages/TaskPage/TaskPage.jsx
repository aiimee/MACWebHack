import React, { useState } from 'react';
import LevelBar from '../../components/LevelBar/LevelBar'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Done from '../../components/TasksTab/Done/Done'
import Pet from '../../components/TasksTab/Pet/Pet'
import ToDo from '../../components/TasksTab/ToDo/ToDo'
import Character from '../../components/VirtualPet/Character'
import LateTask from '../../components/TasksTab/LateTask/LateTask'

const TaskPage = () => {
  return (
    // MT 20 REMOVE LATER

    <div className="container mx-auto mt-20">
      <div className="flex flex-col md:flex-row">
        {/* LEFT-HAND SECTION */}
        <div className="md:w-1/2 p-4">
          {/* UPCOMING TASKS */}
          <div className="bg-white shadow rounded p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">LATE</h2>
            <LateTask />
          </div>

          {/* TODO TASKS */}
          <div className="bg-white shadow rounded p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">To-Do</h2>
            <ToDo />
          </div>

          {/* DONE */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold mb-2">Done</h2>
            <Done />
          </div>

        </div>



        {/* RIGHT-HAND SECTION */}
        <div className="md:w-1/2 p-4">
          <div className="bg-white shadow rounded p-4">
            <Pet />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-8 p-4">
        {/* LEVEL BAR */}
        <div className="mb-4">
          <LevelBar experiencePoints={30} />
        </div>

        {/* CHARACTER */}
        <div className="mb-4">
          <Character />
        </div>

        {/* SHOP */}
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            SHOP
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskPage
