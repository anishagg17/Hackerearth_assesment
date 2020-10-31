import React, { Component } from "react";
import styled from "styled-components";

const IO = styled.div`
  textarea {
    outline: none;
    font-family: monospace;
    font-weight: 300;
    background-color: #1a2235;
    color: white;
    height: 100vh;
    font-size: 14px;
    width: 65vw;
    resize: none;
    padding: 15px;
    box-sizing: border-box;
  }
`;

class IdeEditor extends Component {
  render() {
    let { path, value, onValueChange } = this.props;
    return (
      <IO>
        <textarea value={value} onChange={onValueChange} />
      </IO>
    );
  }
}

export default IdeEditor;
