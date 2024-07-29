import { useEffect, useState } from "react";

interface Testimonial {
  author: string;
  position: string;
  avatar: string;
  content: string;
}
export default function Testimonials({ data }: { data: Testimonial[] }) {
  let size = data.length;
  let [n, setN] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setN((prevN) => (prevN + 1) % size);
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [size]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="bg-slate-700 px-4 py-2 sm:p-5 rounded-lg shadow-md flex flex-col gap-2 sm:gap-5">
        <div className="text-sm text-slate-50">{data[n].content}</div>
        <div className="flex gap-1 text-slate-50">
          <img
            src={data[n].avatar}
            className="w-6 h-6 sm:w-10 sm:h-10 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center">
            <span className="text-xs sm:text-sm">{data[n].author}</span>
            <span className="text-[0.5rem] sm:text-xs opacity-70">
              {data[n].position}
            </span>
          </div>
        </div>
      </div>
      <div className="items-center justify-center flex gap-2">
        {Array.from({ length: size }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === n ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setN(i)}
          ></div>
        ))}
      </div>
    </div>
  );
  //   return <h1>{data[n].content}</h1>;
}
