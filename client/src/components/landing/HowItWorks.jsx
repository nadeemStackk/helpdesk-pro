import {
  ArrowRight,
  CheckCircle2,
  MessageSquarePlus,
  UserRoundPlus,
  Zap,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserRoundPlus,
    title: 'Create your account',
    description:
      'Sign up in a few moments and give your support team a dedicated workspace.',
  },
  {
    number: '02',
    icon: MessageSquarePlus,
    title: 'Manage customer requests',
    description:
      'Create, track, and organize support tickets so every request has a clear owner and status.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Resolve issues faster',
    description:
      'Keep your team focused on resolving customer problems and closing tickets efficiently.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="landing-container">
        <div className="section-heading centered">
          <span className="section-eyebrow">
            How it works
          </span>

          <h2>
            From request to resolution,
            <span> without the complexity.</span>
          </h2>

          <p>
            Get your support workflow up and running with a simple process your
            whole team can understand.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="step-wrapper" key={step.number}>
                <article className="step-card">
                  <div className="step-top">
                    <span className="step-number">
                      {step.number}
                    </span>

                    <div className="step-icon">
                      <Icon size={23} />
                    </div>
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                  <div className="step-check">
                    <CheckCircle2 size={16} />
                    <span>Easy to get started</span>
                  </div>
                </article>

                {index < steps.length - 1 && (
                  <div className="step-connector" aria-hidden="true">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;