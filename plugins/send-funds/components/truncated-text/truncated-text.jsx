/**
 * @fileoverview Text renderer that truncates text
 * @author Gabriel Womble
 */
import React from 'react';
import { PROP_TYPES } from 'lib/constants';

const { numberOrString } = PROP_TYPES;

function TruncatedText({ column, value }) {
  const renderedValue = column || value;

  return (
    <div className="truncated-text">
      <p>{renderedValue}</p>
      <style jsx>
        {`
          .truncated-text {
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
          }

          .truncated-text > p {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </div>
  );
}

TruncatedText.propTypes = {
  column: numberOrString,
  value: numberOrString,
};

TruncatedText.defaultProps = {
  column: null,
  value: '',
};

export { TruncatedText };
