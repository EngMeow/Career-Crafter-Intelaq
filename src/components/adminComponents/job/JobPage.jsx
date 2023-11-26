import { Route, Routes } from "react-router-dom";
import { NewJob } from "./NewJob";
import { JobView } from "./JobView";
import { AllJobs } from "./AllJobs";
import { JobApplications } from "../application/JobApplications";

export function JobPage() {
  return (
    <div>
      <section >
        <Routes>
          <Route path="" element={<AllJobs />} />
          <Route path=":id" element={<JobView />} />
          <Route path=":id/edit" element={<NewJob />} />
          <Route path=":id/applications" element={<JobApplications />} />
        </Routes>
      </section>
    </div>
  );
}
