import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

const Statistics = ({good, neutral, bad}) => {

  const getNumberOfFeedbacks = () => good + neutral + bad;

  const getAverageRate = () => {
    return ((good * 1 + bad * -1) / getNumberOfFeedbacks());
  }

  const getPositivePercent = () => good * 100 / getNumberOfFeedbacks();

  if(good === 0 && neutral === 0 && bad === 0)
    return (<p>no feedback given</p>);

  return (
    <>
    <h1>statictics</h1>
    <table>
      <Statistic text='good' value={good}/>
      <Statistic text='neutral' value={neutral}/>
      <Statistic text='bad' value={bad}/>
      <Statistic text='all' value={getNumberOfFeedbacks()}/>
      <Statistic text='average' value={getAverageRate()}/>
      <Statistic text='positive' value={getPositivePercent() + '%'}/>
    </table>
    </>
  )
};


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };



  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);