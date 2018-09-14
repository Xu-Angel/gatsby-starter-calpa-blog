import React from 'react';

import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import ExternalLink from '../ExternalLink';

import './index.scss';

const CommentButton = () => (
  <a
    className="share-button"
    style={{
      lineHeight: '1.7rem',
      color: '#337ab7',
      paddingLeft: '0.15rem',
    }}
    href="#gitalk-container"
    onClick={() =>
      ReactGA.event({
        category: 'User',
        action: 'Goto Comment Box',
      })}
  >
    <i className="fa fa-comment-o" />
  </a>
);

const ShareBox = ({ url, hasCommentBox }) => (
  <div className="m-share-box">
    <ExternalLink
      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      title=""
      className="share-button fa fa-facebook"
    />

    {/* 視覺置中 => 稍微往上偏移 */}
    {hasCommentBox && <CommentButton />}

    <a
      className="share-button"
      href="#header"
      onClick={() => {
        ReactGA.event({
          category: 'User',
          action: 'Scroll to Top',
        });
      }}
      style={{
        lineHeight: '1.7rem',
        paddingLeft: '0.1rem',
      }}
    >
      <i className="fa fa-chevron-up" />
    </a>
  </div>
);

ShareBox.propTypes = {
  url: PropTypes.string.isRequired,
  hasCommentBox: PropTypes.bool,
};

ShareBox.defaultProps = {
  hasCommentBox: true,
};

export default ShareBox;
