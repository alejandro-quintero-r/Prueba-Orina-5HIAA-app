const ordersCtrl = {};

const User = require('../models/User');
const Orders = require('../models/Orders');

ordersCtrl.renderForm = (req, res) => {

    let Empleado = false;
    let Admin = false;
    let Medico = false;
    let Paciente = false;
    let role = null

    if (req.isAuthenticated()){
        const role = req.user.role;

        if (role == "Empleado"){
            Empleado = true
        } else if (role == "Admin"){
            Admin = true
        } else if (role == "Medico"){
            Medico = true
        } else if (role == "Paciente"){
            Paciente = true
        }
          
    }


    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    res.render('orders/addOrderForm' , {name, lastname, sec_lastname, role, Empleado, Medico, Admin, Paciente});    
}; 

ordersCtrl.findUserByIdentification = async (req, res)=>{


    const { identification } = req.body;
    const pList = await User.find({identification});
    const userID = pList[0]._id;    
    const {observation} = req.body; 
    const {name, lastname, sec_lastname} = req.user;
    const physicianName = name + ' ' + lastname + ' ' + sec_lastname; 
    const data = { userID, observation, physicianName };
    const newOrder = new Orders(data);

    await newOrder.save();
    req.flash('success_msg', 'Cita creada satisfactoriamente');
    res.redirect('/');    
};

/* Se usa para agregar fecha y hora del examen */
ordersCtrl.editOrderForm = async (req, res) => {
    let Empleado = false;
    let Admin = false;
    let Medico = false;
    let Paciente = false;
    let role = null

    if (req.isAuthenticated()){
        const role = req.user.role;

        if (role == "Empleado"){
            Empleado = true
        } else if (role == "Admin"){
            Admin = true
        } else if (role == "Medico"){
            Medico = true
        } else if (role == "Paciente"){
            Paciente = true
        }
          
    }


    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const orderId = await Orders.findById(req.params.id);  
    console.log(req.params)
    res.render('orders/editOrdersForm', {name, lastname, sec_lastname, role, orderId, Empleado, Medico, Admin, Paciente});
}; 


ordersCtrl.editOrder = async (req, res) => {  
    console.log(req.body.orderId)
    const {date, hour} = req.body 
    await Orders.findByIdAndUpdate(req.body.orderId, {date, hour})
    res.redirect('/users/started')
}; 



ordersCtrl.findOrders = async (req, res)=>{
    let Empleado = false;
    let Admin = false;
    let Medico = false;
    let Paciente = false;
    let role = null

    if (req.isAuthenticated()){
        const role = req.user.role;

        if (role == "Empleado"){
            Empleado = true
        } else if (role == "Admin"){
            Admin = true
        } else if (role == "Medico"){
            Medico = true
        } else if (role == "Paciente"){
            Paciente = true
        }
          
    }

    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;

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
    res.render('orders/orderslist', {ordersData, Empleado, name, lastname, sec_lastname, role, Empleado, Medico, Admin, Paciente})       
};
  
module.exports = ordersCtrl; 