import React from "react";
import WorkoutPreview from "../../components/WorkoutPreview";
import dayjs from "dayjs";
import Title from "../../components/Title";
import { fetchProfile, getQuote } from "../../actions/userActions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProgramsPage = () => {
  const programs = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const exercise = useSelector((state) => state.exercise.exercise);
  const dispatch = useDispatch();
  const getProgramData = () => dispatch(fetchProfile());
  const today = dayjs();
  const dayOfWeek = today.day();

  useEffect(() => {
    getProgramData();
  }, []);

  const renderExercises = () => {
    if (exercise.length > 0) {
      return exercise;
    } else {
      return false;
    }
  };

  const renderPreview = () => {
    if (programs._programs && renderExercises()) {
      let trainingDays = programs._programs[0].training_days.map((day) =>
        day < dayOfWeek ? day + 7 : day
      );
      trainingDays = trainingDays.sort((x, y) => x - y);
      return trainingDays.map((day) => (
        <WorkoutPreview
          day={today.day(day).format("ddd D MMM")}
          exercises={exercise}
          // this has been hardcoded as the server was returning 0
          unit={"kg"}
          key={today.day(day).format()}
          workoutNum={1}
        />
      ));
    } else {
      return (
        <p className=" text-slate-50 text-lg">
          You don't have any Programs yet, why not{" "}
          <Link
            className="font-bold text-nl-lightblue hover:opacity-70"
            to="/create"
          >
            create one?
          </Link>
        </p>
      );
    }
  };

  const lsToken = localStorage.getItem("token");
  const nav = useNavigate();
  useEffect(() => {
    if (lsToken == null) {
      nav("/login", { replace: true });
    }
  });
  // TODO: replace this with data from redux
  const [quote, setQuote] = useState("");
  const token = useSelector((state) => state.token);
  useEffect(async () => {
    setQuote(await getQuote());
  }, [token]);

  // const exerciseList = [
  //   { name: fakeExercise1.name, sets: fakelift2.set, reps: fakelift1.rep },
  //   { name: fakeExercise2.name, sets: fakelift1.set, reps: fakelift1.rep },
  //   { name: fakeExercise3.name, sets: fakelift3.set, reps: fakelift3.rep },
  // ];

  // if the day has already passed we add seven so we can order them from the current date

  // TODO: turn this into a link to the workout page
  return (
    <div className="bg-nl-darkblue min-h-[calc(100vh-73px)] px-8">
      <Title text="Home" />
      <h2 className="text-center text-slate-50 text-lg font-bold italic pt-4 pb-8">
        {quote}
      </h2>
      <div className=" space-y-10">
        {loading ? (
          <p className=" text-slate-50 text-lg capitalize text-center">
            Loading programs
          </p>
        ) : (
          renderPreview()
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;
