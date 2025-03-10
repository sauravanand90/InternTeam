import UserCard from "./components/userCard_props/UserCard"
import "./App.css"
import pic2 from "./assets/pic2.jpg"
import pic3 from "./assets/pic3.jpg"
import pic4 from "./assets/pic4.jpg"

function App() {
  return (
    <div className="container">
      <UserCard name="Aditi Shrinet" desc="Works as Software Developer in Delhi" image={pic2} style={{"border-radius":"10px"}}/>
      <UserCard name="Sneha Mishra" desc="Works as Data Analyst in Mumbai" image={pic3} style={{"border-radius":"10px"}}/>
      <UserCard name="Mansi Singh" desc="Works as Full Stack Developer in Pune" image={pic4} style={{"border-radius":"10px"}}/>
    </div>
  )
}
export default App;
