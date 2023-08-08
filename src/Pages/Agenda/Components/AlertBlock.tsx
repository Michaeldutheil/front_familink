import { Alert } from 'flowbite-react';

function AlertBlock({
  openModal,
  color,
  status,
  message,
}: {
  openModal: string;
  color: string;
  status: string;
  message: string;
}) {
  return (
    <Alert className={`${openModal}`} color={color} withBorderAccent>
      <span>
        <p>
          <span className="font-medium">{status}</span> {message}
        </p>
      </span>
    </Alert>
  );
}

export default AlertBlock;
