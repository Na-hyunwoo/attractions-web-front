import styled from "styled-components";
import { FillStar, HalfFillStar, LineStar } from "../assets/SVGComponent/icon";
import { typo, WHITE } from "../styles";
import PropTypes from "prop-types";

// TODO: rating을 ceil하는 더 좋은 로직이 있는가 ? 
// TODO: 논리에 오류는 없는가 ? 
/**
 * @param {object} props
 * @param {number} props.rating
 * @param {number} props.count
 */
const Rating = ({
  rating = 0,
  count
}) => {

  const ceilRating = Math.ceil(rating * 2) / 2;
  const filled = new Array(Math.floor(ceilRating)).fill(0);
  const halfFilled = isInteger(ceilRating) ? [] : [0];
  const empty = new Array(5 - filled.length - halfFilled.length).fill(0);
  const calcedCount = count > 99 ? "99+" : count;

  function isInteger(number) {
    return number % 1 === 0;
  };

  return (
    <Wrapper>
      {filled.map((item, index) => (
        <FillStar key={index} />
      ))}
      {halfFilled.map((item, index) => (
        <HalfFillStar key={index} />
      ))}
      {empty.map((item, index) => (
        <LineStar key={index} />
      ))}
      {calcedCount !== undefined && <Number>({calcedCount})</Number>}
    </Wrapper>
  );
}

Rating.propTypes = {
  rating: PropTypes.number,
  count: PropTypes.number,
}

export default Rating;

const Wrapper = styled.div`
  display: flex;
`;

const Number = styled.p`
  ${typo({
    size: "14pt", 
    height: "14pt",
    weight: 500,
    color: WHITE.DARK
  })};
  margin-left: 5px;
`;