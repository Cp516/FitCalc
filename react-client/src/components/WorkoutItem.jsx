// SPARKLINES
import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const WorkoutItem = (props) => (
    <div className="txn-row" onClick={()=>{props.addWorkoutItem(props.workout.name, props.workout.nf_calories)}}>
        <div className="txn-data"><img src={props.workout.photo.highres} alt={props.workout.name} height="42" width="42"/> { props.workout.name }</div>
        <div className="txn-data">{ props.workout.duration_min }</div>
        <div className="txn-data">{ props.workout.met }</div>
        <div className="txn-data">{ props.workout.nf_calories }</div>
      </div>
)

export default WorkoutItem;