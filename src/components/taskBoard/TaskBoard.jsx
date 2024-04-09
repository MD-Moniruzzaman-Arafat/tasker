import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import Search from "./Search";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "learn react",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(task) {
    const deleteTask = tasks.filter((t) => t.id !== task.id);
    setTasks(deleteTask);
  }

  function handleAllDeleteTask() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFav(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return;
        }
      })
    );
  }

  function handleSearchTerm(searchText) {
    console.log(searchText);
    const findTask = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setTasks([...findTask]);
  }

  return (
    <>
      {showModal && (
        <AddTaskModal
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onCloseModal={handleCloseModal}
        />
      )}
      {/* <!-- Begin Table --> */}
      <section className="mb-20" id="tasks">
        <div className="container">
          {/* <!-- Search Box --> */}
          <Search onSearch={handleSearchTerm} />
          {/* <!-- Search Box Ends --> */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddTask={() => setShowModal(true)}
              onDeleteAllTask={handleAllDeleteTask}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onFav={handleFav}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
      {/* <!-- End Table --> */}
    </>
  );
}
