import { BarChart3, Clock3, MessageSquare, Ticket } from 'lucide-react';

const ProductPreview = () => {
  const stats = [
    {
      icon: Ticket,
      value: '24',
      label: 'Open tickets',
    },
    {
      icon: MessageSquare,
      value: '186',
      label: 'Resolved tickets',
    },
    {
      icon: Clock3,
      value: '18m',
      label: 'Avg. response time',
    },
    {
      icon: BarChart3,
      value: '94%',
      label: 'Resolution rate',
    },
  ];

  return (
    <section id="product" className="product-preview-section">
      <div className="landing-container">
        <div className="section-heading centered">
          <span className="section-eyebrow">
            Everything in one place
          </span>

          <h2>
            A clearer view of your
            <span> support operation.</span>
          </h2>

          <p>
            Keep your team focused with a simple workspace designed to make
            every customer request easier to manage.
          </p>
        </div>

        <div className="product-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="product-stat-card" key={stat.label}>
                <div className="product-stat-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="product-showcase">
          <div className="showcase-header">
            <div>
              <span className="showcase-eyebrow">
                Recent activity
              </span>

              <h3>Customer support requests</h3>
            </div>

            <button type="button" className="showcase-filter">
              All tickets
            </button>
          </div>

          <div className="showcase-list">
            <div className="showcase-ticket">
              <div className="showcase-ticket-avatar">
                JS
              </div>

              <div className="showcase-ticket-content">
                <strong>
                  Unable to access my account
                </strong>

                <span>
                  John Smith · Account access
                </span>
              </div>

              <div className="showcase-ticket-meta">
                <span className="ticket-status open">
                  Open
                </span>

                <small>8 min ago</small>
              </div>
            </div>

            <div className="showcase-ticket">
              <div className="showcase-ticket-avatar">
                SM
              </div>

              <div className="showcase-ticket-content">
                <strong>
                  Payment confirmation needed
                </strong>

                <span>
                  Sarah Miller · Billing
                </span>
              </div>

              <div className="showcase-ticket-meta">
                <span className="ticket-status pending">
                  Pending
                </span>

                <small>21 min ago</small>
              </div>
            </div>

            <div className="showcase-ticket">
              <div className="showcase-ticket-avatar">
                MJ
              </div>

              <div className="showcase-ticket-content">
                <strong>
                  Feature request
                </strong>

                <span>
                  Mike Johnson · Product
                </span>
              </div>

              <div className="showcase-ticket-meta">
                <span className="ticket-status resolved">
                  Resolved
                </span>

                <small>43 min ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;