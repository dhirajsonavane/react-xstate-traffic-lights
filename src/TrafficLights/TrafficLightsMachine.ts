import { createMachine } from "xstate";

type TrafficLightEvents = {
    type: 'NEXT'
}

type TrafficLightStates =
    | { value: 'red', context: undefined }
    | { value: 'yellow', context: undefined }
    | { value: 'green', context: undefined }

export const trafficLightMachine = createMachine<
    undefined,
    TrafficLightEvents,
    TrafficLightStates>({
        id: 'traffic-light',
        initial: 'red',
        states: {
            'green': {
                on: { 'NEXT': 'yellow' }
            },
            'yellow': {
                on: { 'NEXT': 'red' }
            },
            'red': {
                on: { 'NEXT': 'green' }
            },
        }
    });