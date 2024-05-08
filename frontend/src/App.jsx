import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './common/AllRoutes.jsx';
import Navbar from './components/Navbar';
import { useAuth } from './common/AuthContext.jsx';
const notify = (message) => {
  toast(message);
}

function App() {
  const { user } = useAuth(); 
  return (
    <div className="App">
      {user?
        <Navbar />
        :
        null
      }
      <AllRoutes />
      <ToastContainer />
    </div>
  )
}

export default App;
