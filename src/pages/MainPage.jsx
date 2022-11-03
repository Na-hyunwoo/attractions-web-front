import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import AttractionCardSkeleton from "../components/attraction/AttractionCardSkeleton";
import AttractionCardList from "../containers/AttractionsCardList";
import NoSearchResult from "../components/attraction/NoSearchResult";
import { debounce, throttle } from "lodash";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { getAttractions } from "../services/api/attraction";
import { nanoid } from "nanoid";

const NUMBER_OF_SKELETON_UI = 5;

const MainPage = () => {

  const [keyword, setKeyword] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedKeyword = useDebounce(keyword, 500);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const onEnterDown = debounce((e) => {
    if (e.code === "Enter") {
      fetchAttractions({query: e.target.value});
      setSearchParams({query: e.target.value});
    }
  }, 300);

  const fetchAttractions = async ({
    query = "",
  }) => {
    setLoading(true);

    const response = await getAttractions({
      query: query
    });

    if (response.status === 200) {
      setAttractions(response.data);
    }

    setLoading(false);
  };

  const onScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle(onScroll, 300),
      { passive: true}
    )

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  useEffect(() => {
    fetchAttractions({query: debouncedKeyword});
    setSearchParams({query: debouncedKeyword});
  }, [debouncedKeyword])

  return(
    <>
      <SearchBoxWrapper>
        <SearchBox 
          keyword={keyword}
          handleChange={handleKeywordChange}
          handleClickX={() => setKeyword("")}
          isScroll={isScroll}
          onKeyDown={onEnterDown}
        />
      </SearchBoxWrapper>
      {loading && 
        Array(NUMBER_OF_SKELETON_UI).fill("").map(item => 
          <AttractionCardSkeleton key={nanoid()}/>
        )
      }
      {attractions.length > 0 && 
        <AttractionCardList 
          attractions={attractions} 
          keyword={debouncedKeyword}
        />
      }
      {attractions.length === 0 &&
        <NoSearchResult />
      }
    </>
  );
}

export default MainPage;

const SearchBoxWrapper = styled.div`
  background: #FFF;  

  position: sticky;
  top: 0px;
  z-index: 1;
`;