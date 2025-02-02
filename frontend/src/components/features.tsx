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
    description:
      "Easily access and apply for scholarships, grants, and financial aid tailored for women.",
  },
  {
    id: 2,
    icon: match,
    feature: "Match",
    description:
      "AI-powered matching algorithm connects users with the scholarships and grants that best fit their profile",
  },
  {
    id: 3,
    icon: personal,
    feature: "Personal",
    description:
      "Personalized recommendations based on users academic background and unique qualifications.",
  },
  {
    id: 4,
    icon: tracker,
    feature: "Tracker",
    description:
      "Stay organized and on top of scholarship applications with our intuitive tracking system.",
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
            Harnessing AI to Match You with the Best Funding Opportunities—Fast,
            Smart, and Personalized.
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
