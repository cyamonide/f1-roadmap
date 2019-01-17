import pymongo

class F1_db:
    def __init__(self, collection_name):
        self.client = pymongo.MongoClient("mongodb://localhost:27017/")
        self.db = self.client["f1_2018"]
        if collection_name in self.db.list_collection_names():
            print("Warning: collection " + collection_name + " exists.")
        self.col = self.db[collection_name]

    def update_one(self, obj, key=""):
        """
        Arguments:
            obj: object (dic6) to insert
            key: default="", unique key if updating
        """
        if key!="" and self.col.find({key: obj[key]}).count() > 0:
            self.col.update_one({key: obj[key]}, {"$set": obj})
            print("Updated entry.")
        else:
            self.col.insert_one(obj)
            print("Inserted entry.")

    def update_many(self, objs, key=""):
        """
        Arguments:
            objs: list of objects (dicts) to insert
            key: default="", unique key if updating
        """
        updated = 0
        inserted = 0

        for obj in objs:
            if key!="" and self.col.find({key: obj[key]}).count() > 0:
                updated += 1
                self.col.update_one({key: obj[key]}, {"$set": obj})
            else:
                inserted += 1
                self.col.insert_one(obj)

        print("Updated " + str(updated) + " entries.")
        print("Inserted " + str(inserted) + " entries.")

    def flush(self):
        self.col.delete_many({})