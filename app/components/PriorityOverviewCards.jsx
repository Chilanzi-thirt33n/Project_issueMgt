"use client";

const PriorityOverviewCards = ({ data }) => {
  // Check if the data is empty or undefined
  if (!data || data.length === 0) {
    return (
      <div>
        <p>No priority data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul className="w-full flex flex-row  justify-evenly items-center gap-4">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-center rounded-lg bg-slate-900 p-2 shadow-md text-slate-300 hover:bg-blue-700  w-full"
          >
            <p>{item.name}</p>
            <h3 className="text-3xl font-black">{item.total}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityOverviewCards;
