import {
  BarChart3,
  Bell,
  CheckCircle2,
  Clock3,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Simple ticket management',
    description:
      'Keep every customer request organized in one clear workspace without unnecessary complexity.',
  },
  {
    icon: Clock3,
    title: 'Faster response times',
    description:
      'Give your support team the context they need to respond quickly and keep customers moving.',
  },
  {
    icon: BarChart3,
    title: 'Useful insights',
    description:
      'Understand ticket volume, resolution performance, and support activity at a glance.',
  },
  {
    icon: Bell,
    title: 'Stay on top of requests',
    description:
      'Make sure important customer issues do not get lost with clear ticket statuses and workflows.',
  },
  {
    icon: ShieldCheck,
    title: 'Built with security in mind',
    description:
      'Keep your support workspace protected with authentication and role-based access.',
  },
  {
    icon: CheckCircle2,
    title: 'Focused on resolution',
    description:
      'Move tickets from open to resolved with a workflow designed around getting things done.',
  },
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="landing-container">
        <div className="section-heading">
          <span className="section-eyebrow">
            Built for support teams
          </span>

          <h2>
            Everything you need to
            <span> deliver better support.</span>
          </h2>

          <p>
            Helpdesk Pro gives your team the essential tools to organize,
            prioritize, and resolve customer requests without getting in the
            way.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <Icon size={22} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="feature-arrow">
                  <ArrowDecoration />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ArrowDecoration = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.75 9H14.25M9.75 4.5L14.25 9L9.75 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Features;