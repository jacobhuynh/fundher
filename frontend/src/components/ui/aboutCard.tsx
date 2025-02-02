import Link from "next/link";
import Image from "next/image";

export default function AboutCard(props: {
  id: number;
  stat: string;
  description: string;
}) {
  return (
    <div
      className="relative h-40 flex flex-col p-6 rounded-xl
                justify-center items-center bg-white text-center
                transform transition-transform duration-200 
                hover:shadow-[0_4px_12px_rgba(99,102,241,0.4)]"
    >
      <div className="relative z-10 flex items-center space-x-4 mb-4 justify-center">
        <h3 className="font-bold text-3xl text-indigo-600">{props.stat}</h3>
      </div>
      <p className="relative z-10 text-gray-700">{props.description}</p>
    </div>
  );
}
