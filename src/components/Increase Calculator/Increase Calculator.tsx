import React, { useState } from 'react';
import {
    Button,
    TextField,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formInputs: {
        display: 'flex',
        flexFlow: 'column wrap'
    },
    textField: {
        margin: theme.spacing(2)
    },
    buttonContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
    },
    resultContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        marginTop: theme.spacing(2),
        fontSize: '1.5rem'
    }
}));

export function IncreaseCalculator() {

    const classes = useStyles();

    const [ rowCount, setRowCount ] = useState(0);
    const [ increaseCount, setIncreaseCount ] = useState(0);
    const [ stsPerRow, setStsPerRow ] = useState(0);
    const [ tiemsToIncre, setTiemsToIncrease ] = useState({ 1: 0, 2: 0 });
    const [ increaseDistance, setIncreaseDistance ] = useState({ 1: 0, 2: 0 });
    const [ rows, setRows ] = useState({ 1: 0, 2: 0 });
    const [ myRowCountError, setMyRowCountError ] = useState('');
    const [ myIncreaseCountError, setMyIncreaseCountError ] = useState('');

    function onSubmit (e: React.FormEvent) {
        e.preventDefault();
        const increase = increaseCount / stsPerRow;
        const baseIncrease = Math.trunc(rowCount / increase);

        if (isNaN(rowCount) || isNaN(increaseCount)) {
            return;
        }
        else if(rows[1] === 0 || rows[2] === 0 || isNaN(rows[1]) || isNaN(rows[2])) {
            setTiemsToIncrease({
                1: increase - (rowCount - (increase * baseIncrease)),
                2: rowCount - (increase * baseIncrease)
            });
    
            setIncreaseDistance({
                1: baseIncrease,
                2: baseIncrease + 1
            });
        }
        else {
            setTiemsToIncrease({
                1: increase - (rowCount - (increase * rows[1])) / (rows[2] - rows[1]),
                2: (rowCount - (increase * rows[1])) / (rows[2] - rows[1])
            });
    
            setIncreaseDistance({
                1: rows[1],
                2: rows[2]
            });
        }

    }

    function onRowCountChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            setMyRowCountError("Field required.");
        }
        else setMyRowCountError('');

        setRowCount(value);
    }

    function onIncreaseCountChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            setMyIncreaseCountError("Field required.");
        }
        else setMyIncreaseCountError('');

        setIncreaseCount(value);
    }

    function onStsPerRowChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            setMyIncreaseCountError("Field required.");
        }
        else setMyIncreaseCountError('');

        setStsPerRow(value);
    }

    const onSetRowsChange = (num: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            setMyIncreaseCountError("Field required.");
        }
        else setMyIncreaseCountError('');

        setRows({
            ...rows,
            [num]: value
        });
    };
    
    return (
        <div className={classes.root}>
            <h1>Increase Calculator</h1>
            <form className={classes.form} onSubmit={onSubmit}>
                <div className={classes.formInputs}>
                    <TextField className={classes.textField}
                        label='Number of rows'
                        type='number'
                        variant='outlined'
                        value={rowCount}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={!!myRowCountError}
                        helperText={myRowCountError}
                        onChange={onRowCountChange}
                    />
                    <TextField className={classes.textField}
                        label='Number of stitches to encrease'
                        type='number'
                        variant='outlined'
                        value={increaseCount}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={!!myIncreaseCountError}
                        helperText={myIncreaseCountError}
                        onChange={onIncreaseCountChange}
                    />
                    <TextField className={classes.textField}
                        label='Number of stitches per row'
                        type='number'
                        variant='outlined'
                        value={stsPerRow}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={!!myIncreaseCountError}
                        helperText={myIncreaseCountError}
                        onChange={onStsPerRowChange}
                    />
                    <TextField className={classes.textField}
                        label='First increase every'
                        type='number'
                        variant='outlined'
                        value={rows[1]}
                        onChange={onSetRowsChange(1)}
                    />
                    <TextField className={classes.textField}
                        label='Then increase every'
                        type='number'
                        variant='outlined'
                        value={rows[2]}
                        onChange={onSetRowsChange(2)}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    {isNaN(rowCount) || isNaN(increaseCount) || rowCount < 1 || increaseCount < 1 ?
                        <Button
                            disabled
                            type='submit'
                            variant='contained'
                            color='primary'>
                            Calculate
                        </Button> :
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'>
                            Calculate
                        </Button>
                    }
                </div>
            </form>
            <div className={classes.resultContainer}>
                {tiemsToIncre[1] === 0 ?
                    null
                    : <span>Increse {tiemsToIncre[1]} {tiemsToIncre[1] === 1 ? "time" : "times"} in every {increaseDistance[1] === 1 ? '' : increaseDistance[1] === 2 ? `${increaseDistance[1]}nd` : increaseDistance[1] === 3 ? `${increaseDistance[1]}rd` : `${increaseDistance[1]}th`} row. </span>
                }    
                {tiemsToIncre[2] === 0 ?
                    null
                    : <span>Increse {tiemsToIncre[2]} {tiemsToIncre[2] === 1 ? "time" : "times"} in every {increaseDistance[2] === 2 ? `${increaseDistance[2]}nd` : increaseDistance[2] === 3 ? `${increaseDistance[2]}rd` : `${increaseDistance[2]}th`} row.</span>
                }   
            </div>
        </div>
    );
}

export default IncreaseCalculator;
