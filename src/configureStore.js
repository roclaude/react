import { createStore } from 'redux'


// reducer
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

//const store = createStore(todos, ['Use Redux'])
const configureStore = () => {

  return createStore(todos, ['Use Redux'])
}

export default configureStore

/*
store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})

console.log(store.getState())
*/






/*
import { createStore } from 'redux'

const configureStore = () => {

    return createStore( reducer )
}

export default configureStore


const reducer = () => {

    return  {ola: 'ola', hopa: 'hopa'}
}
*/






/*
import { createStore } from 'redux'

// reducer
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos, ['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})

console.log(store.getState())
*/
