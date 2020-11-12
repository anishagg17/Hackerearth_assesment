import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import IdeEditor from './Editor'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('=> IdeEditor component', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<IdeEditor />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders the inner textarea', () => {
        const event = {target: {name: "code_input", value: "code"}};
        const props = {
            onValueChange: jest.fn(),
            value: "previous code"
        }

        const wrapper = shallow(<IdeEditor {...props} />);
        jest.resetAllMocks();
    
        expect(wrapper.props().children.props.value).toBe('previous code');
        expect(wrapper.find("textarea").simulate("change", event));
    });
});