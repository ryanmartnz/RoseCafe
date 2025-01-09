module.exports = (req, res, next) => {
    const { first_name, last_name, email, phone, password } = req.body;

    function validName(userName) {
        return /^[a-zA-Z0-9]+$/.test(userName);
    }

    function validPhone(userPhone) {
        return /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/.test(userPhone);
    }

    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) {
        if(!(/.{8}/.test(userPassword))) {
            return false;
        } else if(!(/\d+/.test(userPassword))) {
            return false;
        } else if(!(/[A-Z]+/.test(userPassword))) {
            return false;
        } else if(!(/[a-z]+/.test(userPassword))) {
            return false;
        } else if(!(/[^a-zA-Z0-9]+/.test(userPassword))) {
            return false;
        } else {
            return true;
        }
    }

    if (req.path === "/register") {
        if (![first_name, last_name, email, phone, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validName(first_name)) {
            return res.status(401).json("Invalid First Name");
        } else if (!validName(last_name)) {
            return res.status(401).json("Invalid Last Name");
        } else if (!validPhone(phone)) {
            return res.status(401).json("Invalid Phone Number");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        } else if (!validPassword(password)) {
            return res.status(401).json("Invalid Password");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        } else if (!validPassword(password)) {
            return res.status(401).json("Invalid Password");
        }
    }
    
    next();
};