import React, { useState } from "react";
import axios from "axios";
import SelectEquipment from "../SelectEquipmemt";
import SelectSets from "../SelectSets";
import SelectTarget from "../SelectTarget";
import SelectExercise from "../SelectExercise";
import SelectWeight from "../SelectWeight";
import { useDispatch, useSelector } from "react-redux";
import { updateLifts } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";

// TODO: Animate pages so it falls smoothly on page
const WorkoutCreate = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [exercises, setExercises] = useState();
  const [reps, setReps] = useState();
  const [sets, setSets] = useState();
  const [weight, setWeight] = useState();
  const exercise = useSelector((state) => state.exercise.exercise);
  console.log(exercise);
  const reset = () => {
    setExercises(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const ex = e.currentTarget.exercise.value;
    const exObj = {
      name: ex,
      reps: reps,
      sets: sets,
      weight: weight,
    };

    dispatch(updateLifts(exObj));
  };

  const renderExercises = () => {
    if (exercise.length > 0) {
      return (
        <div className=" border-2 border-nl-darkblue rounded-xl py-4 px-6">
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
        </div>
      );
    }
  };

  const loadExercises = async (e) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const target = form.target.value;
      const equipment = form.equipment.value;
      const setsVal = form.sets.value;
      setSets(setsVal);
      const repsVal = form.reps.value;
      setReps(repsVal);
      const weightVal = form.weight.value;
      setWeight(weightVal);
      const queryString = `${process.env.API_URL}exercises?bodyPart=${target}&equipment=${equipment}`;
      const { data } = await axios.get(queryString);
      setExercises(data);
    } catch (e) {
      alert("We don't have any exercises matching that criteria");
    }
  };

  const handleNav = (e) => {
    e.preventDefault();
    nav("/create", { replace: true });
  };

  return (
    <div className="mx-auto container mt-4 text-nl-darkblue p-8">
      <h2 className=" text-center text-2xl pb-8">
        Here you can choose an exercise to add
      </h2>
      <form
        onSubmit={loadExercises}
        onChange={reset}
        className="flex flex-col text-lg space-y-6 mb-6"
      >
        <SelectTarget />
        <SelectEquipment />
        <SelectSets name={"sets"} max={20} />
        <SelectSets name={"reps"} />
        <SelectWeight name={"weight"} />
        <input
          className=" bg-nl-lightblue text-nl-darkblue text-2xl font-medium py-4 px-16 rounded-xl mx-auto hover:opacity-80"
          type="submit"
          value="Find exercises"
        />
      </form>
      {exercises && (
        <SelectExercise data={exercises} submitExercise={submitHandler} />
      )}
      {exercise.length > 0 && (
        <>
          {renderExercises()}
          <input
            className="flex bg-nl-lightblue text-nl-darkblue text-2xl font-medium py-4 px-16 rounded-xl mx-auto hover:opacity-80 mt-6"
            type="button"
            value="confirm workout"
            onClick={(e) => handleNav(e)}
          />
        </>
      )}
    </div>
  );
};
export default WorkoutCreate;
