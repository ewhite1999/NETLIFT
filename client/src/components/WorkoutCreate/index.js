import React, { useEffect } from "react";
// import axios from "axios";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProgram } from "../../actions/userActions";
// TODO: Animate pages so it falls smoothly on page

// TODO: Make an add exercise button that links to /test route
// TODO: Get results from usestate/effect to display what exercises were selected
// TODO: style /test page
// TODO: push results onto programs page

const WorkoutCreate = () => {
  const exercise = useSelector((state) => state.exercise.exercise);
  const dispatch = useDispatch();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const trainingDays = [];
    const workouts = "";
    for (entry in checked) {
      if (entry) {
        trainingDays.push(1);
      } else {
        trainingDays.push(0);
      }
    }
    program = { id: 1, training_days: trainingDays, workouts: workouts };
    // useDispatch(setProgram(program));
  };
  const [checked, setChecked] = useState(new Array(days.length).fill(false));
  const handleOnChange = (position) => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item
    );
    setChecked(updatedCheckedState);
  };

  // useEffect(() => {}, []);

  const renderExercises = () => {
    if (exercise.length > 0) {
      return (
        <>
          <label
            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1 mb-4"
            htmlFor="exercises"
          >
            Selected Exercises:{" "}
          </label>
          <ul className="space-y-1">
            {exercise.map((ex) => {
              return <li key={ex.name}>{ex.name}</li>;
            })}
          </ul>
        </>
      );
    }
  };

  const renderAddExercises = () => {
    return (
      <Link
        to="workout"
        className="bg-nl-lightblue flex items-center rounded-xl text-2xl
      text-nl-darkblue font-medium py-4 px-8 rounded-xl mx-auto hover:opacity-80 w-full text-center"
      >
        <FontAwesomeIcon
          className="w-8 h-8 pl-1"
          icon={faPlus}
        ></FontAwesomeIcon>
        <p className="pl-6">Add Exercises</p>
      </Link>
    );
  };
  return (
    <div className="mx-auto min-h-screen container pt-16">
      <form
        role="form"
        onSubmit={handleSubmit}
        className="flex flex-col space-y-8"
      >
        <div className="bg-slate-50 relative rounded-xl p-5">
          <label
            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1"
            htmlFor="trainingDays"
          >
            Training Days
          </label>
          <div
            className="bg-slate-50 relative rounded-xl p-5"
            name="trainingDays"
          >
            <ul>
              {days.map((name, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      name={name}
                      value={name}
                      checked={checked[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={index}> {name}</label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {exercise.length > 0 && (
          <div className="bg-slate-50 relative rounded-xl p-5" name="exercises">
            {renderExercises()}
          </div>
        )}
        {renderAddExercises()}
        <button
          type="submit"
          className=" bg-nl-lightblue text-nl-darkblue text-2xl font-medium py-4 px-16 rounded-xl mx-auto hover:opacity-80"
          name="Create"
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default WorkoutCreate;
