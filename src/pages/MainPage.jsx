import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import AttractionCardSkeleton from "../components/attraction/AttractionCardSkeleton";
import AttractionCardList from "../container/AttractionsCardList";
import { debounce, throttle } from "lodash";
import { useSearchParams } from "react-router-dom";

const MainPage = () => {

  const [keyword, setKeyword] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isScroll, setIsScroll] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams("");

  const debounceGetAttractions = debounce(keyword => {
    getAttractions({query: keyword})
  }, 2000);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setSearchParams({query: e.target.value});
    debounceGetAttractions(e.target.value);
    // getAttractions({query: e.target.value});
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
    if (keyword.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [keyword]);

  return(
    <>
      <SearchBoxWrapper>
        <SearchBox 
          keyword={keyword}
          handleChange={handleKeywordChange}
          handleClickX={() => setKeyword("")}
          isEmpty={isEmpty}
          isScroll={isScroll}
        />
      </SearchBoxWrapper>
      {loading && 
        Array(5).fill(0).map((item, index) => 
          <AttractionCardSkeleton key={index}/>
        )
      }
      {attractions.length > 0 && <AttractionCardList attractions={attractions} />}
      {/* <AttractionCardSkeleton />
      <NoSearchResult /> */}
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