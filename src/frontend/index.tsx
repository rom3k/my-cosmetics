import * as React from 'react';
import * as ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import 'semantic-ui-css/semantic.min.css';

const HelloComponent = loadable(() =>
  import(/* webpackChunkName: "helloComponent" */ './components/Hello')
);

const root = document.getElementById('root');
ReactDOM.render(<HelloComponent />, root);
