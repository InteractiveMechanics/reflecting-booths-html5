import React from 'react';
import PropTypes from 'prop-types';

  function LanguageOption(props) {
    return (
      <li className="answerOption languageOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="language"
          checked={props.languageValue === props.language}
          id={props.languageValue}
          value={props.languageValue}

          onChange={props.onLanguageSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.languageValue}>
          {props.content}
        </label>
      </li>
    );
  }

  LanguageOption.propTypes = {
    languageValue: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    onLanguageSelected: PropTypes.func.isRequired
  };

  export default LanguageOption;
