import React, { Component } from 'react';
import Typed from 'typed.js';

const str = 'Some <i>strings</i> are slanted'

type Props = {
    str:string
}

class TypedText extends Component<Props> {
    typed: any;
    el: any;

    componentDidMount() {
        // If you want to pass more options as props, simply add
        // your desired props to this destructuring assignment.
        // const { string } = this.props;
        // You can pass other options here, such as typing speed, back speed, etc.
        const options = {
            strings: [
                this.props.str
            ],
            fadeOut: true,
            typeSpeed: 50,
            backSpeed: 50,
            onComplete: (self:any) => {
                self.destroy()
                this.el.innerHTML = this.props.str
            }
        };
        // this.el refers to the <span> in the render() method
        // this.typed = new Typed(this.el, options);
        this.el.innerHTML = this.props.str
    }

    componentWillUnmount() {
        // Make sure to destroy Typed instance on unmounting
        // to prevent memory leaks
        this.typed.destroy();
    }

    render() {
        return (
            <div className="typed-line">
                <span
                    style={{ whiteSpace: 'pre' }}
                    ref={(el) => { this.el = el; }}
                />
            </div>
        );
    }
}

export default TypedText;