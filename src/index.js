import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'octicons'

import React from 'react'
import {render} from 'react-dom'

import Home from './home'

render(<Home/>, document.querySelector('#react'))
