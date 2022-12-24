import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import TodoList from './Components/TodoList';
import { getTodos } from './Redux/AppReducer/action';
import AllRoutes from './Routes/AllRoutes';

function App() {
  const location = useLocation();
  const dispatch = useDispatch()

  const { isAuth, token } = useSelector((store) => {
    return {
      token: store.AuthReducer.token,
      isAuth: store.AuthReducer.isAuth
    }
  })

  useEffect(() => {
    dispatch(getTodos(token))
  }, [dispatch, token])

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Box w='15%'>
        <Sidebar />
      </Box>
      {isAuth && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/' ? <Box w='30%' border={'1px solid black'}><TodoList /></Box> : null}
      <Box w={isAuth && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/' ? '55%' : '85%'} border={'1px solid black'}>
        <AllRoutes />
      </Box>
    </div>
  );
}

export default App;
