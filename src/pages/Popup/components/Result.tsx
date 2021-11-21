import React from "react";
import toast from "react-hot-toast";
import copyIcon from "../../../assets/img/copy-regular.svg";
import styled from "styled-components";

const ResultRow = styled.div`
  padding: 12px;
  display: flex;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:not(:first-child) {
    border-top: 1px solid map.get($monotone, "base");
  }

  &:hover,&:focus {
    background-color: map.get($primary, "light");

    > img {
      filter: map.get($filters, primaryBase);
      transform: scale(1.1);
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;

  .name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .link {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 0 0 auto;
  align-self: center;
  padding: 12px;
  transition: 0.2s ease-in;
`;

export const Result = (props: {Name: string, Url: string}) => {
  const copy = () => {
    navigator.clipboard.writeText(props.Url)
      .then(
        () => {
          toast.success("Copied link to clipboard.");
        },
        ()=> {
          toast.error("Failed to copy link.")
        });
  }

  return (
    <ResultRow onClick={copy}>
      <Info>
        <span className="name">{props.Name}</span>
        <span className="url">{props.Url}</span>
      </Info>
      <Icon src={copyIcon} />
    </ResultRow>
  );
}