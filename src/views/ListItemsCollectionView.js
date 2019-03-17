import {CollectionView} from 'backbone.marionette';
import ListItemView from './ListItemView';
import mediator from '../mediator';

const ListItemsCollectionView = CollectionView.extend({
    tagName: 'div',
    childView: ListItemView,
    className: 'fav-list-items-wrapper',

    initialize() {
        mediator.subscribe('price-change', (data) => {
            console.log('price-change accepted by List', data);

            if (typeof data !== 'undefined' && data.length > 0) {
                var currentCollectionModels = this.collection.models;

                for (var i = 0; i < currentCollectionModels.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (currentCollectionModels[i].get('id') === data[j].id) {
                            currentCollectionModels[i].set('price', data[j].price);
                        }
                    }
                }

                this.collection.reset(currentCollectionModels);
                
            } else {
                console.log('price-change event logged without data');
            }
        });
        mediator.subscribe('state-change', (data) => {
            console.log('state-change accepted by List', data);
            
            if (typeof data !== 'undefined' && data.length > 0) {
                var currentCollectionModels = this.collection.models;
                
                for (var k = 0; k < currentCollectionModels.length; k++) {
                    for (var l = 0; l < data.length; l++) {
                        if (currentCollectionModels[k].get('id') === data[l].id) {
                            currentCollectionModels[k].set('active', data[l].active);
                        }
                    }
                }
                
                this.collection.reset(currentCollectionModels);
            } else {
                console.log('price-change event logged without data');
            }
        });
    }
});

export default ListItemsCollectionView;