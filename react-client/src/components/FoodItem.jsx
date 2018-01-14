// SPARKLINES
import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const FoodItem = (props) => (
  <div className="txn-row" onClick={()=>{props.addFoodItem(props.food.food_name, props.food.nf_calories)}}>
    <div className="txn-data"><img src={props.food.photo.highres} alt="Smiley face" height="42" width="42"/> {props.food.food_name}</div>
    <div className="txn-data">{props.food.serving_qty}</div>
    <div className="txn-data">{ props.food.serving_unit }</div>
    <div className="txn-data">{ props.food.nf_calories }</div>
    <div className="txn-data">{ props.food.serving_weight_grams }</div>
    
  </div>
)

export default FoodItem;


// formatDate={new DateTimeFormat('en-US', {
//   day: 'numeric',
//   month: 'numeric'
// }).format}