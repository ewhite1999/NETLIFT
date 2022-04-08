import React from "react";

const SelectWeight = ({ name }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>What {name} would you like to lift? (kg)</label>
      <input
        className="mt-3 bg-nl-darkblue text-slate-50 text-xl py-2 px-4 rounded-xl"
        required
        name={name}
        id={name}
        type="number"
        min={1}
      />
    </div>
  );
};

export default SelectWeight;
