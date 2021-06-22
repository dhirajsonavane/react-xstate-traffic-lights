import React, { FC, Fragment, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { trafficLightMachine } from './TrafficLightsMachine';
import { useMachine } from '@xstate/react';

export interface IProps {

}

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    root: {
        color: yellow[400],
        '&$checked': {
            color: yellow[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const TrafficLights: FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [current, send] = useMachine(trafficLightMachine);
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={false} md={4} />
            <Grid item xs={12} md={4} justify="center">
                <Grid item>
                    <Grid item xs={12} className={classes.trafficSignal}>
                        <RedRadio
                            disabled
                            name="red"
                            inputProps={{ 'aria-label': 'red' }}
                            checked={current.matches('red')}
                            size="medium"
                        />
                        <YellowRadio
                            disabled
                            name="yellow"
                            inputProps={{ 'aria-label': 'yellow' }}
                            checked={current.matches('yellow')}
                        />
                        <GreenRadio
                            name="green"
                            disabled
                            inputProps={{ 'aria-label': 'green' }}
                            checked={current.matches('green')}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.btnNext}>
                        <Button variant="outlined" color="primary" onClick={() => send('NEXT')}>
                            NEXT
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={false} md={4} />
        </Grid>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        trafficSignal: {
            display: 'flex',
            flexDirection: 'column',
            width: 80,
            margin: '0 auto',
            backgroundColor: '#6a6a6a',
            borderRadius: 25,
            "& .MuiSvgIcon-root": {
                height: 50,
                width: 50,
            }
        },
        btnNext: {
            marginTop: 15,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

export default TrafficLights;
