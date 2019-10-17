import React from 'react';
import ReactDOM from 'react-dom';

/** s
 * Local imports
 */
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import Main from 'Main';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
