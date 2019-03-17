import {Model} from 'backbone';

const ListItemModel = Model.extend({
    defaults: {
        id: '',
        name: '',
        price: '',
        active: true,
        selected: false
    },
    initialize: function () {
        this.on('change:active', function () {
            if (this.get('selected') && !this.get('active')) {
                this.set('selected', false);
            }
        });
    },
});

export default ListItemModel;