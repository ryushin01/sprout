import FeedList from './FeedList/FeedList';
import './Feed.scss';

const Feed = () => {
  return (
    <main className="feed">
      <section className="feed-section">
        <FeedList />
      </section>
    </main>
  );
};

export default Feed;
