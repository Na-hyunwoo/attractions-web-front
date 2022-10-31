import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import AttractionCardSkeleton from "../components/attraction/AttractionCardSkeleton";
import AttractionCardList from "../container/AttractionsCardList";
import { throttle } from "lodash";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

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

  const onEnterDown = (e) => {
    if (e.code === "Enter") {
      getAttractions({query: e.target.value});
      setSearchParams({query: e.target.value});
    }
  };

  const getAttractions = async ({
    query= "",
  }) => {
    setLoading(true);

    try {
      let url = '/api/attractions';
      url = query.length > 0 ? (url + '/?query=' + query) : url;

      const response = await fetch(url);

      if (response.status === 200) {
        const result = await response.json();
        setAttractions(result);
        // console.log("result: ", result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    getAttractions("");
  }, []);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle(onScroll, 300),
      { passive: true}
    )
  }, []);

  useEffect(() => {
    getAttractions({query: debouncedKeyword});
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
        Array(NUMBER_OF_SKELETON_UI).fill("").map((item, index) => 
          <AttractionCardSkeleton key={index}/>
        )
      }
      {attractions.length > 0 && 
        <AttractionCardList 
          attractions={attractions} 
          keyword={debouncedKeyword}
        />
      }
      {/* <NoSearchResult /> */}
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