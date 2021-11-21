import React from "react";
import icon from '../../../assets/img/search-solid.svg';
import "./Search.scss";

interface SearchProps {
  ChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void
};

export const Search = (props: SearchProps) => (
  <div className="searchContainer">
    <i className="icon" aria-hidden="true"><img src={icon} /></i>
    <input id="search" type="search" placeholder="Search..." autoFocus onChange={props.ChangeHandler} onKeyUp={props.ChangeHandler} />
  </div>
);