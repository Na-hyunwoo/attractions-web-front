import PropTypes from "prop-types";
import AttractionCard from "../components/attraction/AttractionCard";

/**
 * 
 * @param {object} props
 * @param {array{}} props.attractions
 */
const AttractionCardList = ({attractions}) => {
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
        />
      ))}
    </div>
  );
};

AttractionCardList.propTypes = {
  attractions: PropTypes.array.isRequired, 
};

export default AttractionCardList;