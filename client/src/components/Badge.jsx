import './Badge.css';

const statusColorMap = {
  Open: 'badge-open',
  'In Progress': 'badge-progress',
  Resolved: 'badge-resolved',
  Closed: 'badge-closed',
};

const priorityColorMap = {
  Low: 'badge-low',
  Medium: 'badge-medium',
  High: 'badge-high',
  Urgent: 'badge-urgent',
};

export const StatusBadge = ({ status }) => (
  <span className={`badge ${statusColorMap[status] || 'badge-closed'}`}>{status}</span>
);

export const PriorityBadge = ({ priority }) => (
  <span className={`badge-outline ${priorityColorMap[priority] || 'badge-medium'}`}>{priority}</span>
);