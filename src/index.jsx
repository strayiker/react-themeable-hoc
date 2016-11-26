/**
 * Created by mesnyankin_k on 06.07.2016.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import omit from 'lodash/omit';
import hoc from 'react-hoc-hoc';


@hoc
export default class Themeable extends Component {
  static defaultProps = {
    theme: 'defaultTheme'
  };

  static propTypes = {
    hocProps: PropTypes.shape({
      component: PropTypes.func.isRequired,
      args: PropTypes.array
    }).isRequired,
    theme: PropTypes.string,
    styles: PropTypes.object,
    className: PropTypes.string
  };

  getStyles() {
    const {
      hocProps: {
        args: [{
          defaultTheme,
          ...themes
        }]
      },
      styles,
      className
    } = this.props;

    const theme = this.props.theme !== 'default'
      ? this.props.theme
      : 'defaultTheme';
    const themeStyles = themes[theme] || defaultTheme || {};

    return {
      ...themeStyles,
      ...styles,
      [className]: className,
      cx: classNames
    };
  }

  getRefInstance() {
    if (typeof this.instance.getRefInstance === 'function') {
      return this.instance.getRefInstance();
    }
    return this.instance;
  }

  render() {
    const {
      hocProps: {
        component: Composed
      }
    } = this.props;

    const props = omit(this.props, [
      'hocComposed',
      'hocArgs',
      'theme',
      'styles'
    ]);

    const styles = this.getStyles();

    return (
      <Composed
        ref={(c) => { this.instance = c; }}
        styles={styles}
        {...props}
      />
    );
  }
}
