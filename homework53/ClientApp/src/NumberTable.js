import React from 'react';
import AddRows from './AddRows';
import SelectedTable from './SelectedTable';
import produce from 'immer';
class NumberTable extends React.Component {
    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }

    onAddClick = () => {
        var maxNumber = 1000;
        var randomNumber = Math.floor((Math.random() * maxNumber));
        const newState = produce(this.state, draftState => {
            draftState.numbers.push(randomNumber);
        });
        this.setState(newState);

    }
    onSelectClick = (number) => {

        const newState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(number);
        });
        this.setState(newState);


    }
    onUnselectClick = (number) => {
        const selectedNumbers = this.state.selectedNumbers.filter(n => n !== number);
        this.setState({ selectedNumbers });
    }
    isSelected = (number) => {
        return this.state.selectedNumbers.some(n => n === number);
    }
    onLockClick = (number) => {

        const newState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(number);
        });
        this.setState(newState);

    }
    onUnlockClick = (number) => {
        const lockedNumbers = this.state.lockedNumbers.filter(ln => number !== ln);
        this.setState({ lockedNumbers });

    }
    isLocked = (number) => {
        return this.state.lockedNumbers.some(n => n === number);
    }
    render() {
        const { numbers, selectedNumbers, lockedNumbers } = this.state;
        return (
            <div className='container'>
                <div className='row'>
                    <button className='btn btn-block btn-success' onClick={this.onAddClick}>Add</button>
                </div>
                <div className='row'>
                    <table className='table table-bordered table-hover table-striped'>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Add/Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {numbers.map((n, i) => {
                                return <AddRows
                                    onSelectClick={() => this.onSelectClick(n)}
                                    onUnselectClick={() => this.onUnselectClick(n)}
                                    number={n}
                                    isSelected={this.isSelected(n)}
                                    isLocked={this.isLocked(n)}
                                    key={i} />
                            })
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                        {!!selectedNumbers.length &&
                            <div className="Jumbotron">
                                <h1>Selected Numbers</h1>
                                <ul>
                                    {selectedNumbers.map((n, i) => {
                                        return <SelectedTable
                                            number={n}
                                            onLockClick={() => this.onLockClick(n)}
                                            onUnlockClick={() => this.onUnlockClick(n)}
                                            isLocked={this.isLocked(n)}
                                            key={i} />
                                    })
                                    }
                                </ul>
                            </div>
                        }

                    </div>

                </div>
            </div >
        )
    }
}


export default NumberTable;



