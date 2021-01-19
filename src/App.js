import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'
import { MainProvider } from './mainContext'

function App() {
  return (
    <MainProvider>
      <div className="App">
        <Router>
          <Route exact path='/' component={Login} />
          <Route path='/chat' component={Chat} />
        </Router>
      </div>
    </MainProvider>
  );
}

export default App;
