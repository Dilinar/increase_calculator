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
    const [ tiemsToIncreaseInOther, setTiemsToIncreaseInOther ] = useState(0);
    const [ timesToIncreaseInEach, setTimesToIncreaseInEach ] = useState(0);
    const [ myRowCountError, setMyRowCountError ] = useState('');
    const [ myIncreaseCountError, setMyIncreaseCountError ] = useState('');

    function onSubmit (e: React.FormEvent) {

        e.preventDefault();
        const rowCountHalf = rowCount / 2;

        if (isNaN(rowCount) || isNaN(increaseCount)) {
            return;
        }
        if (rowCount % 2 > 0) {
            setTiemsToIncreaseInOther(Math.floor(rowCountHalf) - (increaseCount - Math.ceil(rowCountHalf)));
            setTimesToIncreaseInEach(increaseCount - (rowCountHalf - (increaseCount - rowCountHalf)));  
        }
        else 
            setTiemsToIncreaseInOther(rowCountHalf - (increaseCount - rowCountHalf));
        setTimesToIncreaseInEach(increaseCount - (rowCountHalf - (increaseCount - rowCountHalf)));
    }

    function onRowCountChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value, 10);

        if (isNaN(value)) {
            setMyRowCountError("Field required.");
        }
        else setMyRowCountError('');

        setRowCount(value);
    }

    function onIncreaseCountChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value, 10);

        if (isNaN(value)) {
            setMyIncreaseCountError("Field required.");
        }
        else setMyIncreaseCountError('');

        setIncreaseCount(value);
    }

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
                <span>Increse in every other row {tiemsToIncreaseInOther} times.</span>
                <span>Increase in each row {timesToIncreaseInEach} times.</span>
            </div>
        </div>
    );
}

export default IncreaseCalculator;
