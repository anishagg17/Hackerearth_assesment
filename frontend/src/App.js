import React, { Component } from "react";
import { Compile } from "./components/Compile";
import Editor from "./components/Editor";
import styled from "styled-components";

const IO = styled.div`
  width: 18vw;
  background-color: rgba(52, 205, 215, 1);
  float: right;
  textarea {
    height: 45vh;
    display: block;
    border: none;
    box-sizing: border-box;
    width: 100%;
    font-family: monospace;
    resize: none;
    outline: none;
    background-color: #1a2235;
    color: ${props => {
      const { color } = props.children[3].props;
      return color ? color : "white";
    }};
    font-size: 16px;
    border-radius: 5px;
    padding: 15px;
  }
  div {
    height: 3vh;
    line-height: 3vh;
    box-sizing: border-box;
    padding: auto 0;
    text-align: center;
    font-weight: 600;
    color: white;
  }
  button {
    position: relative;
    display: block;
    font-size: 16px;
    text-align: center;
    margin: 0 auto;
    margin-top: 5px;
    padding: 20px auto;
    outline: none;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    animation: all 2s ease-out;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 600;
    :hover {
      transform: translate(0%, 5%);
    }
    :disabled {
      cursor: progress;
      background-color: grey;
    }
  }
`;

const NewFile = styled.div`
  position: absolute;
  bottom: 1%;
  margin: 5px 10px;
  display: flex;
  justfy-content: space-between;
  button {
    color: white;
    background: rgba(52, 225, 235, 1);
    font-size: 14px;
    font-weight: 700;
    margin-left: -2px;
  }
  input {
    outline: none;
    padding: 2px;
  }
`;

const files = {
  "App.cpp":
    "#include<iostream> \n using namespace std;    \n int main(){ \n cout<<'2'; \n return 0; \n }",
  "App.py": "#code here\nprint(3)",
};

class App extends Component {
  state = {
    files,
    current: "App.cpp",
    newFile: "",
    output: "",
    input: "",
    loading: false,
    status: 200,
  };

  _handleOpenPath = path => this.setState({ current: path });

  createFile = () => {
    let files = {
      ...this.state.files,
    };
    files[this.state.newFile] = "";
    this.setState({ files, newFile: "" });
  };

  _handleValueChange = e => {
    let code = e.target.value;
    this.setState(state => ({
      files: {
        ...state.files,
        [state.current]: code,
      },
    }));
  };

  handelCompile = async () => {
    this.setState({ loading: true });
    let { current, files, input, output } = this.state;
    let code = files[current];
    let res = await Compile(code, input, output, current);

    this.setState({ output: res.out, loading: false, status: res.status });
  };

  handleIOChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { output, input, loading, status } = this.state;
    const color = status === 200 ? "white" : "red";
    return (
      <div
        style={{
          display: "flex",
          fontFamily: "sans-serif",
          width: "100vw",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "17vw",
            borderRight: "1px solid rgba(0, 0, 0, .08)",
            backgroundColor: "#1a2235",
            color: "white",
          }}
        >
          <div>
            {Object.keys(this.state.files).map(name => (
              <div
                key={name}
                id={`${name.split('.')[1]}`}
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  padding: "8px 24px",
                  backgroundColor:
                    this.state.current === name
                      ? "rgba(52, 205, 215, 1)"
                      : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => this._handleOpenPath(name)}
              >
                {name}
              </div>
            ))}
          </div>
          <NewFile>
            <input
              value={this.state.newFile}
              ref="new_file"
              onChange={e => {
                this.setState({ newFile: e.target.value });
              }}
            />
            <button onClick={this.createFile}>New</button>
          </NewFile>
        </div>
        <Editor
          path={this.state.current}
          value={this.state.files[this.state.current]}
          onValueChange={this._handleValueChange}
        />
        <IO>
          <div>Input</div>
          <textarea value={input} id="in_textarea" name="input" onChange={this.handleIOChange} />
          <div>Output</div>
          <textarea value={output} id="out_textarea" name="output" readOnly color={color} />
          <button onClick={this.handelCompile} disabled={loading} type="submit">
            {loading ? "Loading" : "Compile"}
          </button>
        </IO>
      </div>
    );
  }
}

export default App;
