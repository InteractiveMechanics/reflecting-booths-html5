import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

function FadeContent(props) {


  return (
    <CSSTransition
             in={true}
             classNames="fade"
             appear={true}
             timeout={5000}>
                  <h4 className={props.class}>{props.content}</h4>
          </CSSTransition>
        )
}

FadeContent.propTypes = {
  content: PropTypes.object.isRequired,
  class: PropTypes.string.isRequired
};

export default FadeContent;
