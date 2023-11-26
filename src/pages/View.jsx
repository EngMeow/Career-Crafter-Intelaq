import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../components/adminComponents/dashboard/DashBoardPage";
import UserPage from "../components/adminComponents/users/UserPage";
import ProfileView from "../components/profile/ProfileView";
import EditProfile from "../components/profile/EditProfile";
import { JobPage } from "../components/adminComponents/job/JobPage";
import NavBar from "../components/layout/NavBar";
import { AllApplications } from "../components/adminComponents/application/AllApplications";

export function View() {
  return (
    <div>
      <section >
        <div>
            <NavBar/>
        </div>
        <div>
            <Routes>
              <Route path="" element={<DashBoardPage />} />
              <Route path="job/*" element={<JobPage />} />
              <Route path="application/*" element={<AllApplications />} />
              <Route path="user/*" element={<UserPage />} />
              <Route path="profile/*" element={<ProfileView />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Routes>
        </div>
      </section>
    </div>
  );
}
