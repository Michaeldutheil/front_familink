import React, { useRef, useState, useEffect } from 'react';
import { format, getDate, set } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Alert, Button, Card, Modal, Tooltip } from 'flowbite-react';
import fail from '../../assets/Icon/avertissement.png';

import send from '../../assets/envoyer.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  postAgenda,
  deleteAgenda,
  clearErrorAgenda,
} from '../../store/reducers/agenda';
import warning from '../../assets/Icon/attention.png';
import AlertBlock from './Components/AlertBlock';
import MainTitle from '../../App/Components/MainTitle/MainTitle';

import './agenda.scss';

function Agenda({ isHomePage }) {
  const rootRef = useRef<HTMLFormElement>(null);
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [showError, setShowError] = useState(false);
  const error = useAppSelector((state) => state.agendas.error) ?? '';

  const [inputRendezvous, setInputRendezvous] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string>('');

  // FOR THE SUCCESS / ERROR
  const [openModalSuccess, setOpenModalSuccess] = useState<string>('scale-0');
  const [openModalError, setOpenModalError] = useState<string>('scale-0');

  // FOR THE DATE MODAL
  const [agendaId, setAgendaId] = useState<number>(0);
  const [textModal, setTextModal] = useState<string>('');
  const [dateModal, setDateModal] = useState<string>('');
  const [hourModal, setHourModal] = useState<string>('');
  const [isActive] = useState(false);

  const dispatch = useAppDispatch();
  const agenda = useAppSelector((state) => state.agendas.agendas);
  const userId = useAppSelector((state) => state.user.userId);
  const familyId = useAppSelector((state) => state.user.familyId);

  // FOR THE DELETE MODAL
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  // FUNCTION TO POST AN APPOINTMENT WITH DATE AND HOUR TRANFORMED
  function formatDate(date: Date): string {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    const dateToSend = `${year}-${month}-${day}`;

    return dateToSend;
  }

  function handleOpenModalDetail(element: any) {
    setOpenModalDetail(!openModalDetail);
    setAgendaId(element.id);
    setTextModal(element.name);
    setDateModal(format(new Date(element.date), 'd MMMM yyyy', { locale: fr }));
    setHourModal(element.starting_time);
  }

  function onClickDay(date: Date) {
    const todayDate = new Date();

    if (date >= todayDate.setHours(0, 0, 0, 0)) {
      setSelectedDate(date);
      setOpenModal(true);
    } else {
      setOpenModalError('scale-1 duration-500 ease-in');
      setTimeout(() => {
        setOpenModalError('scale-0 duration-500 ease-in');
      }, 4000);
      setSelectedDate(undefined);
    }
  }

  function handleConfirmAppointment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorAgenda());
      }, 4200);
    } else {
      const formattedDate = formatDate(selectedDate!);
      const json = {
        date: formattedDate,
        name: inputRendezvous,
        starting_time: selectedHour,
        user_id: userId,
      };
      dispatch(postAgenda(json));
      setOpenModal(false);
      setInputRendezvous('');
      setSelectedHour('');
      setOpenModalSuccess('scale-1 duration-500 ease-in');
      setTimeout(() => {
        setOpenModalSuccess('scale-0 duration-500 ease-in');
      }, 4000);
    }
  }
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorAgenda());
      }, 4200);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error, dispatch]);

  function handleDeleteAppointment(id: number) {
    dispatch(deleteAgenda(id));
    setOpenModalDelete(false);
  }

  // Filter the latest appointments if on the homepage
  const [latestAppointments, setLatestAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (isHomePage) {
      const sortedAgenda = [...agenda].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      const filteredAppointments = sortedAgenda.slice(0, 9);
      const reversedAppointments = filteredAppointments.reverse();
      setLatestAppointments(reversedAppointments);
    } else {
      setLatestAppointments(agenda);
    }
  }, [agenda, isHomePage]);

  let alertMessage = null;
  if (showError) {
    alertMessage = (
      <Alert color="failure" className="p-6">
        <div className="flex">
          <img className="mr-5 w-5" src={fail} alt="" />
          {error}
        </div>
      </Alert>
    );
  } else {
    alertMessage =
      openModalSuccess === 'scale-1 duration-500 ease-in' && !error ? (
        <AlertBlock
          openModal={openModalSuccess}
          color="success"
          status="Succès"
          message="Votre rendez-vous a bien été enregistré !"
        />
      ) : (
        <AlertBlock
          openModal={openModalError}
          color="failure"
          status="Erreur"
          message="Vous ne pouvez pas organiser un rendez-vous dans le passé !"
        />
      );
  }

  // Utilisez la variable alertMessage où vous souhaitez afficher l'alerte

  return (
    <main className="flex h-full w-full flex-col flex-wrap justify-between">
      <MainTitle content="les rendez-vous" />
      {familyId > 1 ? (
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="flex flex-col items-center">
            <i>Cliquer sur un jour pour vous organiser</i>
            <DayPicker
              locale={fr}
              mode="single"
              selected={selectedDate}
              onDayClick={(date) => onClickDay(date)}
            />
            {alertMessage}
          </div>
          <form ref={rootRef} onSubmit={(e) => handleConfirmAppointment(e)}>
            <Modal
              onClose={() => {
                setOpenModal(!openModal);
                setOpenModalError('hidden');
              }}
              root={rootRef.current ?? undefined}
              show={openModal}
              className="modal bg-transparent backdrop-blur-sm"
            >
              <Modal.Header>
                <p className="m-2 text-2xl font-bold uppercase text-black">
                  Pour le {selectedDate?.toLocaleDateString()}
                </p>
              </Modal.Header>
              <Modal.Body className="text-black">
                <div className="relative z-0  flex w-full items-center overflow-x-hidden">
                  <input
                    required
                    value={inputRendezvous}
                    type="text"
                    id="Ajouter un rendez vous"
                    className="peer mt-2 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm text-gray-900  focus:outline-none focus:ring-0"
                    onChange={(e) => setInputRendezvous(e.target.value)}
                  />
                  <label
                    htmlFor="Ajouter un evenement"
                    className="absolute top-3 -z-10 mt-2 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 "
                  >
                    Ajouter un evenement
                  </label>
                  <button type="submit">
                    <img className={`send h-5 w-5 `} src={send} alt="" />
                  </button>
                </div>
                <input
                  className="mt-2"
                  required
                  value={selectedHour}
                  type="time"
                  onChange={(e) => setSelectedHour(e.target.value)}
                />
              </Modal.Body>
            </Modal>
          </form>
          <div className=" flex flex-wrap justify-center gap-3">
            {latestAppointments !== undefined &&
              latestAppointments.map((element: any) => {
                return (
                  <Tooltip
                    key={element.id}
                    className={`flex items-center justify-center ${
                      isActive ? 'active' : ''
                    }`}
                    content="Cliquez pour aggrandir ou supprimer"
                  >
                    <Card
                      style={{ backgroundColor: '#E0DEDB' }}
                      onClick={() => handleOpenModalDetail(element)}
                      className="my-2"
                      key={element.id}
                    >
                      <div className="flex">
                        <p
                          className="mr-2"
                          style={{
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          Vous avez <b>{element.name}</b> le{' '}
                          {format(new Date(element.date), 'dd MMMM yyyy', {
                            locale: fr,
                          })}{' '}
                          à {element.starting_time}
                        </p>
                      </div>
                    </Card>
                  </Tooltip>
                );
              })}
          </div>
        </div>
      ) : (
        <p className="text-center">
          Vous devez être connecté à une famille pour pouvoir ajouter un
          rendez-vous.
        </p>
      )}
      <Modal
        className="modal bg-transparent backdrop-blur-sm"
        show={openModalDetail}
      >
        <div className="p-5">
          <p className="m-2 mb-5 text-black">
            Vous avez <b>{textModal}</b> le {dateModal} à {hourModal}
          </p>
          <div className="flex gap-3">
            <Button
              color="failure"
              onClick={() => {
                setOpenModalDelete(!openModalDelete);
                setOpenModalDetail(false);
              }}
            >
              Supprimer
            </Button>
            <Button
              type="button"
              className="bg-familink-black"
              onClick={() => setOpenModalDetail(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenModalDelete(!openModalDelete)}
        show={openModalDelete}
        size="md"
        className="modal bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className=" text-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              <img src={warning} alt="" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes vous sûr de vouloir supprimer ce rendez-vous ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleDeleteAppointment(agendaId)}
                color="failure"
              >
                Oui, j&apos;en suis sûr
              </Button>
              <Button
                onClick={() => setOpenModalDelete(!openModalDelete)}
                color="gray"
                className="bg-familink-black hover:text-slate-400"
              >
                Non, Revenir en arrière
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default Agenda;
