import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomeScreen from "./screens/homeScreen"

const App = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
