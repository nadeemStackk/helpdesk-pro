import './Spinner.css';

const Spinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="spinner-fullpage">
        <div className="spinner" />
      </div>
    );
  }
  return <div className="spinner" />;
};

export default Spinner;