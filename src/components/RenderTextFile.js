import React from 'react';
import { Divider } from 'semantic-ui-react';

export default class RenderTextFile extends React.Component {
    state = {
        text: ""
    }
    componentDidMount = async () => {
        const response = await fetch(this.props.url)
        const text = await response.text()
        this.setState({ text })
    }
    render() {
        const { text } = this.state
        return (
            <div>
                <Divider />
                <p>{text}</p>
                <Divider />
            </div>
        );
    }
}