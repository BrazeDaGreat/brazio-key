/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh8cz6jg4buip9j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hn1nunb",
    "name": "Website",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh8cz6jg4buip9j")

  // remove
  collection.schema.removeField("5hn1nunb")

  return dao.saveCollection(collection)
})
