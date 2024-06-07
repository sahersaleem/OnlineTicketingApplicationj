#! /usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
import events from "inquirer/lib/utils/events.js";

//Class user
class User {
  static count: number = 0;
  id: number;
  name: string;
  email: string;
  password: any;
  tickets: Ticket[] = [];
  constructor(name: string, email: string, password: any) {
    (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.id = ++User.count);
  }
  getId() {
    console.log(`Your Id is ${this.id}`);
  }

  getTicket(Ticket: Ticket) {
    this.tickets.push(Ticket);
  }

  getFull() {
    console.table(this.tickets);
  }
}

// event
class Event {
  eventName: string;
  eventTitle: string;
  location: string;
  date: string;
  city: string;
  frontSeats: number;
  backSeats: number;
  frontPrice: number;
  backprice: number;
  static count = 0;
  id: number;

  constructor(
    name: string,
    title: string,
    location: string,
    date: string,
    city: string,
    frontSeats: number,
    backSeats: number,
    frontseatPrice: number,
    backseatPrice: number
  ) {
    (this.eventName = name),
      (this.eventTitle = title),
      (this.location = location),
      (this.date = date),
      (this.city = city);
    this.frontSeats = frontSeats;
    this.backSeats = backSeats;
    this.backprice = backseatPrice;
    this.frontPrice = frontseatPrice;
    this.id = ++Event.count;
  }

  getEventDetail() {
    console.log(chalk.yellow("\nEvent Created Successfully!"))
    console.log(chalk.magenta(`\n==>Event Name : "${this.eventName}" 
    Event Title : "${this.eventTitle}" , 
    Event City: "${this.city}", 
    Event Location : "${this.location}" ,
    Event Date:"${this.date}" 
    Available front Seats :${this.frontSeats}
    Available back seats : ${this.backSeats} 
    Seats for Front : ${this.frontPrice} ,
    Seats for back : ${this.backprice}
  
  `))
  }
}

class Ticket {
  title: string;
  id: number;
  static count = 0;
  frontSeats: number | null;
  backseats?: number | null;

  constructor(
    eventTitle: string,
    frontseats: number | null,
    backseats: number | null
  ) {
    (this.title = eventTitle), (this.id = ++Ticket.count);
    this.frontSeats = frontseats;
    this.backseats = backseats;
  }

  getID() {
    console.log("Your order is placed.");
    console.log(`ID OF YOUR ORDER ${this.id}`);
  }
}

const usersArray: User[] = [];
const event: Event[] = [];
// const ticket: Ticket[] = [];

//Welcome function
const welcome = () => {
  return new Promise((res) => {
    setTimeout(res, 3000);
  });
};





//greetUser fucntion
async function greetUser() {
  let welcomText = chalkAnimation.rainbow(
    "Welcome To Our Ticketing System - your access to exclusive events and unforgettable experiences! "
  );
  await welcome();
  welcomText.stop();
}

greetUser();

async function select() {
  await welcome();
  let programRun = true;
  while (programRun) {
    const userAns = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: chalk.bold.blue("Select an option to proceed:"),
        choices: ["Sign Up", "Login", "Exit"],
      },
    ]);

    const { option } = userAns;

    if (option == "Sign Up") {
      await getSignIn();
    } else if (option == "Login") {
      await logIn();
    } else if (option == "Exit") {
      programRun = false;
      break;
    }
  }
}

//Sign In function
async function getSignIn() {
  console.log(chalk.blueBright("Sign Up For continue!"))
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
      validate: function (input: string) {
        if (input.length < 8) {
          console.log("Password must be at least 8 character!");
          return false;
        } else {
          return true;
        }
      },
    },
  ]);

  const { name, email, Password } = signInInfo;

  if (name && email && Password) {
    const user = new User(name, email, Password);
    console.log(chalk.cyanBright("Sign Up successfully!"))
    usersArray.push(user);
    user.getId();

    // console.log(usersArray)
  } else {
    console.error(chalk.redBright("Sign Up failed!"));
    console.log(chalk.redBright("Please enter complete information."));
  }
}

//Login function
async function logIn() {
  console.log(chalk.yellow("Login For Continue"))

  const userAns = await inquirer.prompt([
    {
      type: "string",
      name: "email",
      message: "Enter Your Email : ",
    },
    {
      type: "password",
      name: "password",
      message: "Enter Your Password : ",
      mask: "*",
    },
  ]);

  const { email, password } = userAns;
  if (email == "saher@gmail.com" && password == "saher1234") {
    await LoginAdmin();
  }
  // console.log(usersArray)
  const index = usersArray.findIndex((user) => user.password == password);

  if (index !== -1) {
    let isInclude =
      usersArray[index].email.includes(email) &&
      usersArray[index].password.includes(password);
    if (isInclude) {
      console.log(chalk.blue("Successfully login!"))
      await userAction();
    } else {
      console.log(chalk.red("failed to login!"))
    }
  }
}
// separate functionality for admin
async function LoginAdmin() {
  let continueProgram = true;
  let welcomeAdmin = chalkAnimation.pulse(
    "Welcome admin! How can we assist you today?"
  );
  await welcome();
  welcomeAdmin.stop();
  while (continueProgram) {
    const adminAns = await inquirer.prompt([
      {
        type: "list",
        name: "opt",
        message: "What would you like to do ?",
        choices: [
          "Create Event",
          "View Event",
          "Edit Event",
          "Delete Events",
          "Exit",
        ],
      },
    ]);

    const { opt } = adminAns;

    if (opt == "Create Event") {
      const eventInfo = await inquirer.prompt([
        {
          type: "string",
          name: "name",
          message: "Enter event name you want to create.",
        },
        {
          type: "string",
          name: "title",
          message: "Enter event title you want to create.",
        },
        {
          type: "string",
          name: "date",
          message: "Enter event date in YYYY-DD-MM HH:mm:ss Format.",
          validate: function (input: string) {
            let checkFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!checkFormat.test(input)) {
              console.log(chalk.red("Please enter date in number please."))
              return false;
            }

            return true;
          },
        },
        {
          type: "string",
          name: "city",
          message: "Enter event City you want to create.",
        },
        {
          type: "string",
          name: "location",
          message: "Enter event Location you want to create.",
        },
        {
          type: "number",
          name: "frontseats",
          message: "Enter no of front seats:",
          validate: function (input: number) {
            if (isNaN(input)) {
              console.log(chalk.red("Please enter no of front seats in number"))
              return false;
            }

            return true;
          },
        },
        {
          type: "number",
          name: "frontseatsPrice",
          message: "Enter price for front seats: ",
        },

        {
          type: "number",
          name: "backseats",
          message: "Enter no of back  seats:",
          validate: function (input: number) {
            if (isNaN(input)) {
              console.log(chalk.red("Please enter no of back seats in number"))
              return false;
            }

            return true;
          },
        },

        {
          type: "number",
          name: "backseatsPrice",
          message: "Enter price for Back seats: ",
        },
      ]);

      const {
        name,
        title,
        date,
        city,
        location,
        frontseats,
        backseats,
        frontseatsPrice,
        backseatsPrice,
      } = eventInfo;

      const newEvent = new Event(
        name,
        title,
        location,
        date,
        city,
        frontseats,
        backseats,
        frontseatsPrice,
        backseatsPrice
      );
      event.push(newEvent);
      newEvent.getEventDetail();
    }

    if (opt == "View Event") {
      console.log("Available Events");
    console.table(event);
    }

    if (opt == "Delete Events") {
      const deleteEvents = await inquirer.prompt([
        {
          type: "list",
          name: "events",
          message: "Select events which you want to delete :",
          choices: event.map((event) => event.eventName),
        },
      ]);


      const { events } = deleteEvents;
      const findIndexOfDeleteEvents = event.findIndex(
        (event) => event.eventName == events
      );

  

      if (findIndexOfDeleteEvents !== -1) {
        const deleteEvent = event.splice(findIndexOfDeleteEvents, 1);
        console.log(chalk.bold.blue("Updated Event List"))
        console.table(event);
      }
    }

    if (opt == "Edit Event") {
      console.log("\nFollowing events are available!");
      console.table(event);
      const edit = await inquirer.prompt([
        {
          type: "number",
          name: "eventId",
          message: "Enter the event id you want to edit?",
          validate: function (input: number) {
            if (isNaN(input)) {
              console.log(chalk.red("Please enter Id in number"))
              return false;
            }

            return true;
          },
        },
      ]);
      const { eventId } = edit;
      const findIndexOfEditEvent = event.findIndex((id) => id.id == eventId);

      let currObj = event[findIndexOfEditEvent];

      const editProperty = await inquirer.prompt([
        {
          type: "string",
          name: "name",
          message: "Enter new event name:.",
          default: currObj.eventName,
        },
        {
          type: "string",
          name: "title",
          message: "Enter new event title:",
          default: currObj.eventTitle,
        },
        {
          type: "string",
          name: "date",
          message: "Enter new event date in YYYY-DD-MM HH:mm:ss Format.",
          default: currObj.date,
          validate: function (input: string) {
            let checkFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!checkFormat.test(input)) {
              console.log(chalk.red("Please enter date in correct format."))
              return false;
            }

            return true;
          },
        },
        {
          type: "string",
          name: "city",
          message: "Enter new city of event:.",
          default: currObj.city,
        },
        {
          type: "string",
          name: "location",
          message: "Enter new location of event:",
          default: currObj.location,
        },
        {
          type: "number",
          name: "frontseats",
          message: "Enter no of front seats:",
          default: currObj.frontSeats,
          validate: function (input: number) {
            if (isNaN(input)) {
              console.log(chalk.red("Please enter seats in number"))
              return false;
            }

            return true;
          },
        },

        {
          type: "number",
          name: "backseats",
          message: "Enter no of back seats:",
          default: currObj.backSeats,
          validate: function (input: number) {
            if (isNaN(input)) {
              console.log(chalk.red("Please enter seats in number"))
              return false;
            }

            return true;
          },
        },
        {
          type: "number",
          name: "frontseatsPrice",
          message: "Enter price for Front seats: ",
          default: currObj.frontPrice,
        },
        {
          type: "number",
          name: "backseatsPrice",
          message: "Enter price for Back seats: ",
          default: currObj.backprice,
        },
      ]);

      const {
        name,
        title,
        date,
        city,
        location,
        frontseats,
        backseats,
        frontseatsPrice,
        backseatsPrice,
      } = editProperty;

      event[findIndexOfEditEvent].eventName = name;
      event[findIndexOfEditEvent].eventTitle = title;
      event[findIndexOfEditEvent].date = date;
      event[findIndexOfEditEvent].city = city;
      event[findIndexOfEditEvent].backprice = backseatsPrice;
      event[findIndexOfEditEvent].backSeats = backseats;
      event[findIndexOfEditEvent].frontPrice = frontseatsPrice;
      event[findIndexOfEditEvent].frontSeats = frontseats;

      console.log(chalk.yellow("Event edit successfully"))
    }

    if (opt == "Exit") {
      const ans = await inquirer.prompt([
        {
          type: "confirm",
          name: "exit",
          message: "Do you want to exit?",
        },
      ]);

      if ((ans.exit = true)) {
        continueProgram = false;
        console.log(chalk.redBright.italic("Exiting....."));

        break;
      } else {
        continue;
      }
    }
  }
}

async function userAction() {
  console.log(`\n\tWelcome!`);
  await welcome();

  let continueProgram2 = true;
  CONTINUEPROGRAM: while (continueProgram2) {
    const userAction = await inquirer.prompt([
      {
        type: "list",
        name: "selectOption",
        message: "What would you like to do? ",
        choices: [
          "View Available event",
          "Purchase Ticket",
          "View Order List",
          "Exit",
        ],
      },
    ]);

    const { selectOption } = userAction;

    if (selectOption == "View Available event") {
      console.log("\n\t Available Events!");
      console.table(event);




    } else if (selectOption == "Purchase Ticket") {
      const userAns = await inquirer.prompt([
        {
          type: "number",
          name: "userId",
          message: "Enter Your Id?",
        },
        {
          type: "list",
          name: "options",
          message: "Choose an event to purchase ticket?",
          choices: event.map((event) => event.eventName),
        }
       
      ]);

      const { options, userId } = userAns;
      const findIndexOfSelectedEvent = event.findIndex(
        (name) => name.eventName == options
      );





      const [dateString,timestring]=event[findIndexOfSelectedEvent].date.split(" ")
      const [yearstring,monthstring,daystring] =dateString.split("-")
      const [hourString,minuteString,secondString]=timestring.split(":")
   
      let year = parseInt(yearstring); // now convert the string into number the time previously have type "string as we mentioned in input during validation"
      let month = parseInt(monthstring) + 1;
      let day = parseInt(daystring);
      let hour = parseInt(hourString);
      let min = parseInt(minuteString);
      let sec = parseInt(secondString);
   
   
     let date = new Date(year,month,day,hour,min,sec)
    //  console.log(date)
     let currrentDate = Date.now()
    //  console.log(currrentDate)
     let eventDate = date.getTime()
    //  console.log(eventDate)
   
if(eventDate>=currrentDate){

const selectSeatingOption = await inquirer.prompt([{


  
    type: "list",
    name: "seatingOptions",
    message: "Select the seating options:",
    choices: ["Front Side", "Back Side"],
  



}]

)


const{seatingOptions}=selectSeatingOption

      if (seatingOptions == "Front Side") {
        const { options, seatingOptions } = userAns;
        const purchaseFrontSideTicket = await inquirer.prompt([
          {
            type: "number",
            name: "frontTicket",
            message: "How many tickets you want to purchase?",
            validate: function (input) {
              if (input > event[findIndexOfSelectedEvent].frontSeats) {
                console.log(chalk.red("\nPlease enter valid no of seats."))
                return false;
              }
              return true;
            },
          },
          {
            type: "string",
            name: "creditCard",
            message: "Enter your credit no:",
          },
          {
            type: "number",
            name: "currentBalance",
            message: "Enter your current balance:",
          },
          {
            type: "confirm",
            name: "payment",
            message: "Confirm your payment?:",
          },
        ]);

        const { frontTicket, creditCard, currentBalance, payment } =
          purchaseFrontSideTicket;
        if (payment == true) {
          const findIndexOfUser = usersArray.findIndex(
            (user) => user.id == userId
          );
          // console.log(findIndexOfUser);
          const findIndexOfSelectedEvent = event.findIndex(
            (name) => name.eventName == options
          );
          let pay = frontTicket * event[findIndexOfSelectedEvent].frontPrice;
          console.log(chalk.italic.cyanBright(`Total amount is ${pay}`))
          console.log(chalk.bold.cyan(`You have ${currentBalance} in your account.`))
          if (currentBalance >= pay) {
            const seats =
              event[findIndexOfSelectedEvent].frontSeats - frontTicket;
            event[findIndexOfSelectedEvent].frontSeats = seats;
            console.log(
              chalk.bgBlue.bold(
                "Transaction Successfull"
              )
            );
            let newticket = new Ticket(options, frontTicket, null);
            usersArray[findIndexOfUser].getTicket(newticket);
          } else {
            console.log(chalk.redBright("Insufficient Balance!"));
          }
        }
      }

      // For back side
      else if (seatingOptions == "Back Side") {
        const purchaseBackSideTicket = await inquirer.prompt([
          {
            type: "number",
            name: "BackTicket",
            message: "How many tickets you want to purchase?",
            validate: function (input) {
              if (input > event[findIndexOfSelectedEvent].backSeats) {
                console.log("\nPlease enter valid no of seats.");
                return false;
              }
              return true;
            },
          },
          {
            type: "string",
            name: "creditCard",
            message: "Enter your credit no:",
          },
          {
            type: "number",
            name: "currentBalance",
            message: "Enter your current balance:",
          },
          {
            type: "confirm",
            name: "payment",
            message: "Confirm your payment?:",
          },
        ]);

        const { BackTicket, creditCard, currentBalance, payment } =
          purchaseBackSideTicket;

        if (payment == true) {
          const findIndexOfUser1 = usersArray.findIndex(
            (user) => user.id == userId
          );
          const findIndexOfSelectedEvent = event.findIndex(
            (name) => name.eventName == options
          );
          let pay2 = BackTicket * event[findIndexOfSelectedEvent].backprice;
          console.log(chalk.cyanBright(`Total amount is ${pay2}`))
          console.log(chalk.bold.cyan(`You have ${currentBalance} in your account.`))
          if (currentBalance >= pay2) {
            const seats =
              event[findIndexOfSelectedEvent].backSeats - BackTicket;
            event[findIndexOfSelectedEvent].backSeats = seats;
            console.log(
              chalk.bgBlue.bold(
                "Transaction Successfull"
              )
            );
            let newticket1 = new Ticket(options, null, BackTicket);
            usersArray[findIndexOfUser1].getTicket(newticket1);
          } else {

            console.log(chalk.redBright("Insufficient Balance!"))
          }
        }
      }
    }

  else{
    console.log("Sorry ! Event date is expired!")
  }









    } else if (selectOption == "View Order List") {
      const user = await inquirer.prompt([
        {
          type: "number",
          name: "userId",
          message: "Enter Your Id:",
        },
      ]);
      const { userId } = user;
      const findIndexOfUser2 = usersArray.findIndex(
        (user) => user.id == userId
      );
      if (findIndexOfUser2 !== -1) {
        usersArray[findIndexOfUser2].getFull();
      }
    } else {
      const exit = await inquirer.prompt([
        {
          type: "confirm",
          name: "continue",
          message: "Do You want to continue?",
        },
      ]);

      if (exit.continue == true) {
        let exit = ((chalkAnimation.radar((chalk.red("Exiting....")))))
        await welcome()
        exit.stop
      
        continueProgram2 = false;
        break CONTINUEPROGRAM;
      }
    }
  }
}

await select();
