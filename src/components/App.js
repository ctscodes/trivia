import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {

  render () {
    return <div className='startscreen'>
      <h1>Batman vs The Riddler!</h1>
      <nav>
        <ul>
          <li><Link to='/'>Back</Link></li>
        </ul>
      </nav>
      <main>
        {this.props.children}
      </main>
    </div>
  }
}

export default App
