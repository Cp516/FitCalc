import React from 'react';
import WorkoutItem from './WorkoutItem.jsx';


const WorkoutList = (props) => (
  <div>
    {/* <h4> List Component </h4> */}
    <div className="txn">
    <h3>Activities</h3>
      <div className="txn-table">
        <div className="txn-header txn-row">
          <div className="txn-data">Name</div>
          <div className="txn-data">Duration</div>
          <div className="txn-data">M.E.T.</div>
          <div className="txn-data">Calories</div>
          <div className="txn-data">Date</div>
        </div>
        { props.workouts.map((workout, idx) => <WorkoutItem addWorkoutItem={props.addWorkoutItem} workout={workout} key={idx}/>)}
      </div>
    </div>
  </div>
  )


export default WorkoutList;