import {View} from 'backbone.marionette';
import {_} from 'underscore';
import mediator from '../mediator';

const CounterView = View.extend({
    className: 'counter-wrapper',
    template: _.template('<p><%= value%></p><select defaultValue="betslip"><option value="betslip">BET SLIP</option></select>'),

    initialize() {
        mediator.subscribe('state-change', (data) => {
            console.log('state-change accepted by counter', data);

            if (typeof data !== 'undefined' && data.length > 0) {
                var selectedIds = this.model.get('selectedArray');
                var updateModel = false;

                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id.toString();
                    var state = data[i].active;
                    var index = selectedIds.indexOf(id);
                    
                    if (index > -1 && !state) {
                        selectedIds.splice(index, 1);
                        updateModel = true;
                    } 
                }

                if (updateModel) {
                    this.model.set('selectedArray', selectedIds);
                    this.model.set('value', selectedIds.length);
                }
            } else {
                console.log('state-change event logged without data');
            }
        });
        mediator.subscribe('bet-update', (data) => {
            console.log('bet-update accepted by counter', data);

            if (typeof data !== 'undefined' && data.id) {
                var selectedIds = this.model.get('selectedArray');
                var id = data.id.toString();

                if (data.type === 'add' && !selectedIds.includes(id)) {
                    selectedIds.push(id);
                } else if (data.type === 'remove' && selectedIds.includes(id)) {
                    var index = selectedIds.indexOf(id);
                    if (index > -1) {
                        selectedIds.splice(index, 1);
                    }   
                }
                
                this.model.set('selectedArray', selectedIds);
                this.model.set('value', selectedIds.length);
            } else {
                console.log('bet-update event logged without data');
            }
        });
        
        if (this.model) {
            this.model.on('change', this.render, this);
        }
    }
});

export default CounterView;