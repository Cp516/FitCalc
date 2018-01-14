import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class FoodSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        food: '',
        fdEnabled: true
    }
    this.changeHandler = this.changeHandler.bind(this);
    // this.newUser = this.newUser.bind(this);
  }

  changeHandler(e){
    this.setState({[e.target.name]: e.target.value}, ()=>{
        if(this.state.food.length >= 2 && this.props.canSearch.signedIn && this.props.canSearch.date){
            this.setState({fdEnabled: false})
        }else{
            this.setState({fdEnabled: true})
        }
    })
  }
  componentDidMount() {
  }

  render () {
    const styles = {
      small: {
          width: 72,
          height: 72,
          padding: 16,
        },
        smallIcon: {
          width: 36,
          height: 36,
        }
    }

    return (<div >
    <div style={{display: this.props.displayIt}}> <h2>Welcome  {this.props.displayName}!</h2></div>

     <MuiThemeProvider muiTheme={getMuiTheme()}>

      <form>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            floatingLabelText="Food"
            floatingLabelStyle={{color:"#00BCD4"}}
            inputStyle={{color:"#00BCD4"}}
            name="food"
            onChange={this.changeHandler}
            value={this.state.food}
          />
          <IconButton iconStyle={styles.smallIcon} style={styles.small} disabled={this.state.fdEnabled}        
          onClick={
            (e)=>{this.props.foodClickHandler(e, this.state.food)}
          }
          >
            <ActionSearch/>
          </IconButton> 
        </div>
      </form>
      </MuiThemeProvider>
    </div>)
  }
}
export default FoodSearch;















{/* <input name='food' type='text' onChange={this.changeHandler} placeholder='What did u eat' required/> */}
{/* <button onClick={(e)=>{
    this.props.foodClickHandler(e, this.state.food)
    }}
    disabled={this.state.fdEnabled}
    >Calculate</button>
<br/> */}
{/* <input name='workout' type='text' onChange={this.changeHandler} placeholder='What did u do' required/> */}

{/* <input name='weight_kg' type='number' onChange={this.changeHandler} placeholder='weight' required/> */}
{/* <input name='height_cm' type='number' onChange={this.changeHandler} placeholder='height e.g. 5.8' required/> */}
{/* <input name='age' type='number' onChange={this.changeHandler} placeholder='age' required/> */}
{/* <br/>(all field must be filled in to be to query) */}
{/* <button onClick={(e)=>{
    e.preventDefault();
    console.log(this.state.weight_kg * 0.45)

    this.props.exerciseClickHandler(e, this.state.workout, this.state.gender, (this.state.weight_kg * 0.45), (this.state.height_cm * 2.5), this.state.age)
    }}
    disabled={this.state.wrkotenabled}
    >Calculate</button> */}