# Vue.js + Vuex + Bootstrap Generator
Codotype generator for Vue.js, Vue Router, Vuex, & Bootstrap 4

## Build Setup

### Install dependencies
```
npm install
```

### Serve with hot reload at localhost:8080
```
npm run dev
```

### Build for production with minification
```
npm run build
```

### Build for production and view the bundle analyzer report
```
npm run build --report
```

### Run unit tests
```
npm run unit
```

### Run e2e tests
```
npm run e2e
```

### Run all tests
```
npm test
```

For a detailed explanation on how things work, check out the guide and docs for vue-loader.

# TODOs
- Review isAuthenticated / isAdmin default scope

- Fix toast / notifications container

- Refactor form module

- Re-integrate relational views on show pages

- Fix searching on list page

- Review Vuex store choices

- Split Vuex mixins into separate module files

- Fix "CREATE SUCCESS" toast message text

- Re-implement routing after successful create

- Move token out of local storage, manage in Cookies

- Profile fetch occurs twice on page load?
https://github.com/vuejs/vue-router/issues/1377

- Split AUTH Vuex store into smaller modules for login, register, reset password, etc.

Add predev back to package.json (or restrucutre for better development experience?)
"predev": "yarn install",