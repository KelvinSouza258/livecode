migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2gc8v3gohiwm8i7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xnepw6qw",
    "name": "thumbnail",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2gc8v3gohiwm8i7")

  // remove
  collection.schema.removeField("xnepw6qw")

  return dao.saveCollection(collection)
})
