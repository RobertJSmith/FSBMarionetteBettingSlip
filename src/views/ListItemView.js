import {View} from 'backbone.marionette';
import {_} from 'underscore';
import mediator from '../mediator';

const ListItemView = View.extend({
    tagName: 'div',
    className: function() {
        let className = 'fav-list-item';
        let active = this.model.get('active');

        if (!active) {
            className += ' disabled';
        }

        return className;
    },
    template: _.template('<p><%= name%></p><button class="fav-list-item-btn"<%if(!active){%>disabled="true"<%}%>><%= price%></button>'),
    events: {
        'click .fav-list-item-btn' : 'updateCounter'
    },

    onRender() {
        var selected = this.model.get('selected');

        if (selected) {
            this.$el.addClass('item-selected')
        } else {
            this.$el.removeClass('item-selected')
        }
    },

    updateCounter(event) {
        var element = event.currentTarget;
        var key = this.model.get('id');

        if (element.parentElement.classList.contains('item-selected')) {
            element.parentElement.classList.remove("item-selected");
            this.model.set('selected', false);
            mediator.publish('bet-update', {id: key, type: 'remove'});
        } else {
            element.parentElement.classList.add("item-selected");
            this.model.set('selected', true);
            mediator.publish('bet-update', {id: key, type: 'add'});
        }
    }
});

export default ListItemView;