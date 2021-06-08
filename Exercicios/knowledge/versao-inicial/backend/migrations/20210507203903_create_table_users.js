
exports.up = function(knex, Promise) {
    return knex.schemas.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defautTo(false)
    })
};

exports.down = function(knex, Promise) {
    return knex.schemas.dropTable('users')
};
