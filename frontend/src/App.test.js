import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() })

describe('=> App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('new file creation', () => {
    const wrapper = shallow(<App/>);
    const event = {target: {name: "new_file", value: "new_file", preventDefault() {} }};

    expect(wrapper.state().newFile).toBe('');
    wrapper.find('input').simulate('change', event);
    expect(wrapper.state().newFile).toBe('new_file');
  });

  test('input data change', () => {
    const wrapper = shallow(<App/>);
    const event = {target: {name: "input", value: "input", preventDefault() {} }};

    expect(wrapper.state().input).toBe('');
    wrapper.find('#in_textarea').simulate('change', event);
    expect(wrapper.state().input).toBe('input');
  });

  test('current working file change', () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.state().current).toBe('App.cpp');
    wrapper.find('#py').simulate('click');
    expect(wrapper.state().current).toBe('App.py');
  });
});
