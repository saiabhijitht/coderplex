import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

export default class TreeView extends React.PureComponent {
  state = {
    collapsed: this.props.defaultCollapsed,
  };

  handleClick = (...args) => {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  };

  render() {
    const {
      collapsed = this.state.collapsed,
      className = '',
      itemClassName = '',
      treeViewClassName = '',
      childrenClassName = '',
      nodeLabel,
      children,
      defaultCollapsed,
      ...rest
    } = this.props;

    const Container = styled.div`
      /* the tree node's style */
      .tree-view {
        overflow-y: hidden;
      }

      .tree-view_item {
        /* immediate child of .tree-view, for styling convenience */
      }

      /* style for the children nodes container */
      .tree-view_children {
        margin-left: 16px;
      }

      .tree-view_children-collapsed {
        height: 0px;
      }

      .tree-view_arrow {
        cursor: pointer;
        margin-right: 6px;
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .tree-view_arrow:after {
        content: '▾';
      }

      /* rotate the triangle to close it */
      .tree-view_arrow-collapsed {
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
      }
    `;

    let arrowClassName = 'tree-view_arrow';
    let containerClassName = 'tree-view_children';
    if (collapsed) {
      arrowClassName += ' tree-view_arrow-collapsed';
      containerClassName += ' tree-view_children-collapsed';
    }

    const arrow = <div {...rest} className={className + ' ' + arrowClassName} onClick={this.handleClick} />;

    return (
      <Container>
        <div className={'tree-view ' + treeViewClassName}>
          <div className={'tree-view_item ' + itemClassName}>
            {arrow}
            {nodeLabel}
          </div>
          <div className={containerClassName + ' ' + childrenClassName}>{collapsed ? null : children}</div>
        </div>
      </Container>
    );
  }
}

TreeView.propTypes = {
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  nodeLabel: PropTypes.node.isRequired,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  childrenClassName: PropTypes.string,
  treeViewClassName: PropTypes.string,
};
