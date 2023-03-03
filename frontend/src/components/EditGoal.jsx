import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateGoal } from "../features/goals/goalSlice";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { reset } from "../features/goals/goalSlice";
import Spinner from "./Spinner";

function EditGoal() {
  const { user } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { goal } = state;
  const { isLoading, isError, message } = useSelector((state) => state.goals);
  const [text, setText] = useState(goal.text);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const updatedGoal = await dispatch(
        updateGoal({ goalId: goal._id, goalData: { text }, token })
      );
      console.log(updatedGoal); // to check if goal was updated successfully
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, goal)} key={goal._id}>
        <div className="form-group">
          <h2>{goal.text}</h2>
          <label htmlFor="text">Text:</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn">
            Update Goal
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGoal;
