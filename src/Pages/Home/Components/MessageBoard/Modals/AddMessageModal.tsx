import { useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';

import send from '../../../../../assets/envoyer.png';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import {
  clearErrorMessage,
  postMessage,
} from '../../../../../store/reducers/message';

import './modal.scss';

function AddMessageModal({
  addModal,
  setAddModal,
  setShowError,
  error,
}: {
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  showError: boolean;
  error: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const userId = useAppSelector((state) => state.user.userId) ?? 0;
  const userName = useAppSelector((state) => state.user.pseudo) ?? 0;

  const handleAddMessage = async (
    event: React.FormEvent<HTMLButtonElement>,
    message: string,
    userId: number,
    userName
  ) => {
    event.preventDefault();
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorMessage());
      }, 3000);
      setAddModal(!addModal);
    } else {
      const messageData = {
        content: message,
        user_id: userId,
        userName,
      };
      await dispatch(postMessage(messageData));
      setMessage('');
      setAddModal(!addModal);
    }
  };

  return (
    <div ref={rootRef}>
      <Modal
        onClose={() => setAddModal(!addModal)}
        show={addModal}
        className="modal bg-transparent backdrop-blur-sm"
        root={rootRef.current ?? undefined}
      >
        <Modal.Header style={{ backgroundColor: '#e0dedb' }}>
          <p className="text-2xl font-bold">Ajouter un message</p>
        </Modal.Header>
        <Modal.Body
          className=" text-black"
          style={{ backgroundColor: '#e0dedb' }}
        >
          <div className="relative z-0  flex w-full items-center overflow-x-hidden">
            <input
              type="text"
              id="Ajouter un message"
              className="peer mt-2 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm text-gray-900  focus:outline-none focus:ring-0"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <label
              htmlFor="Ajouter un message"
              className="absolute top-3 -z-10 mt-2 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 "
            >
              Ajouter un message
            </label>
            <button
              type="button"
              onClick={(event) =>
                handleAddMessage(event, message, userId, userName)
              }
            >
              <img className={`send h-5 w-5 `} src={send} alt="" />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddMessageModal;
