const express = require('express')
const OrderDB = require('../models/OrdersDB')
const router = express.Router()
const DeliveryWorker = require('../models/DeliveryWorker')
const Contact = require('../models/Contact')


router.get('/contacts', (req,res)=>{
    Contact.find({}, function (err, results) {
        if (err)
            res.send(err)
        else
            res.send({ Orders : results })
    })
})

router.post('/contact', (req,res)=>{
    const contact = new Contact(req.body)
    contact.save()
    res.end()
})

router.get('/totalOrders', (req, res) => {
    OrderDB.find({}, function (err, results) {
        if (err)
            res.send(err)
        else
            res.send({ Orders : results })
    })
})

router.post('/addorder', function (req, res) {
    const order = new OrderDB(req.body)
    order.save()
    res.end()
})

router.delete('deleteorder', function(req, res){
    OrderDB.findByIdAndDelete(req.body.id).lean()
    .exec(function (err, oldFeature) {
        if (err) {
            res.send(err)
        } else {
            res.end()
        }
    })
})

router.post('/assignOrder', function (req, res) {
    const order = new Order(req.body.order)
    DeliveryWorker.updateOne({ userName: req.body.userName, password: req.body.password }, { $addToSet: { packages: order._id } }
        , function (err, data) {
            if (err)
                res.send(err)
            else {
                order.save()
                OrderDB.updateOne({ id: req.body._id }, { $set: { assignedTO: req.body.userName } }, function (err, data) {
                    if (err)
                        res.send(err)
                    else {
                        res.end()
                    }
                })
            }
        })
})



module.exports = router