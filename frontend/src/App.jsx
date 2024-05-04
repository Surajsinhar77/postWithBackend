import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './common/AllRoutes.jsx';


function App() {

  const notify = (message) => {
    toast(message);
  }
  notify("Welcome to the app!");
  return (
    <div className="App">
      <AllRoutes />
      
      <ToastContainer />
      
    </div>
  )
}

export default App;
