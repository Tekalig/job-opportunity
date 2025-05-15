import AuthStore from "../../actions";
import EmployerProile from "./editEmployerProile";
import ExpertProfile from "./editExpertProfile";

export default function Settings() {
  const { isEmployer } = AuthStore();

  return (
    <div className="text-neutral-100 p-6 rounded shadow-lg w-full max-w-2xl bg-gray-600">
      {isEmployer ? <EmployerProile /> : <ExpertProfile />}
    </div>
  );
}
