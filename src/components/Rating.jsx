import styled from "styled-components";
import { FillStar, HalfFillStar, LineStar } from "../assets/svgComponents/icon";
import { typo, WHITE } from "../styles";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

/**
 * @param {object} props
 * @param {number} props.rating
 * @param {number} props.count
 */
const Rating = ({ rating = 0, count }) => {
  const ceilRating = Math.ceil(rating * 2) / 2;
  const filled = new Array(Math.floor(ceilRating)).fill(0);
  const halfFilled = isInteger(ceilRating) ? [] : [0];
  const empty = new Array(5 - filled.length - halfFilled.length).fill(0);
  const calcedCount = count > 99 ? "99+" : count;

  function isInteger(number) {
    return number % 1 === 0;
  }

  return (
    <Wrapper>
      {filled.map((item) => (
        <FillStar key={nanoid()} />
      ))}
      {halfFilled.map((item) => (
        <HalfFillStar key={nanoid()} />
      ))}
      {empty.map((item) => (
        <LineStar key={nanoid()} />
      ))}
      {calcedCount !== undefined && <Number>({calcedCount})</Number>}
    </Wrapper>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  count: PropTypes.number,
};

export default Rating;

const Wrapper = styled.div`
  display: flex;
`;

const Number = styled.span`
  ${typo({
    size: "14pt",
    height: "14pt",
    weight: 500,
    color: WHITE.DARK,
  })};
  margin-left: 5px;
`;
