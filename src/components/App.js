import React from 'react'
import { hot } from 'react-hot-loader'
import Header from "./Header";
import MemeGenerator from "./MemeGenerator";

class App extends React.Component {
  render() {
    return (
      <div>
          <Header />
          <MemeGenerator />
      </div>
    )
  }
}

export default hot(module)(App)
