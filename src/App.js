import {BrowserRouter, Route, Routes} from "react-router-dom"
import Landingpage from "./components/Landingpage/Landingpage"
import Homepage from "./components/Admin/Homepage/Homepage"
import HomepageStudent from "./components/student/Homepage/HomepageStudent"
import ExamPage from "./components/student/Exampage/ExamPage"

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage/>}></Route>
      <Route path="/admin/home" element={<Homepage/>}></Route>
      <Route path="/student/home/" element={<HomepageStudent/>}/>
      <Route path="/student/exam/:testid" element={<ExamPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App