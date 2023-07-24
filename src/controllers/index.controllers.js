const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    if(req.user == undefined){
        res.render('index')
    }else{
        res.redirect('users/started')
    }       
}; 


module.exports = indexCtrl; 