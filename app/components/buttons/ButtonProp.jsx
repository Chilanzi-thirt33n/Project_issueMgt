import { useRouter } from "next/navigation"; // Next.js router

const PropButton = ({ name, link, className }) => {
  const router = useRouter(); // Next.js router hook

  const handleClick = () => {
    router.push(link); // Navigate to the passed `link`
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {name}
    </button>
  );
};

export default PropButton;
