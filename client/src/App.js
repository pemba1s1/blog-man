import { Layout } from "antd";
import "antd/dist/antd.css";
import Foot from './components/Footer/'
import Nav from "./components/Nav";
import { Router } from "./router/Router";
import './styles/index.css'

function App() {
  return (
    <Layout style={{backgroundColor:"white"}}>
      <Nav></Nav>
        <Router/>
      <Foot />
    </Layout>
  );
}

export default App;
