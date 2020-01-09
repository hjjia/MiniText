import * as React from 'react';
import MiniText from './components/MiniText';

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {

        console.log(this.props, 'props')
        return (
            <div className="app">
                <MiniText />
            </div>
        )
    }
}
