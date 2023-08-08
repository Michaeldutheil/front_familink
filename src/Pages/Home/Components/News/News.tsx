import { Card } from 'flowbite-react';
import { useAppSelector } from '../../../../hooks/redux';
import './news.css';
import MainTitle from '../../../../App/Components/MainTitle/MainTitle';

const API_URL = import.meta.env.VITE_API_URL_PICTURES;

function News() {
  const userName = useAppSelector((state) => state.user.pseudo);
  const messages = useAppSelector((state) => state.messages.messages);
  const picture = useAppSelector((state) => state.pictures.pictures);
  const familyId = useAppSelector((state) => state.user.familyId);
  const reversedMessages = messages ? [...messages].reverse() : [];
  const lastTwoMessages = reversedMessages.slice(0, 2);
  const messageToReturn = lastTwoMessages.map((message) => {
    return (
      <Card
        key={message.message_id}
        className="mb-3"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <p className="text-xl">&quot;{message.message_content}&quot;</p>
        {message.pseudo === undefined ? (
          <i className="self-end text-sm">par {userName}</i>
        ) : (
          <i className="self-end text-sm">par {message.pseudo}</i>
        )}
      </Card>
    );
  });

  const latestPicture = picture[picture.length - 1];
  const url = latestPicture ? `${API_URL}/${latestPicture.picture_url}` : null;

  return (
    <>
      <MainTitle content="les infos du jour" />
      {familyId > 1 ? (
        <section className="news mb-8 flex  w-full flex-wrap items-center justify-between gap-5 ">
          <img alt="" className="" src={url} />
          <section className="flex-1 flex-shrink-0 flex-col gap-4">
            {messageToReturn}
          </section>
        </section>
      ) : (
        <p className="text-center">
          Vous devez être connecté à une famille pour pouvoir voir les infos.
        </p>
      )}
    </>
  );
}

export default News;
