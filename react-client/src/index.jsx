import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import d3 from 'd3';
import c3 from 'c3';
import FoodList from './components/FoodList.jsx';
import WorkoutList from './components/WorkoutList.jsx';
import FoodSearch from './components/FoodSearch.jsx';
import WorkoutSearch from './components/WorkoutSearch.jsx';
import style from './components/list.css';
import ActionTimeLine from 'material-ui/svg-icons/action/timeline';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import actions from './components/actions';
import DatePicker from 'material-ui/DatePicker';
const config = require('./config.js');



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      userId: '',
      email: '',
      date: '',
      foods: [],
      workouts: [],
      snEnabled: true,
      signedIn: false,
      dateInput: false,
      displayName: '',
      displayIt: 'none',
      workoutCals: [],
      wkDates: ["x2"],
      foodCals: [],
      fdDates:["x1"]
    
    }
    this.foodSearchHandler = this.foodSearchHandler.bind(this);
    this.exerciseSearchHandler = this.exerciseSearchHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.newUser = this.newUser.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
    this.addWorkoutItem = this.addWorkoutItem.bind(this);
    this.graph = this.graph.bind(this);
    this.chart = this.chart.bind(this);    
  }
  graph(){
    axios.get("/userworkoutdata", {params: {userId: this.state.userId}})
    .then((res)=>{
      this.setState({workoutCals: ["Calories Burned"]}, ()=>{
        for(var i = 0; i <res.data.length; i++){
          this.state.workoutCals.push(res.data[i].calories)
          this.state.wkDates.push(res.data[i].date)          
        }
      })
      // console.log('workoutdata=>',res.data)
    })
      .then(()=>{
        axios.get("/userfooddata", {params: {userId: this.state.userId}})
        .then((res)=>{
          this.setState({foodCals: ["Calorie Intake"]},()=>{
            console.log(res)
            for(var i = 0; i < res.data.length; i++){
              this.state.foodCals.push(res.data[i].calories)
              this.state.fdDates.push(res.data[i].date)
            }
          })   
          // console.log('fooddata=>',res.data)
        })
        .then(()=>{
          console.log(this.state.foodCals, this.state.workoutCals)
          this.chart();
        })     
      })
    .catch((err)=>{
      console.log(err)
    })
  }
  

  chart(){
    console.log('date data', this.state.fdDates)
    c3.generate({
      bindto: '#chart',
      data: {
        xs: {'Calorie Intake': 'x1',
             'Calories Burned': 'x2'

        },
          columns: [
            // this.state.foodCals,
            this.state.fdDates,
            this.state.wkDates,
            this.state.foodCals,
            this.state.workoutCals
          ],
        
          type: 'spline'
      },
      axis : {
        x : {
            type : 'timeseries',
            tick: {
                format: "%Y-%-m-%d"
            }
        }
    }
  });
  
  }
  newUser(user, email){
    this.setState({signedIn: true, userId: this.state.email})
    axios.post('/user', {user, email})
    .then((res) =>{
      this.setState({displayName: res.data, displayIt: 'block'})
    })
    .catch(function(err){
      console.log(err)
    })
  }

  addFoodItem(name, cals){
    var userId = this.state.userId;
    var date = this.state.date;
    axios.post('/foodItem', {userId, name, cals, date})
    .then(function(res){
      console.log(res)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  addWorkoutItem(name, cals){
    var userId = this.state.userId;
    var date = this.state.date;
    axios.post('/workoutItem', {userId, name, cals, date})
    .then(function(res){
      console.log(res)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  changeHandler(e){
    this.setState({[e.target.name]: e.target.value}, ()=>{
        if(this.state.user.length >= 2 & this.state.email.length >= 6){
          this.setState({snEnabled: false})
      }else{
          this.setState({snEnabled: true})
      }
    })
  }

  foodSearchHandler(e, q){
    e.preventDefault();
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      query: q
    }, {
      headers: {
          
          "Content-Type":"application/json"
         }
    })
    .then(res => this.setState({foods: res.data.foods}))
    .catch(function (error) {
      console.log(error);
    });
  }

  exerciseSearchHandler(e, query, weight){
    e.preventDefault();
    console.log(query, weight);
    axios.post('https://trackapi.nutritionix.com/v2/natural/exercise', {
      query: query,
      weight_kg: weight,
    }, {
      headers: {
          
          "Content-Type":"application/json"
         }
    })
    .then( res =>this.setState({workouts: res.data.exercises}))
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    // this.state.chart       // axios.post()
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
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <div className="container">
          <img src="https://scontent-ort2-2.xx.fbcdn.net/v/t31.0-8/26232851_10154978414296109_1268343216083354301_o.png?oh=e4aad4e45d03c2f215b5fc588ef77799&oe=5AEBD8DD" alt="Smiley face"
          height="150%" width="100%" style={{opacity: 0.9}}/>
          </div>

          <div id="appDescription" >
            <h1>Fit Cal</h1>
            <p>
            Lose Weight And Gain Muscle, </p>
            <p style={{textAlign: "center"}}>Hustle For That Muscle,</p>
            <p style={{textAlign: "right"}}>This Can Get Difficult So We're to Help</p>

            <div>
              With FitCal We Make It Simple To Keep Track Of Your Calorie Intake and Calorie Expenditure
              You Look What Your going to Eat Or What You Ate and It Counts The Calories For You 
              Simply Add When You Found The Right Food
              You Look Up The Exercises you've Done and Show You how Many Calories You've Burned <br/>Just Add Accordinly 
            </div>
            <IconButton
              iconStyle={styles.smallIcon}
              style={styles.small}
            >
              <ActionTimeLine/>
            </IconButton> 
            Once Your Done Added It We Keep Track Of Your How Many Calorie You've Burned And How many Calories You Taken In  
          </div>
 
    <div id="appFunc">
      <form style={{textAlign: 'center'}}>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          floatingLabelText="Name"
          name="user"
          onChange={this.changeHandler}
          value={this.state.user}

        />&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          floatingLabelText="Email"
          name="email"
          onChange={this.changeHandler}
          value={this.state.email}
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <RaisedButton label="Sign In" primary={true}  disabled={this.state.snEnabled} 
        onClick={()=>{this.newUser(this.state.user, this.state.email)}}/>
        <br/>
      </form>
      <hr size="3" style={{background:"#96858F"}}/>
      
      <DatePicker style={{textAlign: 'center'}}name="calen" hintText="Date"  onChange={(x, event) => {this.setState({date: JSON.stringify(event).slice(1, 11), dateInput: true})}}/>

      <div style={{display: "flex", justifyContent: "space-between"}}>

        <div style={{width: "700px"}}>
          <FoodSearch displayIt={this.state.displayIt} canSearch={{signedIn: this.state.signedIn, date:this.state.dateInput}} displayName={this.state.displayName} foodClickHandler={this.foodSearchHandler} style={{display:'block'}}/>
          <FoodList addFoodItem={this.addFoodItem} addWorkoutItem={this.addWorkoutItem} workouts={this.state.workouts} foods={this.state.foods}/>
        </div>
        <div style={{width: "700px"}}>
          <WorkoutSearch displayIt={this.state.displayIt} canSearch={{signedIn: this.state.signedIn, date:this.state.dateInput}} displayName={this.state.displayName} exerciseClickHandler={this.exerciseSearchHandler} style={{display:'block'}}/>
          <WorkoutList addFoodItem={this.addFoodItem} addWorkoutItem={this.addWorkoutItem} workouts={this.state.workouts} foods={this.state.foods}/>
        </div> 
      </div>
    </div>

       <div id="chart">
       <button disabled={!this.state.signedIn} onClick={this.graph}>Graphical History</button>
      </div>
    </div>
    </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
