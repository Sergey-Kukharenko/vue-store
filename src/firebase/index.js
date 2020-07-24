import * as fb from 'firebase'

export const firebaseGetVal = async path => {
    const ref = await fb.database().ref(path).once('value')
    return ref.val()
}

export const firebaseGet = async path => {
    const ref = await fb.database().ref(path)
    return ref;
}

