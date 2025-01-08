import Link from "next/link";

const Navigation = ({ data }) => {
  return (
    <nav className="flex flex-row justify-between items-center bg-white p-4 rounded-xl shadow-l">
      <h2 className="font-bold">Welcom : {data.name || "Admin"}</h2>
      <Link href="/dashboard/Profile">
        {" "}
        <img
          src={data.image || "https://i.imgur.com/8y8j9jL.jpg"}
          alt={data.name || "Admin"}
          className="rounded-full w-10 h-10"
        />
      </Link>
    </nav>
  );
};
export default Navigation;
