/**
 * @module
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './style.scss'
import NullUser from '../NullUser';
import TodayWeightForm from './TodayWeightForm';
import useExistingState from '../hooks/useExistingState'
import WeightGraphWithControls from '../WeightGraphWeithControls/WeightGraphWithControls';

/**
 * Main component that contains all others that requires authentificated user
 * @component
 * @param {Object} props 
 * @param {Array} props.userState - user object and setter for it.
 */
function Main(props) {
  const [user, setUser] = useExistingState(props.userState);

  const isWeightedToday = ()=>{
    const statistics = user.weightStatistics;
    if(statistics.length !== 0) {
      const dateFormatter = new Intl.DateTimeFormat('ru-RU');
      const currentDate = dateFormatter.format(new Date());
      const lastDate = dateFormatter.format(new Date(statistics[statistics.length-1].date));
      return lastDate === currentDate;
    } else {
      return false;
    }
  };

  const addTodayWeight = (weight)=>{
    const currentDate = new Date(new Date().toDateString()).getTime();
    user.weightStatistics.push({
      date: currentDate,
      weight: parseFloat(weight),
    });
    setUser(user);
  }

  return (
    <>
      <div className={!isWeightedToday() ? s.fadeInWithDelay : s.fadeOut}>
        <TodayWeightForm onSubmit={addTodayWeight}/>
      </div>
      <div className={isWeightedToday() ? s.fadeInWithDelay : s.fadeOut}>
        <WeightGraphWithControls data={user.weightStatistics}/>
      </div>
    </>
  );
}

Main.propTypes = {
  userState: PropTypes.array,
}

Main.defaultProps = {
  userState: [new NullUser(), newUser=>{user = newUser;}],
}

export default Main;
