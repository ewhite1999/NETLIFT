import React from "react";
import PropTypes from "prop-types";

const WorkoutPreview = (props) => {
  const { day, exercises, unit, workoutNum } = props;

  // TODO: change the weight to what they are actually doing
  return (
    <div className=" bg-nl-lightblue text-nl-darkblue rounded-xl py-2 px-6">
      <div className="flex justify-between text-nl-textgrey mb-2">
        <span>Workout {workoutNum} </span>
        <span>{day}</span>
      </div>
      <ul className=" space-y-1">
        {exercises.map((exercise) => {
          return (
            <li
              key={exercise.name}
              className=" font-medium flex justify-between"
            >
              <span>{exercise.name}</span>
              <span>
                {exercise.sets} x {exercise.reps} {exercise.weight}
                {unit}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

WorkoutPreview.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  workoutNum: PropTypes.number.isRequired
};

export default WorkoutPreview;
