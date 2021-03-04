// 数据库引用
const mongodb = require('mongodb');
// 数据库地址
const dataBaseUrl = "mongodb://127.0.0.1:27017/gift";
// events模块
// const events = require("events");
// const EventEmitter = new events.EventEmitter();
// const { query } = require('express');
// 数据库模块化
function _mongoModul(callback) {
    // 数据库链接
    mongodb.MongoClient.connect(dataBaseUrl, { useUnifiedTopology: true }, function (error, client) {
        if (error) {
            console.log(error)
        }
        var DB = client.db('gift');
        var CL = client;
        callback(DB, CL);
    })
}
// 数据添加
exports.addData = function (collectionName, json, callback) {
    _mongoModul(function (db, cl) {
        db.collection(collectionName).insertOne(json, function (err, result) {
            if (err) {
                console.log('写入数据失败');
                return;
            } else {
                callback(result);
                cl.close();
            }
        })
    })
}
// 数据删除
exports.removeData = function (collectionName, json, callback) {
    _mongoModul(function (db, cl) {
        db.collection(collectionName).deleteOne(json, function (error, result) {
            if (error) {
                throw new Error('删除数据失败'); return;
                return;
            } else {
                callback(result);
                cl.close();
            }
        })
    })
}
// 数据修改
exports.upData = function (callectionName, json, newData, callback) {
    _mongoModul(function (db, cl) {
        db.collection(callectionName).updateOne(json, { $set: newData }, function (err, results) {
            if (err) {
                console.log(err)
                console.log("数据修改失败")
            } else {
                callback(results);
                cl.close();
            }
        })
    })
}
// 数组修改
exports.addArrData = function (callectionName, conditions, newData, callback) {
    _mongoModul(function (db, cl) {
        db.collection(callectionName).update(conditions, { $addToSet: newData }, function (err, results) {
            if (err) {
                console.log(err)
                console.log("数组数据添加失败")
            } else {
                callback(results);
                cl.close();
            }
        })
    })
}
// 数组删除
exports.pullArrData = function (callectionName, conditions, json, callback) {
    _mongoModul(function (db, cl) {
        db.collection(callectionName).updateOne(conditions, { $pull: json }, function (err, results) {
            if (err) {
                console.log(err)
                console.log("数组数据删除失败")
            } else {
                callback(results);
                cl.close();
            }
        })
    })
}
// 数据查询
exports.findData = function (collectionName, json, callback) {
    _mongoModul(function (db, cl) {
        userRel = db.collection(collectionName).find(json);
        userRel.toArray(function (err, data) {
            if (err) {
                console.log(err)
            } else {
                callback(data);
            }
            cl.close();
        })
    })
}
// 获取的表的长度
exports.findDataLen = function (collectionName, callback) {
    _mongoModul(function (db, cl) {
        var userRel = db.collection(collectionName).find({});
        userRel.count({}, function (err, len) {
            if (err) {
                console.log(err)
            } else {
                callback(len);
            }
            cl.close();
        })
    })
}
// 分页查询
exports.findDataPage = function (collectionName, json, _id, page, rows, callback) {
    _mongoModul(function (db, cl) {
        var userRel = db.collection(collectionName).find(json);
        userRel.count({}, function (err, len) {
            if (err) {
                console.log(err)
            } else {
                userRel.skip((page - 1) * rows);
                userRel.limit(rows);
                userRel.toArray(function (err, data) {
                    if (err) {
                        console.log('读取数据失败', err);
                    } else {
                        var jsonData = {
                            total: len,
                            data: data
                        }
                        callback(jsonData);
                        cl.close()
                    }
                })
            }
        })
    })
}