import React from "react";
import styled from "styled-components";
import { Result } from "./Result";

const Results = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 500px;
  overflow-y: scroll;
  padding: 0;
`;

type Link = {
  Name: string,
  Url: string
}

export const ResultsContainer = (props: {Results: Link[]}) => {
  return (
    <Results>
      {props.Results.map((result, i) => {
        return (<Result key={i} Name={result.Name} Url={result.Url} />)
      })}
    </Results>
  );
}