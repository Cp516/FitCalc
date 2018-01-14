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



class WorkoutSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
        workout: '',
        weight_kg: '',
        wrkotenabled: true,
    }
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e){
    this.setState({[e.target.name]: e.target.value}, ()=>{
        if(this.state.workout.length >= 2 && this.state.weight_kg.length >= 2 && this.props.canSearch.signedIn && this.props.canSearch.date){
            this.setState({wrkotenabled: false})
        }else{
            this.setState({wrkotenabled: true})            
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
        },
        btn: {
          margin: 7
        }, 
        radioButton: {
          marginBottom: 16,
          display: "inlineBlock"
        }
    }

    return (<div>
    {/* <div style={{display: this.props.displayIt}}> Welcome  {this.props.displayName}!</div> */}

     <MuiThemeProvider muiTheme={getMuiTheme()}>
      <form>
      <div style={{borderLeft: '2.5px solid #96858F', paddingLeft: '15px'}}>

        <TextField
          floatingLabelText="WorkOut"
          name="workout"
          floatingLabelStyle={{color:"#00BCD4"}}
          inputStyle={{color:"#00BCD4"}}
          onChange={this.changeHandler}
          value={this.state.workout}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          floatingLabelText="Weight"
          name="weight_kg"
          floatingLabelStyle={{color:"#00BCD4"}}
          inputStyle={{color:"#00BCD4"}}
          onChange={this.changeHandler}
          value={this.state.weight_kg}

        />
        {/* <br/> */}
        {/* <TextField
          floatingLabelText="Height"
          name="height_cm"
          onChange={this.changeHandler}
          value={this.state.height_cm}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          floatingLabelText="Age"
          name="age"
          onChange={this.changeHandler}
          value={this.state.age}
        />
          <br/>
          <RadioButtonGroup 
          name="gender"
            onChange={this.changeHandler}
          style={{display: "inline-block"}}
          >
          <RadioButton
            name="gender"
            value="Male"
           label="Male"
           style={{ display: 'inline-block', width: '150px' }}
            onChange={this.changeHandler}
          />
          <RadioButton
            name="gender"
            value="Female"
           label="Female"
           style={{ display: 'inline-block', width: '150px', marginLeft: '50px' }}
            
          />
          </RadioButtonGroup> */}
          {/* <input type="radio" name="gender" onChange={this.changeHandler} value="male"/> Male
          <input type="radio" name="gender" onChange={this.changeHandler} value="female"/> Female */}
        <IconButton
          iconStyle={styles.smallIcon}
          style={styles.small}
          disabled={this.state.wrkotenabled}
          onClick={(e)=>{
            e.preventDefault();
            this.props.exerciseClickHandler(e, this.state.workout, (this.state.weight_kg * 0.45))
            }}
        >
          <ActionSearch />
        </IconButton> 
        </div>



      </form>
      </MuiThemeProvider>
    </div>)
  }
}
export default WorkoutSearch;















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