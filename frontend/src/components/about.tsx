import AboutCard from "./ui/aboutCard";

const stats = [
  {
    id: 1,
    stat: "200+",
    description: "up to date scholarships available.",
  },
  {
    id: 2,
    stat: "$500,000+",
    description: "dollars in scholarships awarded.",
  },
  {
    id: 3,
    stat: "95%",
    description: "accuracy in matching candidates with scholarships.",
  },
];

export function About() {
  return (
    <section id="about" className="pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[45px] font-bold tracking-tight text-center mb-2">
            About fundHer.
          </h2>
          <h3 className="text-muted-foreground">
            A platform leveraging AI and data to connect women with the best
            scholarship opportunities and financial resources.
          </h3>
        </div>
        <div className="relative h-80 p-6 flex justify-center items-center border border-gray-300 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-indigo-300 opacity-20 blur-2xl pointer-events-none" />
          <div className="relative grid gap-6 grid-cols-3 grid-rows-1">
            {stats.map((stat) => (
              <div key={stat.id}>
                <AboutCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
