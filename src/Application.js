import {Application} from 'backbone.marionette';
import {Collection} from 'backbone';
import ListItemModel from './models/ListItemModel';
import mediator from './mediator';
import RootView from './views/RootView';

const App = Application.extend({
    region: '#root',
    fetchedData: [], 
    viewModelCollection: [],   

    initialize(options) {
        this.fetchedData = options;
        mediator.listenToPort();
    },

    onBeforeStart() {
        if(this.fetchedData.length === 0) {
            console.log('Selections data was not passed to init function');
        } else {
            const ListItemModelCollection = Collection.extend({
                model: ListItemModel
            });

            var tempModelArray = [];
            for (var i = 0; i < this.fetchedData.length; i++) {
                tempModelArray.push(new ListItemModel({
                    id: this.fetchedData[i].id,
                    name: this.fetchedData[i].name,
                    price: this.fetchedData[i].price,
                    active: this.fetchedData[i].active
                }));
            }

            this.viewModelCollection = new ListItemModelCollection(tempModelArray);
        }
    },

    onStart() {
        const rootView = new RootView({collection: this.viewModelCollection});
        this.showView(rootView);
    }
});

export default App;