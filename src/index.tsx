/* @refresh reload */
import {render} from 'solid-js/web';
import {RouteDefinition, Router} from '@solidjs/router';
import './index.css';

// import App from './App';
import {routes} from './router';
import Header from './components/Header';
import FloatButton from './components/floatButton';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

// render(() => <App />, root!);
render(() => {
  return (
    <>
      <Header />
      <Router>{routes}</Router>
      {location.pathname === '/' && <FloatButton />}
    </>
  );
}, root!);
