import React from 'react';
import Switch from 'react-switch';
import axios from 'axios';

//true = public, false = private
const initState = {
  name: 'Trax:',
  checked: true,
};

class AddToSpotifyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  async createPlaylist() {
    const { recResults, userId, auth } = this.props;
    const token = auth.token;

    //create playlist
    const info = { name: this.state.name, public: this.state.checked };
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const { data } = await axios.post(`${url}`, info, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //add songs to playlist
    const playlistId = data.id;
    const addItemsUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const uris = [...recResults].map(track => track.uri);

    if(data) {
      const { nextData } = await axios.post(`${addItemsUrl}`, JSON.stringify({"uris": uris}), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createPlaylist();
    this.setState(initState)
  }

  render() {
    //console.log('PROPS', this.props);
    return (
      <div className="add-playlist-form mt-4">
        {this.props.auth && <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Playlist Name:</label>
            <input
              type='text'
              autoComplete='off'
              name='name'
              onChange={(e) =>
                this.setState({ ...this.state, name: e.target.value })
              }
              value={this.state.name}
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='playlist-name'
            />
          </div>
          <div className='custom-control custom-checkbox mb-2'>
            <input
              className="custom-control-input"
              id="customCheck1"
              type="checkbox"
              name="checked"
              onChange={(e) =>
                this.setState({ checked: !this.state.checked })
              }
              checked={this.state.checked}/>
            <label className="custom-control-label" htmlFor="customCheck1">Public</label>
          </div>
          <div className="row justify-content-center">
            <button type='submit' className='btn custom-btn'>Save Playlist to Spotify</button>
          </div>
        </form>}
        {!this.props.auth && <div><h6 className="text-center">Sign in with Spotify to save playlists to your account</h6><div className="row justify-content-center mt-3">
          <a href={'/auth/login'}><button type='submit' className='btn custom-btn'>Login to Save</button></a>
        </div>
        </div>}
      </div>
    );
  }
}

export default AddToSpotifyForm;
