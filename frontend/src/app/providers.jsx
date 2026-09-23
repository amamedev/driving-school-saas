import { AuthProvider } from "../modules/auth/context/authContext";

function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
