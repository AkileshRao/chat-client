import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'
import { SocketProvider } from './socketContext'
import { MainProvider } from './mainContext'
import './App.css'
import { ChakraProvider, Flex } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <MainProvider>
        <SocketProvider>
          <Flex className="App" align='center' justifyContent='center'>
            <Router>
              <Route exact path='/' component={Login} />
              <Route path='/chat' component={Chat} />
            </Router>
          </Flex>
        </SocketProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App;
