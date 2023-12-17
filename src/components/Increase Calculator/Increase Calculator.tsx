import React, { useState } from 'react';
import {
    Button,
    TextField,
    Switch,
    FormControlLabel,
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
        flexFlow: 'column wrap',
    },
    textField: {
        margin: theme.spacing(2),
        width: '300px',
    },
    buttonContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        marginTop: theme.spacing(2)
    },
    resultContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        marginTop: theme.spacing(5),
        fontSize: '1.5rem'
    },
    h3: {
        marginBottom: theme.spacing(2)
    }
}));

export function IncreaseCalculator() {

    const classes = useStyles();

    const [ rowCount, setRowCount ] = useState(1);
    const [ increaseCount, setIncreaseCount ] = useState(1);
    const [ stsPerRow, setStsPerRow ] = useState(1);
    const [ tiemsToIncrease, setTiemsToIncrease ] = useState({ 1: 0, 2: 0 });
    const [ increaseDistance, setIncreaseDistance ] = useState({ 1: 0, 2: 0 });
    const [ distRows, setDistRows ] = useState({ 1: 1, 2: 2 });
    const [ myFieldErrors, setMyFieldErrors ] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });
    const [ showAdvancedSettings, setShowAdvancedSettings ] = useState(false);

    function onSubmit (e: React.FormEvent) {
        e.preventDefault();
        const increase = increaseCount / stsPerRow;
        const baseIncrease = Math.trunc(rowCount / increase);

        if (isNaN(rowCount) || isNaN(increaseCount)) {
            return;
        }
        else if(distRows[1] === 0 || distRows[2] === 0 || isNaN(distRows[1]) || isNaN(distRows[2]) || showAdvancedSettings === false) {
            setTiemsToIncrease({
                1: increase - (rowCount - (increase * baseIncrease)),
                2: rowCount - (increase * baseIncrease)
            });
    
            setIncreaseDistance({
                1: baseIncrease,
                2: baseIncrease <= 0 ? 0 : baseIncrease + 1
            });
        }
        else if (showAdvancedSettings === true) {
            if (distRows[1] === distRows[2]) {
                setMyFieldErrors({
                    ...myFieldErrors,
                    4: "values can not be equal",
                    5: "values can not be equal"
                });
            }
            else {
                setTiemsToIncrease({
                    1: increase - (rowCount - (increase * distRows[1])) / (distRows[2] - distRows[1]),
                    2: (rowCount - (increase * distRows[1])) / (distRows[2] - distRows[1])
                });
        
                setIncreaseDistance({
                    1: distRows[1],
                    2: baseIncrease <= 0 ? 0 : distRows[2]
                });
            }
        }

    }

    function getOrdinal (num: number) {
        if (num === 1 ) {
            return '';
        }

        if (num % 10 === 1 && num % 100 !== 11) {
            return `${num}st`;
        }
     
        if (num % 10 === 2 && num % 100 !== 12) {
            return `${num}nd`;
        }
     
        if (num % 10 === 3 && num % 100 !== 13) {
            return `${num}rd`;
        }
     
        return `${num}th`;
    }
 
    function getResultMessage (mult: number, dist: number, num: number) {
        if (mult <= 0 || dist <= 0 || mult === Infinity || dist === Infinity || tiemsToIncrease[1] * increaseDistance[1] > rowCount) {
            if (num === 1) {
                return "Impossible to calculate increases, the provided values are incorrect.";
            }
            else return "";
        }
        else return `Increase ${mult} time${mult > 1 ? 's' : ''} in every ${getOrdinal(dist)} row.`;
    }

    function onChangeValue (setter: any, num: number) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value);

            if (isNaN(value)) {
                setMyFieldErrors({
                    ...myFieldErrors,
                    [num]: "Field required."
                });
            }
            else setMyFieldErrors({
                ...myFieldErrors,
                [num]: ""
            });
    
            setter(value);
        };
    }

    function onChangeObjectValue (num: number, errNum: number,) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value);

            if (isNaN(value) || value <= 0 || distRows[num] <= 0) {
                setMyFieldErrors({
                    ...myFieldErrors,
                    [errNum]: "Insert value > 0"
                });
            }
            else setMyFieldErrors({
                ...myFieldErrors,
                [errNum]: ""
            });
    
            setDistRows({
                ...distRows,
                [num]: value
            });
        };
    }

    function switchAdvancedSettings (event: React.ChangeEvent<HTMLInputElement>) {
        setShowAdvancedSettings(event.target.checked );
    }

    function buttonDisable () {
        if ((isNaN(rowCount) || isNaN(increaseCount) || isNaN(stsPerRow) || rowCount < 1 || increaseCount < 1 || stsPerRow < 1) ||
            ((isNaN(distRows[1]) || isNaN(distRows[2]) || distRows[1] < 1 || distRows[2] < 1) && showAdvancedSettings === true)) {
            return true;
        }
        else return false;
        
    }
    
    return (
        <div className={classes.root}>
            <h1>Increase Calculator</h1>
            <form className={classes.form} onSubmit={onSubmit}>
                <div className={classes.formInputs}>
                    <TextField className={classes.textField}
                        label="Number of rows to knit"
                        type='number'
                        variant='outlined'
                        value={rowCount}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={!!myFieldErrors[1]}
                        helperText={myFieldErrors[1]}
                        onChange={onChangeValue(setRowCount, 1)}
                    />
                    <TextField className={classes.textField}
                        label="Number of stitches to add"
                        type='number'
                        variant='outlined'
                        value={increaseCount}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={!!myFieldErrors[2]}
                        helperText={myFieldErrors[2]}
                        onChange={onChangeValue(setIncreaseCount, 2)}
                    />
                    <TextField className={classes.textField}
                        label="Number of stitches to add per increase"
                        type='number'
                        variant='outlined'
                        value={stsPerRow}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={!!myFieldErrors[3]}
                        helperText={myFieldErrors[3]}
                        onChange={onChangeValue(setStsPerRow, 3)}
                    />
                    <div className={classes.form} >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showAdvancedSettings}
                                    onChange={switchAdvancedSettings}
                                    name="Advanced settings"
                                    color='default'
                                />
                            }
                            label="Toggle advanced settings"  
                        />
                    </div>
                    
                    {showAdvancedSettings === true ? 
                        <section className={classes.form} >
                            <h3 className={classes.h3}>
                                Advanced Settings
                            </h3>
                            <p>Specify custom increase rows</p>
                            <TextField className={classes.textField}
                                label="First increase every"
                                type='number'
                                variant='outlined'
                                value={distRows[1]}
                                error={!!myFieldErrors[4]}
                                helperText={myFieldErrors[4]}
                                onChange={onChangeObjectValue(1, 4)}
                            />
                            <TextField className={classes.textField}
                                label="Then increase every"
                                type='number'
                                variant='outlined'
                                value={distRows[2]}
                                error={!!myFieldErrors[5]}
                                helperText={myFieldErrors[5]}
                                onChange={onChangeObjectValue(2, 5)}
                            />
                        </section>
                        : null
                    }
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        disabled={buttonDisable()}
                        type='submit'
                        variant='contained'
                        color='primary'>
                        Calculate
                    </Button>
                </div>
            </form>
            <div className={classes.resultContainer}>
                {tiemsToIncrease[1] === 0 ?
                    null
                    : <span>{getResultMessage(tiemsToIncrease[1], increaseDistance[1], 1)}</span>
                }    
                <span>{getResultMessage(tiemsToIncrease[2], increaseDistance[2], 2)}</span>
            </div>
        </div>
    );
}

export default IncreaseCalculator;
