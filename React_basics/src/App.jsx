import UserCard from "./components/userCard_props/UserCard"
import './App.css'
import pic1 from './assets/pic1.jpeg'
import pic2 from './assets/pic2.jpeg'
import pic3 from './assets/pic3.jpeg'


function App() {
  return (
      <div className="container">
        <UserCard name="Ram" desc="Full stack developer" image={pic1} style={{"border-radius":"10px"}}/>
        <UserCard name="Arjun" desc="Java developer" image={pic2} style={{"border-radius":"10px"}}/>
        <UserCard name="Surya" desc="Python developer" image={pic3} style={{"border-radius":"10px"}}/>
      </div>

  )
}


export default App
