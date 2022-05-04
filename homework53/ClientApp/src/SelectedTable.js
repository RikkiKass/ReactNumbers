import React from "react";
class SelectedTable extends React.Component {



    render() {
        const { number, onLockClick, onUnlockClick, isLocked } = this.props;
        return (
            <li className="list-group-item">
                {number}  <button className="btn btn-primary" onClick={isLocked ? onUnlockClick : onLockClick}>
                    {isLocked ? 'Unlock' : 'Lock'}</button>
            </li>
        )
    }
}
export default SelectedTable;
