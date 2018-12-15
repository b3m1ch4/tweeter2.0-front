import React, { Component } from 'react'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'
import { handleErrors, signUp, signIn, handlePost } from '../auth/api'
import messages from '../auth/messages'
import Header from '../header/Header.js'
import user from '../apiConfig.js'
import axios from 'axios'

class CreateSighting extends React.Component {
  constructor () {
    super ()

    this.state = {
      entry: '',
      description: '',
      image: ''
    }
  }

  logSighting = async (sighting, user) => {
    event.preventDefault()
    const response = await axios.post(`${apiUrl}/sightings`, { sighting }, {
      'headers': {
        'Authorization': `Token token=${user.token}`
      }
    })
    return response
  }

  handleChange = (event) => {
    const { name, type, value } = event.target
    console.log( {name, type, value} )
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  };

  uploadFile = async event => {
    console.log('uploading file')
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'tweeter')
    const res = await fetch('https://api.cloudinary.com/v1_1/dln5bha2g/image/upload', {
      method: 'POST',
      body: data
    })
    const file = await res.json()
    console.log(file)
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

  postSighting = event => {
    event.preventDefault()
    const { entry, description, image } = this.state
    const { flash, history, setUser, user } = this.props
    const data = (this.state)

    this.logSighting(data, user)
      .then(handlePost)
      .then(() => flash(messages.postSuccess, 'flash-success'))
      .then(() => history.push('/privateindex'))
      .catch(() => flash(messages.failure, 'flash-error'))
  }

  render () {
    return (
      <div>
        <h1> Post! </h1>
        <form action="/sightings" onSubmit={this.postSighting} encType="multipart/form-data" id="sightings-form">
          <fieldset>
            <label htmlFor="entry">entry</label>
            <input
              required
              name="entry"
              value={this.entry}
              type="text"
              placeholder="entry"
              onChange={this.handleChange}
              pattern="[a-zA-Z0-9-\s]+"
            />

            <label htmlFor="description">description</label>
            <input
              required
              name="description"
              value={this.description}
              type="description"
              placeholder="entry"
              onChange={this.handleChange}
              pattern="[a-zA-Z0-9-\s]+"
            />

            <label htmlFor="image">image</label>
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Upload an image"
              required
              onChange={this.uploadFile}
            />
            {this.state.image && <img src=
              {this.state.image} alt="Preview" />}
            <button type="submit">post a bird sighting!</button>

          </fieldset>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateSighting)
