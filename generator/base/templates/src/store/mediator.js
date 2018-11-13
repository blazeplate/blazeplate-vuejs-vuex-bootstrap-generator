export default function configureModerator (store, router) {
  // listen to mutations
  store.subscribe(({ type, payload }, state) => {
    switch (type) {
      case 'auth/logged_in': return router.push('/')
    }
  })
  // listen to actions
  // note: doesn't not wait for the result of async actions
  store.subscribeAction(({ type, payload }, state) => {
    switch (type) {
      case 'auth/signOut': return router.push('/')
    }
  })
}
