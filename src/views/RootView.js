import {View} from 'backbone.marionette';
import _ from 'underscore';
import ListItemsCollectionView from './ListItemsCollectionView';
import CounterView from './CounterView';
import CounterModel from '../models/CounterModel';

const RootView = View.extend({
    template: _.template('<div class="app-wrapper"><div class="counter-container"></div><div class="fav-list-container"></div></div>'),
    regions: {
        appWrapper: '.app-wrapper',
        counterContainer: '.counter-container',
        favouritesListContainer: '.fav-list-container'
    },
    
    onRender() {
        this.showChildView('counterContainer', new CounterView({model: new CounterModel({value: 0,selectedArray: []})}));
        this.showChildView('favouritesListContainer', new ListItemsCollectionView({collection: this.collection}));
    }
});

export default RootView;