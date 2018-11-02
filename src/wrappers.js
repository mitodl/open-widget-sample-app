import React, {Component} from 'react'
import ReactModal from 'react-modal'

class MyListWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addWidgetModeActive: false,
    }
  }

  renderAddWidgetModal() {
    return (
      <ReactModal className={'edit-widget-modal btn-group card-header'}
                  isOpen={this.state.addWidgetModeActive}>
        <form className='widget-modal-form'>
          <div className='widget-form-group form-group'>
            WidgetForm
          </div>
          <button className={'edit-widget-submit btn btn-primary'} type='submit'>Submit</button>
        </form>
      </ReactModal>
    )
  }

  render() {
    return (
      <div>
        <div className={'edit-widget-list-bar btn-group'} role={'group'}>
          <button className={'btn btn-info'} onClick={this.setState({addWidgetModeActive: true})}>
            Add a new widget
          </button>
          {this.renderAddWidgetModal()}
        </div>
        <hr/>
        <div>
          {this.props.renderList()}
        </div>
      </div>
    )
  }
}

class MyWidgetWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editWidgetModeActive: false,
      newWidgetPosition: null,
    }
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.moveWidget(this.state.newWidgetPosition)
  }

  renderEditModal() {
    return (
      <ReactModal className={'edit-widget-modal btn-group card-header'}
                  isOpen={this.state.editWidgetModeActive}>
        <form className='widget-modal-form container'>
          <div className='widget-form-group form-group'>
            <label className='widget-form-label'
                   htmlFor={'widget-position-input'}>
              Set widget position
            </label>
            <input type={'number'} onChange={(event) => this.setState({newWidgetPosition: event.target.value})}/>
          </div>
          <button className={'edit-widget-submit btn btn-primary'} type='submit'>Submit</button>
          <button className={'delete-widget btn btn-primary'} onClick={this.props.deleteWidget}>Delete</button>
          <button className={'cancel-widget btn btn-primary'} onClick={this.setState({editWidgetModeActive: false})}>
            Cancel
          </button>
        </form>
      </ReactModal>
    )
  }

  render() {
    return (
      <div className={'widget card mb-3 bg-light'}>
        <button className={'btn btn-info col'}
                onClick={() => this.setState({editWidgetModeActive: !this.state.editWidgetModeActive})}
                title={'Open edit widget modal'}>
          Edit Widget
        </button>
        {this.renderEditModal()}
        {this.props.renderWidget()}
      </div>
    )
  }
}

export {MyListWrapper, MyWidgetWrapper}
