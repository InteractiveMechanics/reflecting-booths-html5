import React from 'react';
import LanguageOption from '../components/LanguageOption';
import PropTypes from 'prop-types';

function LanguageSelect(props) {
  // function renderLanguageOptions(key) {
  //   console.log(key)
  //   return (
  //     <LanguageOption
  //       key={key}
  //       languageValue={key}
  //       language={props.language}
  //       onLanguageSelected={props.onLanguageSelected}
  //     />
  //   );
  // }


  const languageOptions = props.languageOptions;
  console.log(languageOptions);
  return (

    <div>
      <ul className="answerOptions">
        {languageOptions.map((option) =>
          <LanguageOption
          key={option.english}
          languageValue={option.english}
          content={option.native}
          language={props.language}
          onLanguageSelected={props.onLanguageSelected}
        />
      )}
      </ul>
    </div>
);
}
  LanguageSelect.propTypes = {
    language: PropTypes.string.isRequired,
    languageOptions: PropTypes.array.isRequired,
    onLanguageSelected: PropTypes.func.isRequired
  };



  export default LanguageSelect;
