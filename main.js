import inquirer from "inquirer";
//Class user
class User {
    constructor(name, email, password) {
        (this.name = name), (this.email = email), (this.password = password);
        this.id = ++User.count;
    }
    getUserId() {
        console.log(`Your id is ${this.id}`);
    }
}
User.count = Math.round(Math.random() * 10);
const usersArray = [];
//Welcome function
const welcome = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
//greetUser fucntion
async function greetUser() {
    console.log("Welcome To Our Ticketing Application ! ");
    await welcome();
}
greetUser();
async function select() {
    await welcome();
    const userAns = await inquirer.prompt([{
            type: "list",
            name: "option",
            message: "Select operation you want to perform.",
            choices: ["Sign Up", "Login"]
        }]);
    const { option } = userAns;
    if (option == "Sign Up") {
        await getSignIn();
    }
    else if (option == "Login") {
        await logIn();
    }
}
//Sign In function
async function getSignIn() {
    console.log("Sign Up For continue!");
    const signIn = await inquirer.prompt([
        {
            type: "confirm",
            name: "userAns",
            message: "First do sign in please.",
        },
    ]);
    const { userAns } = signIn;
    if (userAns == true) {
        const signInInfo = await inquirer.prompt([
            {
                type: "string",
                name: "name",
                message: "Enter Your Name : ",
            },
            {
                type: "string",
                name: "email",
                message: "Enter Your Email: ",
            },
            {
                type: "password",
                name: "Password",
                message: "Enter Your Password: ",
                mask: "*",
                validate: function (input) {
                    if (input.length < 8) {
                        console.log("Password must be at least 8 character!");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            },
        ]);
        const { name, email, Password } = signInInfo;
        if (name && email && Password) {
            const user = new User(name, email, Password);
            console.log("Sign Up successfully!");
            usersArray.push(user);
            user.getUserId();
            // console.log(usersArray)
        }
        else {
            console.error("Sign Up failed!");
            console.log("Please enter complete information.");
        }
    }
}
async function logIn() {
    console.log("Login For Continue");
    const userAns = await inquirer.prompt([
        {
            type: "string",
            name: "name",
            message: "Enter Your Name : ",
        },
        {
            type: "string",
            name: "email",
            message: "Enter Your Email: ",
        },
        {
            type: "password",
            name: "Password",
            message: "Enter Your Password: ",
            mask: "*",
        },
        {
            type: "number",
            name: "id",
            message: "Enter Your Id: ",
        }
    ]);
    const { name, email, Password, id } = userAns;
    // console.log(usersArray)
    const index = usersArray.findIndex(user => user.id == id);
    if (index !== -1) {
        let isInclude = usersArray[index].name.includes(name) && usersArray[index].email.includes(email) && usersArray[index].password.includes(Password);
        if (isInclude) {
            console.log("Succcessfully Login!");
        }
        else {
            console.log("Failed to login!");
        }
    }
    else {
        console.log("Failed to login");
    }
}
do {
    await select();
} while (true);
