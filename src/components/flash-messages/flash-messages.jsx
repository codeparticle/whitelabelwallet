import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import customPropTypes from 'lib/custom-prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { messageTypes } from 'rdx/modules/messages/constants';
import './flash-messages.scss';

class FlashMessages extends Component {
  hoverActive = false;

  state = {
    items: [],
    statuses: {},
  }

  componentDidUpdate(prevProps) {
    const { latestMessage } = this.props;

    if (latestMessage.id !== prevProps.latestMessage.id && latestMessage.id) {
      this.addItem(latestMessage);
    }
  }

  onAnimationEnd = (animName, item) => {
    if (animName === 'close') {
      this.removeItem(item);
    } else if (animName === 'open') {
      if (this.hoverActive) {
        this.setItemStatus(item, 'hovering');
      } else {
        this.setItemStatus(item, 'opened');
      }
    }
  }

  setItemStatus(item, status) {
    const { statuses } = this.state;
    const newStatuses = Object.assign({}, statuses, { [item.id]: status });
    this.setState({ statuses: newStatuses });
  }

  setAllItemStatuses(status) {
    if (status === 'hovering') {
      this.hoverActive = true;
    } else {
      this.hoverActive = false;
    }

    const { statuses } = this.state;
    const newStatuses = {};
    const keys = Object.keys(statuses);

    for (let i = 0; i < keys.length; i += 1) {
      const oldStatus = statuses[keys[i]];
      // if clicked or opening, prevent status change
      if (oldStatus !== 'clicked' && oldStatus !== 'opening') {
        newStatuses[keys[i]] = status;
      } else {
        newStatuses[keys[i]] = oldStatus;
      }
    }

    this.setState({ statuses: newStatuses });
  }

  addItem(item) {
    const { items, statuses } = this.state;
    const newStatuses = Object.assign({}, statuses, { [item.id]: 'opening' });
    const newItems = items.concat(item);
    this.setState({ items: newItems, statuses: newStatuses });
  }

  removeItem(item) {
    const { items, statuses } = this.state;
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      const newItems = items.slice(0);
      newItems.splice(index, 1);
      const newStatuses = Object.assign({}, statuses);
      delete newStatuses[item.id];
      this.setState({ items: newItems, statuses: newStatuses });
    }
  }

  renderItems() {
    const { items, statuses } = this.state;
    return items.map((item) => {
      const { type } = item;
      const status = statuses[item.id];
      const className = classNames(
        'item',
        status === 'opening' && 'open-anim',
        status === 'hovering' && 'stay-open',
        status === 'opened' && 'close-after-wait',
        status === 'clicked' && 'close-immediate',
        type === messageTypes.ERROR && 'error',
      );
      return (
        <div
          key={item.id}
          className={className}
          onMouseEnter={() => this.setAllItemStatuses('hovering')}
          onMouseLeave={() => this.setAllItemStatuses('opened')}
          onClick={() => this.setItemStatus(item, 'clicked')}
          role="presentation"
          onAnimationEnd={({ nativeEvent }) => this.onAnimationEnd(nativeEvent.animationName, item)}
        >
          {item.text}
        </div>
      );
    });
  }

  render() {
    const { items } = this.state;

    if (items.length < 1) {
      return null;
    }

    return (
      <div
        className="flash-messages-rct-component"
      >
        {this.renderItems()}
      </div>
    );
  }
}

FlashMessages.propTypes = {
  latestMessage: customPropTypes.message,
};

FlashMessages.defaultProps = {
  latestMessage: {},
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
  latestMessage: 'getGenericMessageEvt',
});

export default connect(stateMapper, actionsMapper)(FlashMessages);
