import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Footer from "./components/footer"
import HomeScreen from "./screens/homeScreen"
import LoginScreen from "./screens/loginScreen"
import RegisterScreen from "./screens/registerScreen"
import Header from "./components/header"
import CartScreen from "./screens/cartScreen"
const App = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Header></Header>
          <Switch>
            <Route path="/register" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/cart/:id" component={CartScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route exact path="/" component={HomeScreen} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
