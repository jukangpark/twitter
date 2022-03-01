import { useEffect, useState } from "react";
import AppRouter from "../components/Router";
import { authService } from "../fbase";

const App = () => {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setUserObj(user);
      } else {
        setUserObj(null);
        // setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });

    // setUserObj(Object.assign({}, user));
  };
  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        ></AppRouter>
      ) : (
        "Initializing..."
      )}
      <footer>&copy; Twitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
