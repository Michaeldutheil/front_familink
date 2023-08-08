import mockup from '../../assets/Videos/mockupvideo.mp4';

function Mockup() {
  return (
    <div className="relative mx-auto h-[425px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-700 bg-gray-900 dark:border-gray-800 dark:bg-gray-800">
      <div className="absolute -left-[17px] top-[72px] h-[32px] w-[3px] rounded-l-lg bg-gray-900 dark:bg-gray-800" />

      <div className="h-[400px] w-[272px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800">
        <video
          className="m-auto h-full w-[98%] object-top dark:hidden"
          src={mockup}
          autoPlay
          loop
          muted
        />
      </div>
    </div>
  );
}

export default Mockup;
