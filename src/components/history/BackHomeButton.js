import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  padding: 3rem;
`;

export default function BackHomeButton() {
  return <StyledLink to="/">Back Home Page</StyledLink>;
}
