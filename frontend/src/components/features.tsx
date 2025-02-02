import Card from "../components/ui/card";
import match from "../assets/match.svg";
import money from "../assets/money.svg";
import personal from "../assets/personal.svg";
import tracker from "../assets/tracker.svg";

const features = [
  {
    id: 1,
    icon: money,
    feature: "Money",
    description: "Money Money Money Money Money.",
  },
  {
    id: 2,
    icon: match,
    feature: "Match",
    description: "Match Match Match Match Match.",
  },
  {
    id: 3,
    icon: personal,
    feature: "Personal",
    description: "Personal Personal Personal Personal Personal.",
  },
  {
    id: 4,
    icon: tracker,
    feature: "Tracker",
    description: "Tracker Tracker Tracker Tracker Tracker Tracker.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[45px] font-bold tracking-tight text-center mb-2">
            Features
          </h2>
          <h3 className="text-muted-foreground">
            Harnessing AI to Match You with the Best Scholarships—Fast, Smart,
            and Personalized.
          </h3>
        </div>
        <div className="grid gap-6 grid-cols-2 grid-rows 2">
          {features.map((feature) => (
            <div key={feature.id}>
              <Card {...feature}></Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
