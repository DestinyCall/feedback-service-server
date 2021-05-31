import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          class="btn-floating btn-large waves-effect waves-light red"
        >
          <i class="material-icons">
            <FontAwesomeIcon icon={faPlus} />
          </i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
