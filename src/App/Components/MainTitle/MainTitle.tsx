function MainTitle({ content }: { content: string }) {
  return (
    <h1 className="mb-4 border border-white bg-black/80 p-5 text-center font-journal text-xl font-semibold uppercase text-white outline outline-black">
      {content}
    </h1>
  );
}

export default MainTitle;
