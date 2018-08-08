<%_ if (widget.type === 'WIDGET_TYPE_LIST') { _%>
<%- include partials/list-template.vue %>
<%_ } else { _%>
<%- include partials/show-template.vue %>
<%_ } _%>
