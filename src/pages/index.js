import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { get } from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import HomePageHighlights from '../components/HomePageHighlights';
import HomePageInternalProjects from '../components/HomePageInternalProjects';
import HomePageRecentArticles from '../components/HomePageRecentArticles';
import styles from './home-page.module.scss';

import OpenTelemetryIcon from '../images/open-telemetry-icon.jpg';
import freeCodeCampIcon from '../images/free-code-camp-icon.jpg';
import tensorFlowIcon from '../images/tensor-flow-icon.jpg';
import genericProjectIcon from '../images/page-heading-icon-placeholder.jpg';
import articlePlaceholderImage1 from '../images/article-placeholder-image-1.jpg';
import articlePlaceholderImage2 from '../images/article-placeholder-image-2.jpg';
import articlePlaceholderImage3 from '../images/article-placeholder-image-3.jpg';

export const query = graphql`
  query HomePageQuery {
    topProjects: allProjects(
      sort: { fields: stats___commits, order: DESC }
      limit: 8
    ) {
      edges {
        node {
          ...projectFields
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const externalProjects = [
    {
      title: 'Open Telemetry',
      description:
        'New Relic has invested 30 billion hours into the development of Open Telemetry to help provide robust portable telemetry to all.',
      icon: OpenTelemetryIcon,
      githubUrl: 'https://github.com/open-telemetry',
      website: 'https://opentelemetry.io/'
    },
    {
      title: 'freeCodeCamp',
      description:
        'New Relic has invested 1,137,000 hours of engineering into freeCodeCamp to help provide educate the next generation engineers.',
      icon: freeCodeCampIcon,
      githubUrl: 'https://github.com/freeCodeCamp/freeCodeCamp',
      website: 'https://www.freecodecamp.org/'
    },
    {
      title: 'TensorFlow',
      description:
        'We <3 TensorFlow and plan to continue to invest at least 10,000 weekly into the maintenance of the platform to help train ml mipsums.',
      icon: tensorFlowIcon,
      githubUrl: 'https://github.com/tensorflow',
      website: 'https://www.tensorflow.org/'
    }
  ];

  const internalProjects = get(data, 'topProjects.edges').map(i => i.node);
  internalProjects.forEach((p, index) => {
    internalProjects[index].iconUrl = genericProjectIcon;
    internalProjects[index].shortDescription =
      'Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui.';
  });

  const recentArticles = [
    {
      featuredImage: articlePlaceholderImage1,
      title: 'Why we invest in open source',
      snippet:
        'Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
      featuredImage: articlePlaceholderImage2,
      title: 'Open source in a pandemic',
      snippet:
        'Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
      featuredImage: articlePlaceholderImage3,
      title: 'Shipping around the globe',
      snippet:
        'Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo.'
    }
  ];

  return (
    <Layout fullWidth>
      <SEO title="Home" />
      <div className={styles.heroContainer}>
        <h2 className={styles.homepageHeroHeading}>
          The future of observability is open.
        </h2>
        <div className={styles.homepageHeroBody}>
          <p className={styles.homepageHeroBodyCopy}>
            <iframe width="426" height="240" src="https://www.youtube.com/embed/7wnav6Fu9T0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </p>
          <p className={styles.homepageHeroBodyCopy}>
            New Relic ❤️'s open source. We built this site to make it easy for <em>you</em> to <a href="/explore-projects">explore hundreds of projects</a> we're maintaining as well as our involvement in <a href="/open-standards">dozens of open standards and projects</a>. <br/><br/>Delivering on the promise of a more <strong>perfect</strong> Internet means developing more <strong>open source</strong> solutions together. <a href="/blog">Learn more</a>.
          </p>
        </div>
      </div>

      <HomePageHighlights data={externalProjects} />

      <div className={styles.featuredInternalProjectsContainer}>
        <h3 className={styles.featuredInternalProjectsSectionTitle}>
          Explore projects
        </h3>
        <p className={styles.featuredInternalProjectsSectionDescription}>
          Check out some of the products that we’re developing in open source or{' '}
          <Link to="/explore-projects">view all projects</Link>
        </p>

        <HomePageInternalProjects data={internalProjects} />
      </div>

      <div className={styles.recentArticlesContainer}>
        <h3 className={styles.recentArticlesSectionTitle}>Recent articles</h3>
        <p className={styles.recentArticlesSectionDescription}>
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam or{' '}
          <Link to="/blog">view more articles</Link>
        </p>
        <HomePageRecentArticles articles={recentArticles} />
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object
};

export default IndexPage;
