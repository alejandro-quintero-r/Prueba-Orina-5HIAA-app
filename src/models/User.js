const {Schema, model} = require('mongoose');
bcrypt = require('bcryptjs');

const UserSchema = Schema({
/////////////// Información personal ///////////////////
    identification_type: {
        type: String
    },
    identification: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    sec_lastname: {
        type: String
    }, 

////////////// Información general ///////////////////
    date_of_bird: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    blood_type: {
        type: String,
        required: true,
    },
    rh: {
        type: String,
        required: true,
    },
    marital_status: {
        type: String
    },
    EPS: {
        type: String,
        required: true
    },

////////////// Datos de localización ///////////////////
    home_phone: {
        type: String
    },
    mobile_phone: {
        type: String
    },
    work_phone: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    department: {
        type: String
    },

////////////// Información de la sesión ///////////////////

    role: {
        type: String,   
        required: true,
        default: "patient",
        enum: ["Admin", "Medico", "Empleado", "Paciente"]
    },

    email: {
        type: String,
        required: true,        
        unique: true
    }, 
    password: {
        type: String,
        required: true,                
    },

////////////// Información de contacto ///////////////////
    contact_name: {
        type: String    
    },
    contact_lastname: {
        type: String    
    },
    contact_sec_lastname: {
        type: String
    },
    contact_relationship: {
        type: String
    }, 
    contact_phone: {
        type: String
    },

////////////////////////////////////////////
    last_login_date: {
        type: Date,
        default: Date.now()
    }         
},{
        timestamps: true
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);