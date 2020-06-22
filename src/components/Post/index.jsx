import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class Post extends React.Component {
  render() {
    const { fileAbsolutePath } = this.props.data.node
    const postPath = fileAbsolutePath.match(/pages\/[\w|\W]{1,}(?=index.md)/)
    let thumbnailSrc

    try {
      thumbnailSrc = postPath && require('../../' + postPath + 'thumbnail.png');
    } catch {
      thumbnailSrc = ''
    }
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields

    return (
      <div className="post">
        <div className="post__thumbnail">
          <Link className="post__thumbnail-link" to={slug}>
            <img alt="post_thumb" src={thumbnailSrc} />
          </Link>
        </div>
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format('MMMM DD YYYY')}
          >
            {moment(date).format('MMMM DD YYYY')}
          </time>
          <span className="post__meta-divider" />
          <span className="post__meta-category" key={categorySlug}>
            <Link to={categorySlug} className="post__meta-category-link">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="post__description">{description}</p>
        <Link className="post__readmore" to={slug}>
          Read
        </Link>
      </div>
    )
  }
}

export default Post
