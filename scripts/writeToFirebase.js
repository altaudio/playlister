import firebase from './initialiseFirebase.js'

export default (station, trackId, trackData) => {
  firebase.database().ref(`/${station}`).update({ [trackId]: trackData })
}

