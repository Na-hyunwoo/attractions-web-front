import PropTypes from "prop-types";
import AttractionCard from "../components/attraction/AttractionCard";

/**
 *
 * @param {object} props
 * @param {array{}} props.attractions
 * @param {string} props.keyword
 */
const AttractionCardList = ({ attractions, keyword }) => {
  return (
    <ul>
      {attractions.map((attraction) => (
        <li key={attraction.id}>
          <AttractionCard
            id={attraction.id}
            name={attraction.name}
            description={attraction.description}
            coverImgUrl={attraction.coverImageUrl}
            reviews={attraction.reviews}
            like={attraction.like}
            keyword={keyword}
          />
        </li>
      ))}
    </ul>
  );
};

AttractionCardList.propTypes = {
  attractions: PropTypes.array.isRequired,
  keyword: PropTypes.string,
};

export default AttractionCardList;
