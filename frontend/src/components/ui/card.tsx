import Link from "next/link";
import Image from "next/image";

export default function FeatureCard(props: {
  id: number;
  icon: string;
  feature: string;
  description: string;
}) {
  return (
    <div className="relative h-40 flex flex-col p-6 rounded-xl justify-center items-center inset-0 bg-white/40 backdrop-blur-xl shadow-lg border border-gray-300 transition-all hover:shadow-indigo-400 hover:scale-102">
      <div className="absolute -inset-1 bg-gradient-to-br from-purple-300 to-indigo-300 blur-2xl opacity-20 rounded-xl"></div>
      <div className="relative z-10 flex items-center space-x-4 mb-4 justify-center">
        <Image
          src={props.icon}
          alt={props.feature}
          width={50}
          height={50}
          className="drop-shadow-md"
        />
        <h3 className="font-bold text-3xl text-indigo-600">{props.feature}</h3>
      </div>
      <p className="relative z-10 text-gray-700 text-center px-8">
        {props.description}
      </p>
    </div>
  );
}
