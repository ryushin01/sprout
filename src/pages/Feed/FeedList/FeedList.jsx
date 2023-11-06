import FeedListItem from './FeedListItem/FeedListItem';
import '../Feed.scss';

const FeedList = () => {
  return (
    <ul className="feed-list">
      <li>
        <FeedListItem />
      </li>
    </ul>
  );
};

export default FeedList;
