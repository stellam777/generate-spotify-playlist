import React from 'react';
import Switch from 'react-switch';

//true = public, false = private
const initState = {
  name: '',
  checked: true,
};

class AddToSpotifyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // (1) creates the new playlist (2) adds items to the playlist
    console.log('PROPS', this.props.recResults);
  }

  render() {
    //console.log('HANDLE CHANGE', this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Playlist Name</label>
            <input
              type='text'
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
          <div className='form-group'>
            <label>
              <span>Public</span>
              <Switch
                name='checked'
                onChange={(e) =>
                  this.setState({ checked: !this.state.checked })
                }
                checked={this.state.checked}
              />
            </label>
          </div>
          <button type='submit' className='btn btn-primary'>
            Save Playlist to Spotify
          </button>
        </form>
      </div>
    );
  }
}

export default AddToSpotifyForm;
