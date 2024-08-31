/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh8cz6jg4buip9j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ph3pdor7",
    "name": "pinned",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh8cz6jg4buip9j")

  // remove
  collection.schema.removeField("ph3pdor7")

  return dao.saveCollection(collection)
})
