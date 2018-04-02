import React from 'react';
import PropTypes from 'prop-types';

  function LanguageOption(props) {

    let optionClass = "answerOption languageOption";
    if (props.languageValue === props.language){
      optionClass = "answerOption languageOption active";
    }

    return (
      <li className={optionClass}>
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
