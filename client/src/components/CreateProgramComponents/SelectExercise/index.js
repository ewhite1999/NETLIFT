import React from "react";

const SelectExercise = ({ data, submitExercise }) => {
  let uniqueData = [];
  data.forEach((elem) => {
    if (uniqueData.indexOf(elem.name) === -1) uniqueData.push(elem.name);
  });
  return (
    <form
      onSubmit={submitExercise}
      className="flex flex-col text-lg space-y-4 mb-8"
    >
      <label htmlFor="exercise">Select the exercises you want to add</label>
      <select
        required
        name="exercise"
        id="exercise"
        className="
        mt-3
        bg-nl-darkblue
        text-slate-50
        text-xl
        py-2
        px-4
        rounded-xl"
      >
        {uniqueData.sort().map((exercise, index) => (
          <option
            key={`exercise_${exercise.replaceAll(" ", "_")}`}
            value={exercise}
          >
            {exercise}
          </option>
        ))}
      </select>
      <input
        className=" bg-nl-lightblue text-nl-darkblue text-lg font-medium py-4 px-6 rounded-xl mx-auto hover:opacity-80"
        type="submit"
        value="Add Exercise"
      />
    </form>
  );
};

export default SelectExercise;
