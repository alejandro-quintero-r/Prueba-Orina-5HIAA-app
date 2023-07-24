const resultsCtrl = {};

const User = require('../models/User');
const Orders = require('../models/Orders');
const Result = require('../models/Results');

resultsCtrl.renderForm = (req, res) => {
    const orderId = req.params.orderID; 
    res.render('results/addResultForm', {orderId});
};

resultsCtrl.addResult = async (req, res)=>{ 
    const {result, observation, orderId} = req.body;
    const data = { result, observation, orderId};
    const newResult = new Result(data);

    const completed = true;
    await Orders.findByIdAndUpdate(orderId, {completed});

    await newResult.save(); 
    req.flash('success_msg', 'Resultado añadido satisfactoriamente');
    res.redirect('/');    
};

resultsCtrl.findResults = async (req, res) => {
    const resultList = await Result.find();
    data = [];

    for (const user in resultList) {
        const {result, observation} = resultList[user];
        const orderID = resultList[user].orderId;
        const order = await Orders.findById(orderID).exec();
        const idUser = order.userID;
        const {name, lastname, sec_lastname} = await User.findById(idUser).exec();
        const infoResult = {name, lastname, sec_lastname, result, observation}; 
        data.push(infoResult);
    }

    res.render('results/resultList', {data})  
};

resultsCtrl.findMyResults = async (req, res) => {
    if(req.user == undefined){
        res.redirect('/')
    }else{
    const user = req.user;
    const ordersList = await Orders.find({ userID: user.id, completed: true });
    const data = [];

    for (const order of ordersList) {
    const orderID = order.id;
    const physicianName = order.physicianName;
    const resultDocument = await Result.findOne({ orderId: orderID }).exec();
    if (resultDocument !== null) {
        const { result, observation, createdAt } = resultDocument;
        const date = new Date(createdAt);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        const infoData = { result, observation, createdAt: formattedDate, physicianName };
        data.push(infoData);
    }
    }

    console.log(data);

    res.render('results/myresults', { data });
    }    
};





module.exports = resultsCtrl; 