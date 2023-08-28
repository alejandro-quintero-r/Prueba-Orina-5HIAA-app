const usersCtrl = {};

const User = require('../models/User')
const passport = require('passport');


/////Tareas comunes para todos los usuarios///////////////////////////////////////

//Formulario para el ingreso a la plataforma 
usersCtrl.signInForm = (req, res)=>{
    if(req.user==undefined){
        res.render('users/signInForm') 
    }else{
        res.redirect('/users/started')
    }  
};
usersCtrl.signIn = passport.authenticate('local', {    
    successRedirect: "/users/started",
    failureRedirect: "/users/signInError",
    failureFlash: true
});
usersCtrl.signInError = (req, res)=>{
    req.flash('error_msg', 'Usuario o contraseña invalida!!!');
    res.redirect('signInForm')
};
usersCtrl.started = (req, res)=>{
    var Admin = Empleado =  Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;
    res.render('users/started', {Admin, Empleado, Medico, Paciente, name, lastname, sec_lastname, role});
};
/////////// Salida de la plataforma /////////////////////////
usersCtrl.logout = (req, res)=>{
    req.logout();
    req.flash("success_msg", "Ha cerrado sesión exitosamente");
    res.redirect("/");
};

//Crea un usuario de cualquier tipo: admin, paciente, laboratorio o médico.
usersCtrl.createUserForm = (req, res)=>{
    var Admin = true;
    res.render('users/createUserForm', {Admin})
    
};
usersCtrl.createUser = async (req, res)=>{
    //console.log(req.body)    
    var Admin = true;
    const errors = [];
    const { identification_type, identification, name, lastname, sec_lastname, ///Información personal
        date_of_bird, gender, blood_type, rh, marital_status, EPS,             ///Información general
        home_phone, mobile_phone, work_phone, address, city, department,       ///Datos de localización 
        role, email, password, confirm_password,                               ///Información de sesión
        contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone } = req.body; ///Información de contacto
       
    const userIdentification = await User.findOne({ identification: identification });
    const userEmail = await User.findOne({ email: email }); 
    
    ////Información personal
    if(identification_type === '--- Elija un tipo de identificación ---') {
        errors.push({ text: 'Debe ingresar un tipo de identificación valido!!!' });
    }
    if (userIdentification) {
        errors.push({ text: 'La identificación del usuario ya existe en nuestra base de datos!!!' });
    }
    if (identification === '') {
        errors.push({ text: 'Debe ingresar un número de cédula!!!' });
    }
    if (name === '') {
        errors.push({ text: 'Debe ingresar un nombre!!!' });
    }
    if (lastname === '') {
        errors.push({ text: 'Debe ingresar al menos el primer apellido!!!' });
    }

    ///Información general
    if(date_of_bird === '') {
        errors.push({ text: 'Debe ingresar una fecha de nacimiento!!!'})
    }
    if(EPS === ''){
        errors.push({ text: 'Debe ingresar una EPS valida!!!'})
    }

    ///Datos de localización
    if(home_phone === '' && mobile_phone === '' && work_phone === ''){
        errors.push({ text: 'Debe ingresar al menos un número de teléfono!!!'})
    }
    if(address === ''){
        errors.push({ text: 'Debe ingresar una dirección valida!!!'})
    }
    if(city === ''){
        errors.push({ text: 'Debe ingresar una ciudad valida!!!'})
    }
    if(department === ''){
        errors.push({ text: 'Debe ingresar un departamento valido!!!'})
    }

    ////Información de sesión
    if (role === '--- Elija un tipo de usuario ---') {
        errors.push({ text: 'Debe ingresar un tipo de usuario valido!!!' });
    }
    if (email === '') {
        errors.push({ text: 'Debe ingresar un correo electrónico válido!!!' });
    }    
    if (userEmail) {
        errors.push({ text: 'El email del usuario ya existe en nuestra base de datos!!!' });
    }    
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden!!!' });
    }
    if (password.length < 5) {
        errors.push({ text: 'Las contraseñas deben tener almenos 5 caracteres!!!' });
    }
     
    ////Información de contacto
    if(contact_name === ''){
        errors.push({ text: 'Debe ingresar un nombre de contacto valido!!!'});
    }
    if(contact_lastname === ''){
        errors.push({ text: 'Debe ingresar, al menos, un primer apellido de contacto valido!!!'});
    }
    if(contact_relationship === ''){
        errors.push({ text: 'Debe indicar que relación tiene con el contacto!!!'});
    }
    if(contact_phone === ''){
        errors.push({ text: 'Debe ingresar un número de teléfono de contacto valido!!!'});
    }    
    
    if (errors.length > 0) {
        res.render('users/createUserForm', { errors, identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, Admin});
    }else {
        const data = { identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, password, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, };
        const newUser = new User(data);
        newUser.password = await newUser.encryptPassword(password);
        console.log(newUser)
        await newUser.save();
        req.flash('success_msg', 'Usuario agregado!!!');
        res.redirect('started');
    }    
};

//////////////////////////////////////////////////////////////////////////////////
//Crear el primer administrador cuando se instala inicialmente la plataforma
//El primer usuario administrador se crea ingresando directamente la dirección http://localhost:3000/users/createAdminForm
//La idea es que esta dirección quede escondida para el público.
usersCtrl.createAdminForm = async (req, res)=>{  
    //console.log('hola create admin')
    const user = await User.findOne({role: "Admin"});  
    if(!user){
        //console.log('hola create admin otra vez')
        res.render('users/createAdminForm')  
    }else{
        req.flash('error_msg', 'Ya existe un usuario administrador!!!');
        res.redirect('/')
    }
    
};
usersCtrl.createAdmin = async (req, res)=>{
    console.log(req.body) 
    const errors = [];
    const { identification_type, identification, name, lastname, sec_lastname, ///Información personal
        date_of_bird, gender, blood_type, rh, marital_status, EPS,             ///Información general
        home_phone, mobile_phone, work_phone, address, city, department,       ///Datos de localización 
        role, email, password, confirm_password,                               ///Información de sesión
        contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone } = req.body; ///Información de contacto
    
    const userIdentification = await User.findOne({ identification: identification });
    const userEmail = await User.findOne({ email: email }); 
    
    ////Información personal
    if(identification_type === '--- Elija un tipo de identificación ---') {
        errors.push({ text: 'Debe ingresar un tipo de identificación valido!!!' });
    }
    if (userIdentification) {
        errors.push({ text: 'La identificación del usuario ya existe en nuestra base de datos!!!' });
    }
    if (identification === '') {
        errors.push({ text: 'Debe ingresar un número de cédula!!!' });
    }
    if (name === '') {
        errors.push({ text: 'Debe ingresar un nombre!!!' });
    }
    if (lastname === '') {
        errors.push({ text: 'Debe ingresar al menos el primer apellido!!!' });
    }

    ///Información general
    if(date_of_bird === '') {
        errors.push({ text: 'Debe ingresar una fecha de nacimiento!!!'})
    }
    if(EPS === ''){
        errors.push({ text: 'Debe ingresar una EPS valida!!!'})
    }

    ///Datos de localización
    if(home_phone === '' && mobile_phone === '' && work_phone === ''){
        errors.push({ text: 'Debe ingresar al menos un número de teléfono!!!'})
    }
    if(address === ''){
        errors.push({ text: 'Debe ingresar una dirección valida!!!'})
    }
    if(city === ''){
        errors.push({ text: 'Debe ingresar una ciudad valida!!!'})
    }
    if(department === ''){
        errors.push({ text: 'Debe ingresar un departamento valido!!!'})
    }

    ////Información de sesión
    if (role === '--- Elija un tipo de usuario ---') {
        errors.push({ text: 'Debe ingresar un tipo de usuario valido!!!' });
    }
    if (email === '') {
        errors.push({ text: 'Debe ingresar un correo electrónico válido!!!' });
    }    
    if (userEmail) {
        errors.push({ text: 'El email del usuario ya existe en nuestra base de datos!!!' });
    }    
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden!!!' });
    }
    if (password.length < 5) {
        errors.push({ text: 'Las contraseñas deben tener almenos 5 caracteres!!!' });
    }
     
    ////Información de contacto
    if(contact_name === ''){
        errors.push({ text: 'Debe ingresar un nombre de contacto valido!!!'});
    }
    if(contact_lastname === ''){
        errors.push({ text: 'Debe ingresar, al menos, un primer apellido de contacto valido!!!'});
    }
    if(contact_relationship === ''){
        errors.push({ text: 'Debe indicar que relación tiene con el contacto!!!'});
    }
    if(contact_phone === ''){
        errors.push({ text: 'Debe ingresar un número de teléfono de contacto valido!!!'});
    } 

    if (errors.length > 0) {
        res.render('users/createAdminForm', { errors, identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, Admin});
    }else {
        const data = { identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, password, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, };
        const newUser = new User(data);
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario administrador creado!!!');
        res.redirect('/');
    }     
};

////Permite ver usuarios
usersCtrl.seeAllPatientsAdmin = async (req, res)=>{  
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;
    const pList = await User.find({role : 'Paciente'});    
    const Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin, name, lastname, sec_lastname, role})    
};
usersCtrl.seeAllPhysicianAdmin = async (req, res)=>{
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;   
    const pList = await User.find({role : 'Medico'});    
    const Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin, name, lastname, sec_lastname, role})
};
usersCtrl.seeAllLabStaffAdmin = async (req, res)=>{
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;  
    const pList = await User.find({role : 'Empleado'});    
    const Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin, name, lastname, sec_lastname, role})
};
usersCtrl.seeAllAdmin = async (req, res)=>{
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;  
    const pList = await User.find({role : 'Admin'});    
    const Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin, name, lastname, sec_lastname, role})
};
usersCtrl.seeAllUsersAdmin = async (req, res)=>{ 
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const role = req.user.role;      
    const pList = await User.find();    
    const Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin, name, lastname, sec_lastname, role})
};
usersCtrl.findUserByIdentificationForm = (req, res)=>{
    var Admin = true;
    res.render('users/findUserByIdentification', {Admin})
}
usersCtrl.findUserByIdentification = async (req, res)=>{
    const { identification } = req.body;
    const pList = await User.find({identification});
    var Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin})        
}
usersCtrl.findUserByEmailForm = (req, res)=>{
    var Admin = true;
    res.render('users/findUserByEmail', {Admin})
}
usersCtrl.findUserByEmail = async (req, res)=>{
    const { email } = req.body;
    const pList = await User.find({email})
    var Admin = true;
    res.render('users/seeAllUserAdmin', {pList, Admin})
}

//////Permite ver y Editar usuarios///////
usersCtrl.seeUserAdminForm = async (req, res) => {
    const user1 = await User.findById(req.params.id);
    const Admin = true;    
    res.render('users/seeUserAdminForm', {user1, Admin}) 
}

usersCtrl.editUserFormAdmin = async (req, res) => {
    const user1 = await User.findById(req.params.id);
    const Admin = true;    
    res.render('users/editUserAdminForm', {user1, Admin})     
};
usersCtrl.editUserAdmin = async (req, res) => {  
    const {name, lastname, sec_lastname, identification, email, role} = req.body  
    await User.findByIdAndUpdate(req.params.id, {name, lastname, sec_lastname, identification, email, role})  
    const admin = true
    res.redirect('/users/seeAllUsersAdmin') 
}; 
//////Permite borrar usuarios///////
usersCtrl.deletUserAdmin = async (req, res) => {    
    await User.findByIdAndDelete(req.params.id);    
    res.redirect('/users/seeAllUsersAdmin')
};

usersCtrl.myProfile = (req, res)=>{
    const user = req.user;
    if(req.user.role == 'Admin'){
        const Admin = true;
        res.render('users/myProfile', {Admin, user});
    }else if (req.user.role == 'Medico'){
        const Medico = true;
        res.render('users/myProfile', {Medico, user});
    }else if (req.user.role == 'Empleado'){
        const Empleado = true;
        res.render('users/myProfile', {Empleado, user});
    }else if (req.user.role == 'Paciente'){
        const Paciente = true;
        res.render('users/myProfile', {Paciente, user});
    } 
    //res.render('users/myProfile')
}

////Cambiara la contraseña///
usersCtrl.changePasswdForm = (req, res)=>{
    const user = req.user;
    if(req.user.role == 'Admin'){
        const Admin = true
        res.render('users/changePasswd', { user, Admin})
    } else if(req.user.role == 'Empleado'){
        const Empleado = true
        res.render('users/changePasswd', { user, Empleado})
    } else if(req.user.role == 'Medico'){
        const Medico = true
        res.render('users/changePasswd', { user, Medico})
    } else if(req.user.role == 'Paciente'){
        const Paciente = true
        res.render('users/changePasswd', { user, Paciente})
    }

} 
usersCtrl.changePasswd = async (req, res)=>{
    const errors = [];
    const { actual_password, new_password, confirm_new_password } = req.body
    
    const match = await req.user.matchPassword(actual_password);
    if(!match){
        //console.log('No digitaste bien tu contraseña actual!!!')
        errors.push({ text: 'No digitaste bien tu contraseña actual!!!'}); 
    } 
    if ( new_password != confirm_new_password) {
        errors.push({ text: 'La neva contraseña y la confirmación no coinciden!!!' });
    }
    if (new_password.length < 5) {
        errors.push({ text: 'La nueva contraseña debe tener almenos 5 caracteres!!!'});
    }

    if (errors.length > 0) {
        if(req.user.role == 'Admin'){
            const Admin = true;
            res.render('users/changePasswd', {errors, Admin});
        }else if (req.user.role == 'Medico'){
            const Medico = true;
            res.render('users/changePasswd', {errors, Medico});
        }else if (req.user.role == 'Empleado'){
            const Empleado = true;
            res.render('users/changePasswd', {errors, Empleado});
        }else if (req.user.role == 'Paciente'){
            const Paciente = true;
            res.render('users/changePasswd', {errors, Paciente});
        }               
    } else {
        password = await req.user.encryptPassword(new_password);        
        //console.log(password);
        const id = req.user._id;
        await User.findByIdAndUpdate(id, { password });
        req.flash('success_msg', 'Contraseña actualizada!!!');
        res.redirect('/users/started')         
    }
};
///Cuando se olvida la contraseña
usersCtrl.forgotPasswordForm = (req, res)=>{
    if(req.user == undefined){
        res.render('users/forgotPasswordForm')
    }else{
        res.redirect('/users/started')
    }
}
usersCtrl.forgotPassword = async (req, res)=>{
    const { email } = req.body;
    const user = await User.findOne({email});    

    if(user != null){
        //console.log(user);
        const {name, lastname, sec_lastname} = user;
        var passwd = '';
        var characters = 'ABCDEFGHIJ#KLM!NO$PQR%ST&UVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
           passwd += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        //console.log(passwd)

        password = await user.encryptPassword(passwd); 
        const id = user._id;
        await User.findByIdAndUpdate(id, { password });
        const message = "Su contraseña ha sido cambiada."

        contentHTML = `
        <h1>PSA - sistema de información</h1>
        <h4>Sistema hospitalario del Huila</h4>
        <ul>
            <li>Usuario: ${name } ${lastname } ${sec_lastname }</li>
            <li>Email: ${email}</li>
            <li>Nueva contraseña: ${passwd}</li>             
        </ul>
        <p>${message}</p> `;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'gtst@usco.edu.co',  
                pass: 'pnckgyqntqlzjzagfffffff'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        let info = await transporter.sendMail({
            from: '"Plataforma PSA - GTST-Usco" <gtst@usco.edu.co>', // sender address,
            to: email,                               //A esta dirección sera enviado el correo
            subject: 'Recuperación de contraseña',
            // text: 'Hello World'
            html: contentHTML
        })


    } 
    req.flash('success_msg', 'Por favor revisa tu correo electrónico!!!');
    res.redirect('/users/signInForm')
}




module.exports = usersCtrl;