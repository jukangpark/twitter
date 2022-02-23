import { useEffect, useState } from "react";
import AppRouter from "../components/Router";
import { authService } from "../fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
      ) : (
        "Initializing..."
      )}
      <footer>&copy; Twitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
