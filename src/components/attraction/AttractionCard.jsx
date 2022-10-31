import styled from "styled-components";
import AttractionCardSkeleton from "./AttractionCardSkeleton";
import PropTypes from "prop-types";
import Like from "../Like";
import Rating from "../Rating";
import { typo, INK } from "../../styles";
import NoSearchResult from "./NoSearchResult";
import { useState, memo } from "react";

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

  // const coloredName = name keyword

  const updateLike = async () => { 
    try {
      const response = await fetch(`/api/attractions/${id}/like`, {
        method: "PUT",
      }) 
      if (response.status === 204) {
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteLike = async () => {
    try {
      const response = await fetch(`/api/attractions/${id}/like`, {
        method: "DELETE",
      })
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
        <Name>{name}</Name>
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
              handleClickLineHeart={updateLike}
              handleClickFillHeart={deleteLike}
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

const Name = styled.p`
  ${typo({
    size: "18pt",
    height: "24pt",
    weight: 700,
    color: INK.DARKEST
  })}
  margin-bottom: 4px;
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