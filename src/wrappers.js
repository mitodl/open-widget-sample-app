import React, {Component} from 'react'
import ReactModal from 'react-modal'
import Octicon from 'react-component-octicons'


class HighlightEditListWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      addWidgetForm: false,
      editWidgetForm: null,
    }
    this.renderAddWidgetButton = this.renderAddWidgetButton.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  renderAddWidgetButton() {
    return (
      <button className={'btn btn-info col'} onClick={() => this.setState({
        addWidgetForm: !this.state.addWidgetForm,
        editWidgetForm: null,
      })}>
        New Widget
      </button>
    )
  }

  closeForm() {
    this.setState({
      addWidgetForm: false,
      editWidgetForm: null,
    })
  }

  render() {
    const { editWidgetForm, addWidgetForm } = this.state
    const { renderEditWidgetForm, renderNewWidgetForm, renderList } = this.props
    return (
      <div className={'col-lg-4 float-right m-8 '}>
        <p>This list will highlight the widget that is currently being edited. It's defined in HighlightEditListWrapper</p>
        {addWidgetForm ? renderNewWidgetForm({
          closeForm: this.closeForm,
          listPropClassNames: 'text-success border border-success rounded'
        }) : null}
        {editWidgetForm !== null
          ? renderEditWidgetForm(editWidgetForm, {
          closeForm: this.closeForm,
          listPropClassNames: 'text-info border border-info rounded'
        }) : null}
        {renderList({
          editWidget: widgetId => this.setState({
            editWidgetForm: widgetId,
            addWidgetForm: false,
          }),
          highlightedWidget: editWidgetForm,
        })}
        <hr/>
        {this.renderAddWidgetButton()}
      </div>
    )
  }
}

class ConfirmDeleteWidgetWrapper extends Component {
  renderMoveWidgetBar() {
    const { position, listLength, moveWidget } = this.props
    return (
      <div className={'reposition-widget-bar btn-group-vertical col-lg-3'}>
        <button className={'btn btn-light'}
                disabled={position === 0}
                onClick={() => moveWidget(0)}
                title={'Move widget to top'}>
          <Octicon zoom="x2" name={'triangle-up'} />
        </button>
        <button className={'btn btn-light'}
                disabled={position === 0}
                onClick={() => moveWidget(position - 1)}
                title={'Move widget up one position'}>
          <Octicon zoom="x2" name={'chevron-up'}/>
        </button>
        <button className={'btn btn-light'}
                disabled={position === listLength - 1}
                onClick={() => moveWidget(position + 1)}
                title={'Move widget down one position'}>
          <Octicon zoom="x2" name={'chevron-down'}/>
        </button>
        <button className={'btn btn-light'}
                disabled={position === listLength - 1}
                onClick={() => moveWidget(listLength - 1)}
                title={'Move widget to bottom'}>
          <Octicon zoom="x2" name={'triangle-down'}/>
        </button>
      </div>
    )
  }

  render() {
    const { deleteWidget, editWidget, id, listPropClassNames, highlightedWidget, renderWidget } = this.props
    return (
      <div className={'widget-wrapper row mb-3 p-3 rounded ' + (highlightedWidget === id ? 'bg-primary' : 'bg-secondary')}>
        {this.renderMoveWidgetBar()}
        <div className={'widget-main col-lg-9'}>
          <div className={'edit-delete-widget-bar btn-group col'}>
            <button className={'btn btn-primary col'} onClick={() => editWidget(id)}
                    title={'Update widget'}>
              <Octicon zoom="x2" name={'pencil'}/>
            </button>
            <button className={'btn btn-danger col'}
                    onClick={() => {if (confirm('Are you sure you want to delete this widget?')) {deleteWidget(id)}}}
                    title={'Delete widget'}>
              <Octicon zoom="x2" name={'x'}/>
            </button>
          </div>
          <div className={'widget bg-light mt-3 rounded'}>
            {renderWidget()}
          </div>
        </div>
        <p>These buttons are created in the ConfirmDeleteWidgetWrapper</p>
        <p className={listPropClassNames}>This message is styled by HighlightEditListWrapper</p>
      </div>
    )
  }
}

class ModalFormWrapper extends Component {
  render() {
    const { closeForm, renderForm, updateWidgetList, listPropClassNames } = this.props
    return (
      <ReactModal isOpen={true} onRequestClose={closeForm} className='widget-form-modal container mt-4 col-lg-4'>
        <p className={'text-primary'}>This modal is created in the ModalFormWrapper</p>
        <p className={listPropClassNames}>This message is styled by HighlightEditListWrapper</p>
        {renderForm({
          onSubmit: data => {
            updateWidgetList(data)
            closeForm()
          },
        })}
      </ReactModal>
    )
  }
}

export { ModalFormWrapper, ConfirmDeleteWidgetWrapper, HighlightEditListWrapper }
