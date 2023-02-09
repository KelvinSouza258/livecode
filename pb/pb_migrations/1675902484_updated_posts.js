migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2gc8v3gohiwm8i7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fqwkznqx",
    "name": "favorite",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2gc8v3gohiwm8i7")

  // remove
  collection.schema.removeField("fqwkznqx")

  return dao.saveCollection(collection)
})
