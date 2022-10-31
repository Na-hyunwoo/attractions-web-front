import PropTypes from "prop-types";
import AttractionCard from "../components/attraction/AttractionCard";

/**
 * 
 * @param {object} props
 * @param {array{}} props.attractions
 * @param {string} props.keyword
 */
const AttractionCardList = ({
  attractions,
  keyword
}) => {
  return (
    <div>
      {attractions.map(attraction => (
        <AttractionCard 
          key={attraction.id}
          id={attraction.id}
          name={attraction.name}
          description={attraction.description}
          coverImgUrl={attraction.coverImageUrl}
          reviews={attraction.reviews}
          like={attraction.like}
          keyword={keyword}
        />
      ))}
    </div>
  );
};

AttractionCardList.propTypes = {
  attractions: PropTypes.array.isRequired, 
  keyword: PropTypes.string
};

export default AttractionCardList;