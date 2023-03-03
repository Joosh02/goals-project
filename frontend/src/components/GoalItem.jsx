import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Link } from "react-router-dom";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={handleDelete} className="close">
        X
      </button>
      <Link to={`/${goal._id}`} state={{ goal }} className="btn btn-edit">
        Edit
      </Link>
    </div>
  );
}

export default GoalItem;
