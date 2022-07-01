import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useParams
} from "react-router-dom"; 
import Header from './component/Header';
import Navbar from './component/Navbar';
import Body from './component/Body';
import Forum from './component/Forum';
import Hot from './component/Hot';
import New from './component/New';
import MyForum from './component/MyForum';
import Signup from "./component/Signup"
import Loggin from "./component/Loggin"
function App() {
  return (
    <div>
      
      <Navbar></Navbar>
      <Header>
      </Header>
      <Router>
        <Routes>
        <Route path="/" element={<Body ></Body>}> </Route>
        <Route path="/hot" element={<Hot />}></Route>
        <Route path="/mydis" element={<MyForum></MyForum>}></Route>
        <Route path="/new" element={<New />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forum/:id" element={<Forum ></Forum>}></Route>
        <Route path="/login" element={<Loggin></Loggin>}></Route>
        </Routes>
      </Router>

    </div>
  );
}
{/* <Outlet></Outlet> */}
export default App;
