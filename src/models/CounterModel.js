import {Model} from 'backbone';

const CounterModel = Model.extend({
    defaults: {
        value: 0,
        selectedArray: []
    }
});

export default CounterModel;