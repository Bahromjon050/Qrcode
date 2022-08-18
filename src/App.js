import './App.css';
import { Qrcode } from './components/Qrcode';
import AOS from 'aos';
AOS.init();


function App() {
  return (
    <>
      <Qrcode />
    </>
  )
}

export default App;