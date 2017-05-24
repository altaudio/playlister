import firebase from './initialiseFirebase.js'

export default (station, trackId, trackData) => {
  firebase.database().ref(`stations/${station}`).update({ [trackId]: trackData })
}

