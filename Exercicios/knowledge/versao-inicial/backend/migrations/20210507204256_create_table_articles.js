
exports.up = function(knex, Promise) {
    return knex.schema.createTable('article', table => {
        table.increments('id').primary()
        table.strings('name').notNull()
        table.strings('description', 1000).notNull()
        table.strings('imageUrl', 1000)
        table.binary('content').notNull()
        table.integer('UserId').references('id')
            .inTable('users').notNull()
        table.integer('categoryId').references('id')
            .inTable('categories').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};
