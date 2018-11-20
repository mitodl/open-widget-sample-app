import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Octicon from 'react-component-octicons'
import WidgetList from '@zagaran/open-widget-framework/es/widget_list'
import { ModalFormWrapper, ConfirmDeleteWidgetWrapper, HighlightEditListWrapper } from "./wrappers";
import { defaultSettings } from '@zagaran/open-widget-framework/es/config'

import {apiPath} from '@zagaran/open-widget-framework/es/utils'


class Home extends Component {
  /**
   * Home is the home page of the sample widget-framework app. It renders a list of widget lists and one specified
   * widget list
   *
   * Props:
   *    fetchRoute: where to widget lists from
   *    baseUrl: the base url to build api endpoints off of
   */
  state = {
    widgetLists: null,
    mySettings: {
      // FormWrapper: ModalFormWrapper,
      // WidgetWrapper: ConfirmDeleteWidgetWrapper,
      // ListWrapper: HighlightEditListWrapper,
    },
    ...defaultSettings,
  }

  componentDidMount() {
    /**
     * Fetch data on widget lists from fetchRoute
     */
    const { fetchData, errorHandler } = this.state
    fetchData(apiPath('get_lists'))
      .then(data => { this.setState({widgetLists: data.map(widgetList => widgetList.id)}) })
      .catch(errorHandler)
  }

  addList = () => {
    /**
     * Make request to create new widget list
     */
    const { fetchData, errorHandler, widgetLists } = this.state
    fetchData(apiPath('widget_list'), {method: 'POST'})
      .then(data => {
        widgetLists.push(data.id)
        this.setState({widgetLists: widgetLists})
      })
      .catch(errorHandler)
  }

  deleteList = (listId) => {
    /**
     * Make request to delete widget list
     * NOTE: we just use fetch here because the DELETE method doesn't return json data
     */
    const { errorHandler, widgetLists } = this.state
    fetch(apiPath('widget_list', listId), {method: 'DELETE'})
      .then(() => {
        widgetLists.splice(widgetLists.indexOf(listId), 1)
        this.setState({widgetLists: widgetLists})
      })
      .catch(errorHandler)
  }

  render() {
    /**
     * Render background list of available widget lists and one WidgetList specified in the route using react-router
     */
    const { widgetLists, Loader } = this.state
    if (widgetLists === null) {
      return <Loader/>
    } else {
      return (
        <Router>
          <div className={'widget-home'}>
            <Route path='/list/:widgetListId' render={({match}) => (
              <WidgetList widgetListId={match.params.widgetListId}
                          {...this.state.mySettings}
              />
            )}/>
            <div className={'widget-list-navigator container'}>
              <Link className={'btn btn-link mt-3'} to='/'>Home</Link>
              <hr/>

              <h2>Widget Lists</h2>
              <ul className={'mt-3'}>
                {widgetLists.map(
                  (widgetListId) => <li className={''} key={widgetListId}>
                    <Link to={'/list/' + widgetListId}>Widget List {widgetListId}</Link>
                    <span className={'btn text-danger'} onClick={() => this.deleteList(widgetListId)}>
                      <Octicon name={'x'}/>
                    </span>
                  </li>
                )}
                <li className={'btn text-success'} onClick={this.addList}>Add new widget list</li>
              </ul>
            </div>
          </div>
        </Router>
      )
    }
  }
}

export default Home
