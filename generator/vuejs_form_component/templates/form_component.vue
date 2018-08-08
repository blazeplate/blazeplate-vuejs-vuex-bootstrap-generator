<%_ if (options.ui_framework.id === 'bootstrap') { _%>
<%- include partials/template-tag-bootstrap.vue %>
<%_ } else { _%>
<%- include partials/template-tag-no-ui.vue %>
<%_ } _%>

<!-- // // // //  -->

<%- include partials/script-tag.vue %>