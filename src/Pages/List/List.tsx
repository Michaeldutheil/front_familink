import { useState } from 'react';
import { Card, Checkbox, Label, Button } from 'flowbite-react';
import { Navigate } from 'react-router-dom';

import ModalList from './Components/Modal/ModalList';
import ModalTask from './Components/Modal/ModalTask';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import add from '../../assets/Icon/add.png';
import holidays from '../../assets/Icon/vacances.png';
import todo from '../../assets/Icon/liste-de-controle.png';
import outil from '../../assets/Icon/outil.png';
import corbeille from '../../assets/Icon/corbeille.png';
import caddies from '../../assets/Icon/caddie.png';

import ModalDeleteList from './Components/Modal/ModalDeleteList';
import ModalDeleteTask from './Components/Modal/ModalDeleteTask';
import { updateTask } from '../../store/reducers/lists';
import MainTitle from '../../App/Components/MainTitle/MainTitle';

import './list.scss';

function List() {
  const lists = useAppSelector((state) => state.lists.list);
  const { familyId, role, userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [openDeleteModalList, setOpenDeleteModalList] =
    useState<boolean>(false);
  const [openDeleteModalTask, setOpenDeleteModalTask] =
    useState<boolean>(false);
  const [, setCheckedTasks] = useState<Record<number, boolean>>({});
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: number,
    listId: number
  ) => {
    const isChecked = event.target.checked;
    setCheckedTasks((prevState) => ({
      ...prevState,
      [taskId]: isChecked,
    }));

    // Dispatch the updateTask action
    dispatch(updateTask({ taskId, value: isChecked, listId }));
  };

  return familyId === 1 || familyId === null ? (
    <Navigate to="/home" />
  ) : (
    <main className="relative">
      <MainTitle content="Listes" />
      {role !== 2 && (
        <Button
          className="lg:float-right lg:w-fit"
          size="xs"
          color="dark"
          tabIndex={0}
          onClick={() => setOpenListModal(!openListModal)}
          onKeyDown={() => setOpenListModal(!openListModal)}
        >
          +
        </Button>
      )}
      <div className="flex flex-wrap items-center justify-center">
        {lists.map((list) => (
          <Card
            style={{ backgroundColor: '#e0dedb' }}
            key={list.list_id}
            className="mb-5 mr-3 mt-2 w-1/3 min-w-[300px]"
          >
            <div className=" flex items-center justify-between">
              <div className="flex">
                {list.category_id === 1 && (
                  <img className="mr-3 w-4" src={holidays} alt="" />
                )}
                {list.category_id === 2 && (
                  <img className="mr-3 w-4" src={todo} alt="" />
                )}
                {list.category_id === 3 && (
                  <img className="mr-3 w-4" src={caddies} alt="" />
                )}
                {list.category_id === 4 && (
                  <img className="mr-3 w-4" src={outil} alt="" />
                )}
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {list.list_title}
                </h5>
              </div>

              <div className="flex gap-4">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    setOpenTaskModal(!openTaskModal);
                    setCurrentListId(list.list_id);
                  }}
                  onKeyDown={() => {
                    setOpenTaskModal(!openTaskModal);
                    setCurrentListId(list.list_id);
                  }}
                >
                  <img
                    className="w-5"
                    src={add}
                    alt="+"
                    aria-label="Ajouter une tâche"
                  />
                </div>
                {userId === list.list_user_id && (
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setOpenDeleteModalList(!openDeleteModalList);
                      setCurrentListId(list.list_id);
                    }}
                    onKeyDown={() => {
                      setOpenDeleteModalList(!openDeleteModalList);
                      setCurrentListId(list.list_id);
                    }}
                  >
                    <img
                      className="w-5 hover:cursor-pointer"
                      src={corbeille}
                      alt="Corbeille"
                      aria-label="Supprimer la liste"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {list.task &&
                  list.task.map((newTask) => (
                    <li className="py-3 sm:py-4" key={newTask.task_id}>
                      <div className="flex items-center space-x-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={newTask.task_id}
                              className="text-gray-800"
                              checked={newTask.task_state}
                              onChange={(event) => {
                                setCurrentListId(list.list_id);
                                handleToggle(
                                  event,
                                  newTask.task_id,
                                  list.list_id
                                );
                              }}
                            />
                            <Label
                              className={`m-auto ${
                                newTask.task_state ? 'italic line-through' : ''
                              }`}
                              htmlFor="content_task"
                              aria-label={newTask.task_content}
                            >
                              {newTask.task_content}
                            </Label>
                          </div>
                        </div>
                        {userId === newTask.task_user_id && (
                          <div
                            tabIndex={0}
                            role="button"
                            onClick={() => {
                              setOpenDeleteModalTask(!openDeleteModalTask);
                              setCurrentListId(list.list_id);
                              setCurrentTaskId(newTask.task_id);
                            }}
                            onKeyDown={() => {
                              setOpenDeleteModalTask(!openDeleteModalTask);
                              setCurrentListId(list.list_id);
                              setCurrentTaskId(newTask.task_id);
                            }}
                          >
                            <img
                              className="w-5 hover:cursor-pointer"
                              src={corbeille}
                              alt="Corbeille"
                              aria-label="Supprimer la tâche"
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Card>
        ))}

        <ModalList
          setOpenListModal={setOpenListModal}
          openListModal={openListModal}
        />
        <ModalTask
          openTaskModal={openTaskModal}
          setOpenTaskModal={setOpenTaskModal}
          listId={currentListId}
        />

        <ModalDeleteList
          setOpenDeleteModalList={setOpenDeleteModalList}
          openDeleteModalList={openDeleteModalList}
          listId={currentListId}
        />
        <ModalDeleteTask
          setOpenDeleteModalTask={setOpenDeleteModalTask}
          openDeleteModalTask={openDeleteModalTask}
          taskId={currentTaskId}
          listId={currentListId}
        />
      </div>
    </main>
  );
}

export default List;
