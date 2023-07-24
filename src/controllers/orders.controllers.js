const ordersCtrl = {};

const User = require('../models/User');
const Orders = require('../models/Orders');

ordersCtrl.renderForm = (req, res) => { 
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;
    res.render('orders/addOrderForm' , {name, lastname, sec_lastname, role});    
}; 

ordersCtrl.findUserByIdentification = async (req, res)=>{
    const { identification } = req.body;
    const pList = await User.find({identification});
    const userID = pList[0]._id;    
    const {date, hour, observation} = req.body; 
    const {name, lastname, sec_lastname} = req.user;
    const physicianName = name + ' ' + lastname + ' ' + sec_lastname; 
    const data = { userID, date, hour, observation, physicianName };
    const newOrder = new Orders(data);

    await newOrder.save();
    req.flash('success_msg', 'Cita creada satisfactoriamente');
    res.redirect('/');    
};

ordersCtrl.findOrders = async (req, res)=>{
    const orderList = await Orders.find( {"completed": false});
    const ordersData = [];
    for (const user in orderList) {
        orderID = orderList[user].id;
        id = orderList[user].userID;
        const {name, lastname, sec_lastname} = await User.findById(id).exec();
        const {date, hour, observation} = orderList[user];
        const data = {name, lastname, sec_lastname, date, hour, observation, orderID};
        ordersData.push(data);
    } 
    res.render('orders/orderslist', {ordersData})   
};


module.exports = ordersCtrl; 