import {
  Home,
  Join3oC,
  Enter3oC,
  OTP,
  UserProfile,
  CupBuds,
  IRL,
  Verify,
  ScheduleIRL,
  PhoneNumber,
} from "./Pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NavBar, ProtectedRender } from "./Components";

// ========== App Component ==========
export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <ProtectedRender
          paths={["/profile", "/cupbuds", "/irl", "/scheduleirl/*"]}
          element={<NavBar />}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/join3oc" element={<Join3oC />} />
          <Route exact path="/invitation/:code" element={<Join3oC />} />
          <Route exact path="/enter3oc" element={<Enter3oC />} />
          <Route exact path="/otp" element={<OTP />} />
          <Route exact path="/phonenumber" element={<PhoneNumber />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/cupbuds" element={<CupBuds />} />
          <Route exact path="/irl" element={<IRL />} />
          <Route
            exact
            path="/scheduleirl/:connectionId"
            element={<ScheduleIRL />}
          />
          <Route exact path="/updateirl/:irlId" element={<ScheduleIRL />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
