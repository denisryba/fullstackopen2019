import React from 'react';


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );
};

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
};

const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
};

const Total = ({ course }) => {
  return (
    <div>
      <p><b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</b></p>
    </div>
  )
};

export default Course;