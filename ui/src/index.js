import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as ReactDOM from "react-dom";

class InputRow extends React.Component {

    render() {
        return (
            <div>
                <TextField
                    id="speaker-name"
                    label="Name"
                    value={this.props.value.name}
                    onChange={this.props.handleChange({name:'name', i:this.props.i})}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="quote"
                    label="Quote"
                    value={this.props.value.quote}
                    onChange={this.props.handleChange({name:'quote', i:this.props.i})}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="contained" onClick={() => { this.props.moveUp(this.props.i); }}>
                    Move Up
                </Button>
                <Button variant="contained" onClick={() => { this.props.moveDown(this.props.i); }}>
                    Move Down
                </Button>
            </div>
        );
    }
}

class Story extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                    name:'',
                    quote:'',
                }
            ]
        };
    }

    handleChange = data => event => {
        let state = {...this.state};
        state.rows[data.i][data.name] = event.target.value;
        this.setState({
            rows: state.rows,
        });
    };

    moveUp(position) {
        if (position === 0) {
            return;
        }
        let rows = [];
        for (let i = 0; i < this.state.rows.length; i++) {
            if (i < (position -1) || i > position) {
                rows[i] = this.state.rows[i];
            }
            if (i === (position -1)) {
                rows[i] = this.state.rows[position];
            }
            if (i === (position)) {
                rows[i] = this.state.rows[i-1];
            }
        }
        console.log([this.state.rows, rows]);
        this.setState({
            rows: rows,
        });
    }

    moveDown(position) {
        if (position === this.state.rows.length-1) {
            return;
        }
        let rows = [];
        for (let i = 0; i < this.state.rows.length; i++) {
            if (i < (position) || i > position +1) {
                rows[i] = this.state.rows[i];
            }
            if (i === (position)) {
                rows[i] = this.state.rows[i+1];
            }
            if (i === (position +1)) {
                rows[i] = this.state.rows[position];
            }
        }
        this.setState({
            rows: rows,
        });
    }

    addDialogue() {
        let state = {...this.state};
        state.rows.push({
            name:'',
            quote:'',
        });
        console.log(state);
        this.setState({
            rows: state.rows,
        });
    }

    save() {
        //todo
    }

    render() {
        const rows = this.state.rows.map((row, index) => {
            return <InputRow value={row} handleChange={(data) => this.handleChange(data)} i={index} moveUp={(i) => this.moveUp(i)} moveDown={(i) => this.moveDown(i)} />
        });
        return (
            <form noValidate autoComplete="off">
                {rows}
                <Button variant="contained" onClick={() => this.addDialogue()}>
                    Add Dialogue
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.save()}>
                    Save
                </Button>
            </form>
        );
    }
}


function Main() {
    return (
        <Story />
    );
}

ReactDOM.render(<Main />, document.querySelector('#root'));