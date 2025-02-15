const CopyRight = ({ data }) => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="copyright flex justify-center items-center">
      <p>
        <span>Copyright © {year} All Rights Reserved</span>{" "}
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 hover:underline"
        >
          {data.name}
        </a>
      </p>
    </div>
  );
};

export default CopyRight;
