import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Login from './components/LoginPage';
import Categories from './components/Categories';
import { SnackbarProvider } from 'notistack';
// const { enqueueSnackbar, closeSnackbar } = useSnackbar();


const App = () => {
  console.log(history, "History")

  return (
    <SnackbarProvider maxSnack={1} >
      <Router history={history}>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route exact path="/categories" component={Categories} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;

// import React from 'react';
// import { render } from 'react-dom';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import { Provider } from 'react-redux';
// // import AppRouter from './routers/AppRouter';
// import './styles/styles.css';
// import { theme } from './theme/theme';
// import configureStore from './store/config/configureStore';
// import { logout } from './store/actions/auth';
// import { SnackbarProvider } from 'notistack';

// import Providers from './providers'

// const store = configureStore();
// store.subscribe(() => {
//   // console.log(store.getState());
// });

// const App = () => (
//   <Provider store={store}>
//     <MuiThemeProvider theme={theme} >
//       <SnackbarProvider maxSnack={1}>
//         <Providers />
//       </SnackbarProvider>
//     </MuiThemeProvider>
//   </Provider>
// );