import React, { useContext, useMemo, useState } from 'react'
import {Button, Form, FormGroup} from 'reactstrap';
import s from './style.scss'
import classNames from 'classnames'
import NullUser from '../NullUser';
import Chart from './WeightStatistics/Chart'


function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


export default function Main(props) {
  const user = props.user ? props.user : NullUser;
  const setUser = (user)=>{
    props.setUser(user);
    forceUpdate();
  }

  const forceUpdate = useForceUpdate();

  const isWeightedToday = ()=>{
    const currentDate = new Date().toDateString();
    if(user.weightStatistics.length !== 0) {
      const lastDate = user.weightStatistics[user.weightStatistics.length-1].date;
      return lastDate === currentDate;
    } else {
      return false;
    }
  };

  const [weight, setWeight] = useState(0);

  const onSumbitTodayWeight = (event)=>{
    event.preventDefault();
    const currentDate = new Date().toDateString();
    user.weightStatistics.push({
      date: currentDate,
      weight: parseInt(weight),
    });
    setUser(user);
    console.log(user);
      // axios.put("/update_user", {user: user} );
  }
    

  return (
    <>
      <div className={(props.shown && !isWeightedToday()) ? s.fadeIn : s.fadeOut}>
        <Form className={classNames("container")}>
            <div className="alert alert-primary row" role="alert">
              You didn't weigh yourself today. Input your current weight.
            </div>
          <FormGroup className="row">
            <div className="col">
              <input type="number" name="today_weight" defaultValue={0} onChange={event => setWeight(event.target.value)} style={{width: "100%"}}/>
            </div>
          </FormGroup>
          <FormGroup className="row">
            <Button type="submit" color="primary" className="btn-sm btn-block" onClick={onSumbitTodayWeight}>Save current weight</Button>
          </FormGroup>
        </Form>
      </div>
      <div className={props.shown ? s.fadeIn : s.fadeOut}>
        <Chart data={user.weightStatistics} />
      </div>
    </>
  );
}