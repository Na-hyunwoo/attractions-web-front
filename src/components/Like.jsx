import styled from "styled-components";
import { FillHeart, LineHeart } from "../assets/SVGComponent/icon";
import { typo, WHITE } from "../styles";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {number} props.count
 * @param {boolean} props.isLike
 * @param {function()} props.handleClickFillHeart
 * @param {function()} props.handleClickLineHeart
 */
const Like = ({
  count,
  isLike = false,
  handleClickFillHeart = () => {},
  handleClickLineHeart = () => {}
}) => {
  return (
    <Wrapper>
      <Number>{
        count > 999 
          ? "999+"
          : count
      }</Number>
      {isLike 
        ? <FillHeart style={{cursor: "pointer"}} onClick={handleClickFillHeart}/>
        : <LineHeart style={{cursor: "pointer"}} onClick={handleClickLineHeart}/>
      }
    </Wrapper>
  );
};

Like.propTypes = {
  count: PropTypes.number.isRequired,
  isLike: PropTypes.bool,
  handleClickFillHeart: PropTypes.func,
  handleClickLineHeart: PropTypes.func,
}

export default Like;

const Wrapper = styled.div`
  display: flex;
`;

const Number = styled.p`
  ${typo({
    size: "14pt", 
    height: "16pt",
    weight: 700,
    color: WHITE.DARK
  })};
  display: flex;
  align-items: center;

  margin-right: 5.55px;
`;