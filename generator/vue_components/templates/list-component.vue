<%_ if (schemaOptions.list_style === 'cards') { _%>
<%- include list-cards-partial.vue %>
<%_ } else { _%>
<%- include list-table-partial.vue %>
<%_ } _%>
