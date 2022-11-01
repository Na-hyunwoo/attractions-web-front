import styled from "styled-components";
import PropTypes from "prop-types";
import Like from "../Like";
import Rating from "../Rating";
import { typo, INK } from "../../styles";
import { useState, memo } from "react";
import HighlightedName from "../HighlightedName";
import axios from "axios";
import { putLike, deleteLike } from "../../services/api/attraction";

/**
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.name
 * @param {string} props.description
 * @param {string} props.coverImgUrl
 * @param {object} props.reviews
 * @param {object} props.like
 * @param {boolean} props.isLikeable
 * @param {string} props.keyword
 */
const AttractionCard = ({
  id,
  name,
  description,
  coverImgUrl,
  reviews,
  like,
  isLikeable = true,
  keyword
}) => {

  const [isLiked, setIsLiked] = useState(like.isLiked);
  const [likeCount, setLikeCount] = useState(like.count);

  const handleClickLineHeart = async () => { 
    try {
      const response = await putLike({ id: id });
  
      if (response.status === 204) {
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickFillHeart = async () => {
    try {
      const response = await deleteLike({ id: id });

      if (response.status === 204) {
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <CoverImg src={coverImgUrl} alt={name}/>
      <div>
        <HighlightedName name={name} highlight={keyword}/>
        <Description>{description}</Description>
        <Rating 
          rating={reviews.averageRating}
          count={reviews.count}
        />
        {isLikeable && 
          <LikeWrapper>
            <Like 
              isLike={isLiked}
              count={likeCount}
              handleClickLineHeart={handleClickLineHeart}
              handleClickFillHeart={handleClickFillHeart}
            />
          </LikeWrapper>
        }
      </div>
    </Wrapper>
  );
}

AttractionCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  coverImgUrl: PropTypes.string.isRequired,
  reviews: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  isLikeable: PropTypes.bool,
  keyword: PropTypes.string,
}

export default memo(AttractionCard);

const Wrapper = styled.div`
  width: 100vw;

  padding: 16px;

  display: flex;

  position: relative;
`;

const CoverImg = styled.img`
  border-radius: 8px;

  width: 92px;
  height: 120px;

  margin-right: 16px;
`;

const Description = styled.p`
  ${typo({
    size: "14pt",
    height: "14pt",
    weight: 500,
    color: INK.BASE
  })}
  margin-bottom: 5px;
`;

const LikeWrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;