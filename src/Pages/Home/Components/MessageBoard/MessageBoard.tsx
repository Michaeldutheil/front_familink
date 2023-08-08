import { useEffect, useState } from 'react';

import { Alert, Button, Card } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import AddMessageModal from './Modals/AddMessageModal';
import {
  clearErrorMessage,
  deleteMessage,
} from '../../../../store/reducers/message';
import fail from '../../../../assets/Icon/avertissement.png';
import MainTitle from '../../../../App/Components/MainTitle/MainTitle';

function MessageBoard() {
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  const error = useAppSelector((state) => state.messages.error) ?? '';
  const newMessage = useAppSelector((state) => state.messages?.messages);
  const userName = useAppSelector((state) => state.user.pseudo);
  const familyId = useAppSelector((state) => state.user.familyId);

  const handleDeleteMessage = (messageId) => {
    if (!error) {
      dispatch(deleteMessage(messageId));
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorMessage());
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error, dispatch]);

  const [addModal, setAddModal] = useState(false);

  const toReturn =
    newMessage &&
    newMessage.map((message) => {
      return (
        <Card
          className=""
          key={message.message_id}
          style={{ backgroundColor: '#e0dedb' }}
        >
          <div className="relative flex w-64 flex-col">
            <p className="text-lg capitalize">
              &quot;{message.message_content}&quot;
            </p>
            {message.pseudo === undefined ? (
              <i className="self-end text-sm">par {userName}</i>
            ) : (
              <i className="self-end text-sm">par {message.pseudo}</i>
            )}
            {(userName === message.pseudo || message.pseudo === undefined) && (
              <Button
                className="absolute -right-0 -top-5 "
                color="failure"
                size="xs"
                onClick={() => handleDeleteMessage(message.message_id)}
              >
                x
              </Button>
            )}
          </div>
        </Card>
      );
    });

  return (
    <>
      <MainTitle content="La message board" />
      <article className="message-board relative">
        {familyId > 1 ? (
          <Button
            className="lg:float-right lg:w-fit"
            size="xs"
            color="dark"
            onClick={() => setAddModal(!addModal)}
          >
            +
          </Button>
        ) : (
          <p className="text-center">
            Vous devez être connecté à une famille pour pouvoir ajouter un
            message.
          </p>
        )}

        <section className="flex flex-wrap justify-center gap-5">
          {toReturn}
        </section>
        <AddMessageModal
          setShowError={setShowError}
          showError={showError}
          addModal={addModal}
          setAddModal={setAddModal}
          error={error}
        />
        {showError && (
          <Alert color="failure" className="absolute bottom-0 right-0 p-6">
            <div className="flex">
              <img className="mr-5 w-5" src={fail} alt="" />
              {error}
            </div>
          </Alert>
        )}
      </article>
    </>
  );
}

export default MessageBoard;
