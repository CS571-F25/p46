import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import GenerateQuiz from './components/GenerateQuiz'
import PreGeneratedQuizzes from './components/PreGeneratedQuizzes'
import CustomQuizzes from './components/CustomQuizzes'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/generate" element={<GenerateQuiz />}></Route>
          <Route path="/pre-generated" element={<PreGeneratedQuizzes />}></Route>
          <Route path="/custom" element={<CustomQuizzes />}></Route>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
