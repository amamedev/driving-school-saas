const Card = ({ title, content }) => {
  return (
    <article className="bg-white rounded-lg shadow p-5 w-full">
      <header className="mb-3 text-left">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </header>
      {content}
    </article>
  );
};

export default Card;
