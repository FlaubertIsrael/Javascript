const queries = require('./requiries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id
        
        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informado')
            existsOrError(article.categoryId, 'Categoria não informado')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')                                                         
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(article.id) {
            app.db('article')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            
            try {  
                notExistsOrError(rowsDeleted, 'Artigo não encontrado.') 
            } catch(msg) {
                res.status(204).send()
            } 

            res.status(500).send(msg)            
            } catch(msg) {

        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.nome', 'a.description', 'a.imageUrl', { autor: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch((err => res.status(500).send(err)))
    }

    return { save, remove, get, getById }
}