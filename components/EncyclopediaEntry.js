import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import messages from '../auth/messages'
import Header from '../header/Header.js'
import { handleErrors, signUp, signIn, handlePost } from '../auth/api'

class Encyclopedia extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      headers: {},
      allEntries: [],
      testEntries: []
    }
  }

  async componentDidMount() {
    const { flash, user } = this.props
    const response = await axios.get(apiUrl + '/species', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      }
    })
    this.setState({ allEntries: response.data.allSpecies })
  }

  render () {
    const encyclopedia = this.state.allEntries.map(species => {
      console.log('species is', species)
      return (
        <Encyclopedia key={species._id}
          id={species._id}
          name={species.englishName}
        />
      )
    })

    return (
    )
  }
}

export default withRouter(Encyclopedia)
