import React from 'react';
import FoodItem from './FoodItem.jsx';


const FoodList = (props) => (
  <div>
    {/* <h4> List Component </h4> */}
    
    <div className="txn">
    <h3>Food</h3>
      <div className="txn-table">
        <div className="txn-header txn-row">
          <div className="txn-data">Food</div>
          <div className="txn-data">Quantity</div>
          <div className="txn-data">Unit</div>
          <div className="txn-data">Calories</div>
          {/* <div className="txn-data">Weight</div> */}
          {/* <div className="txn-data">Date</div> */}
        </div>
        { props.foods.map((food, idx) => <FoodItem addFoodItem={props.addFoodItem} food={food} key={idx}/>)}
      </div>
    </div>
  </div>
)

export default FoodList;