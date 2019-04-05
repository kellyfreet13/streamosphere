import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ProgressBarExample extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            percentage: 0
        }
        this.nextStep = this.nextStep.bind(this)
    }

    nextStep() {
        if (this.state.percentage === 100) return
        this.setState({ percentage: this.state.percentage + 20 })
        /*20 is filler amount*/
        /*Must get filesize and divide that by file limit*/
    }

    render() {
        return (
            <div>

                <h2> Storage </h2>
                <ProgressBar percentage={this.state.percentage} />

                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={this.nextStep}
                    >
                        Update Percent Tester
          </button>
                </div>

                {/* Added for convenience of viewing */}
                <div style={{ marginTop: '10px', color: 'blue', marginBottom: '15px' }} onClick={() => this.setState({ percentage: 0 })}>
                    Reset
                </div>
        </div >
    )
    }
}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

/*ReactDOM.render(
    <ProgressBarExample />,
    document.querySelector('#app')
)*/

export default ProgressBarExample;