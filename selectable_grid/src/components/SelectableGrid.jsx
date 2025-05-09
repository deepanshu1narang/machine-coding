import React, { useCallback, useState } from 'react'

const SelectableGrid = ({ rows = 10, cols = 10 }) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedBoxes, setSelectedBoxes] = useState([]);

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseEnter = useCallback((boxNumber) => {
        if (isMouseDown) {
            const startBox = selectedBoxes[0];
            const endBox = boxNumber;

            // logic for decreasing 1 from box index is we added 1 for display purpose
            const startRow = Math.floor((startBox - 1) / rows);
            const startCol = (startBox - 1) % cols;

            const endRow = Math.floor((endBox - 1) / rows);
            const endCol = (endBox - 1) % cols;

            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);

            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);

            const selected = [];
            // my logic
            for (let row = minRow; row <= maxRow; row++) {
                for (let col = minCol; col <= maxCol; col++) {
                    selected.push(row * cols + col + 1);
                }
            }
            setSelectedBoxes(selected);
        }
    }, [isMouseDown]);

    const handleMouseDown = (boxNumber) => {
        setIsMouseDown(true);
        // we just need to add 1 box so that we have a startbox ... bcoz at the time we press mouse button then only it'll select 
        setSelectedBoxes([boxNumber]);
    };

    return (
        <div className='grid'
            style={{ "--rows": rows, "--cols": cols }}
            onMouseUp={handleMouseUp}
        >
            {
                [...Array(rows * cols).keys()].map((_, i) => (
                    <div key={i} className={`box ${selectedBoxes.includes(i + 1) ? "selected" : ""}`}
                        onMouseEnter={() => handleMouseEnter(i + 1)}
                        onMouseDown={() => handleMouseDown(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))
            }
        </div>
    )
}

export default SelectableGrid
