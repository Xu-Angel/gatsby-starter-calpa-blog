// Coponents
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import 'gitalk/dist/gitalk.css';

import { parseChineseDate } from '../api/';

// import ReactMarkdown from 'react-markdown';

import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Image from '../components/Image';

import './blog-post.scss';
import './toc.scss';

// import config from '../../data/config';

// Prevent webpack window problem
const isBrowser = typeof window !== 'undefined';
const Gitalk = isBrowser ? require('gitalk') : undefined;

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  componentDidMount() {
    // Gitalk
    const gitalk = new Gitalk({
      clientID: '18255f031b5e11edd98a',
      clientSecret: '2ff6331da9e53f9a91bcc991d38d550c85026714',
      repo: 'calpa.github.io',
      owner: 'calpa',
      admin: ['calpa'],
      distractionFreeMode: true,
    });
    gitalk.render('gitalk-container');
  }

  render() {
    const post = this.data.markdownRemark;

    const { title, headerImage, date } = post.frontmatter;
    return (
      <div className="row blog-post order-2">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Sidebar post />
        <div className="col-lg-8 col-md-10 col-sm-12 order-10 d-flex flex-column">
          <h1 className="title">{title}</h1>
          <p>{parseChineseDate(date)}</p>
          <Image
            href={headerImage}
            title={title}
          />
          <Content post={post.internal.content} />
        </div>

        <div id="gitalk-container" className="col-sm-12 order-12" />

      </div>
    );
  }
}

export default BlogPost;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      tableOfContents
      internal {
        content
      }
      frontmatter {
        title
        headerImage
        date
      }
    }
  }
`;
