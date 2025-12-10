import { HashRouter, Route, Routes } from 'react-router-dom'
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
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GenerateQuiz />} />
          <Route path="/pre-generated" element={<PreGeneratedQuizzes />} />
          <Route path="/custom" element={<CustomQuizzes />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
