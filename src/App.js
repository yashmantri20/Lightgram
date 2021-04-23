import React from 'react';
import { auth } from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './comps/Authentication/Login';
import Main from './comps/Main';
import Loader from './comps/Loader/Loader';

function App() {

  const [user, loading] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  if (loading) return <Loader />

  return (
    user ?
      <>
        <button onClick={signOut} className='signout-btn'> Sign Out</button>
        <Main />
      </> : <Login />
  );
}

export default App;
