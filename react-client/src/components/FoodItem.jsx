// SPARKLINES
import React from 'react';
import DatePicker from 'material-ui/DatePicker';
const handleDate = function(event, date){
  console.log(date)
}; 

const FoodItem = (props) => (
  <div className="txn-row" onClick={()=>{props.addFoodItem(props.food.food_name, props.food.nf_calories )}}>
    <div className="txn-data"><img src={props.food.photo.highres} alt="Smiley face" height="42" width="42"/> {props.food.food_name}</div>
    <div className="txn-data">{props.food.serving_qty}</div>
    <div className="txn-data">{ props.food.serving_unit }</div>
    <div className="txn-data">{ props.food.nf_calories }</div>
    <div className="txn-data">{ props.food.serving_weight_grams }</div>
    
      <DatePicker hintText="Date" onChange={instanceOf(date)}/>
    
    {/* <input name="calen" type="date" onChange={(e)=>{console.log(e.target.value)}}/> */}
  </div>
)

export default FoodItem;


