const statisticsCtrl = {};

const User = require('../models/User');
const Orders = require('../models/Orders');
const Results = require('../models/Results');

/* Exámenes agrupados por género */
statisticsCtrl.renderGenderGraphics = async (req, res) => { 
    
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

    //Exámenes realizados clasificados por género 
    const orderList = await Orders.find( {"completed": true});
    var male = 0;
    var female = 0;
    for (const user in orderList) {
        id = orderList[user].userID;
        const {gender} = await User.findById(id).exec();
        
        if (gender == "Masculino"){
            male = male + 1; 
        } else {
            female = female + 1; 
        }
    }
    const doneExamsPerGender = {femenino : female, masculino : male  }

    // Resultados anormales agrupados por género resultados normales de 2 a 9 mg por 24 horas
    const anormalResultsList = await Results.find({
        $or: [
        {result:{$gte: 9}},
        {result:{$lte: 2}}
    ]});

    userIDsList = [];
    for (const user in anormalResultsList) {
        orderID = anormalResultsList[user].orderId;
        foundOrders = await Orders.findById(orderID).exec();
        userIDsList.push(foundOrders);
    }   

    var male = 0;
    var female = 0;

    for (order in userIDsList){
        idUser = userIDsList[order].userID;
        const {gender} = await User.findById(idUser).exec();
        
        if (gender == "Masculino"){
            male = male + 1; 
        } else {
            female = female + 1; 
        }
    }

    const badResultsPerGender = {femenino : female, masculino : male}
    const badResultFemenino = badResultsPerGender.femenino
    const badResultMasculino = badResultsPerGender.masculino
    const normalResultFemenino = doneExamsPerGender.femenino
    const normalResultMasculino = doneExamsPerGender.masculino
    console.log(badResultFemenino)

    res.render('statistics/statisticsGender', {badResultFemenino, badResultMasculino, normalResultFemenino, normalResultMasculino, Empleado, Medico, Admin, Paciente, role});    
}; 

/* Agrupados por pueblo */
statisticsCtrl.renderCityGraphics = async (req, res) => { 

    let Empleado = false;
    let Admin = false;
    let Medico = false;
    let Paciente = false;

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



    //Exámenes realizados clasificados por ciudad
    const orderList = await Orders.find( {"completed": true});
    const cities = [];

    for (const user in orderList) {
        id = orderList[user].userID;
        const {city} = await User.findById(id).exec();
        cities.push(city);
    }
    console.log(cities);
    citiesCount = {};
    for (const city in cities){
        /* let claves = Object.keys(citiesCount) */
        if (Object.keys(citiesCount).includes(cities[city]) == true){
            citiesCount[cities[city]] = citiesCount[cities[city]] + 1;
        } else {
            citiesCount[cities[city]] = 1;
        }
    }
    console.log(citiesCount);
    const keys = Object.keys(citiesCount);
    const valores = Object.values(citiesCount);
    res.render('statistics/statiticsCity', {keys, valores, Empleado, Medico, Admin, Paciente});    
}; 

/* Exámenes anormales */
statisticsCtrl.anormalResultsList = async (req, res) => {
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


    const resultList = await Results.find({$or: [
        {result:{$gte: 9}},
        {result:{$lte: 2}}
    ]});
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
    console.log(data)
    res.render('statistics/anormalResults', {data, Empleado, Medico, Admin, Paciente, role});    
}; 


module.exports = statisticsCtrl; 