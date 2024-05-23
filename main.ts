#! /usr/bin/env node

import inquirer from "inquirer";

//Class user
class User {
  name: string;
  email: string;
  password: any;

  constructor(name: string, email: string, password: any) {
    (this.name = name), (this.email = email), (this.password = password);
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
    console.log("\nEvent Created Successfully!");
    console.log(`\n==>Event Name : "${this.eventName}" 
    Event Title : "${this.eventTitle}" , 
    Event City: "${this.city}", 
    Event Location : "${this.location}" ,
    Event Date:"${this.date}" 
    Available front Seats :${this.frontSeats}
    Available back seats : ${this.backSeats} 
    Seats for Front : ${this.frontPrice} ,
    Seats for back : ${this.backprice}
  
  `);
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
const ticket: Ticket[] = [];

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
  let programRun = true;
  while (programRun) {
    const userAns = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: "What do you want to do ?",
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
  console.log("Sign Up For continue!");
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
    console.log("Sign Up successfully!");
    usersArray.push(user);

    // console.log(usersArray)
  } else {
    console.error("Sign Up failed!");
    console.log("Please enter complete information.");
  }
}

//Login function
async function logIn() {
  console.log("Login For Continue");

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
      console.log("Successfully login!");
      await userAction();
    } else if (isInclude == false) {
      console.log("Failed to login");
    }
  } else {
    console.log("failed to login");
  }
}

// separate functionality for admin
async function LoginAdmin() {
  let continueProgram = true;
  console.log("Hello,admin!");
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
              console.log("Please enter date in number please.");
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
              console.log("Please enter no of front seats in number");
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
              console.log("Please enter no of back seats in number");
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
        console.log("Updated Event List");
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
              console.log("Please enter Id in number");
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
              console.log("Please enter date in number please.");
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
              console.log("Please enter seats in number");
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
              console.log("Please enter seats in number");
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
          "View Ticket",
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
          type: "list",
          name: "options",
          message: "Choose an event to purchase ticket?",
          choices: event.map((event) => event.eventName),
        },
        {
          type: "list",
          name: "seatingOptions",
          message: "Select the seating options:",
          choices: ["Front Side", "Back Side"],
        },
      ]);

      const { options, seatingOptions } = userAns;
      const findIndexOfSelectedEvent = event.findIndex(
        (name) => name.eventName == options
      );

      if (seatingOptions == "Front Side") {
        const { options, seatingOptions } = userAns;
        const purchaseFrontSideTicket = await inquirer.prompt([
          {
            type: "number",
            name: "frontTicket",
            message: "How many tickets you want to purchase?",
            validate: function (input) {
              if (input > event[findIndexOfSelectedEvent].frontSeats) {
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

        const { frontTicket, creditCard, currentBalance, payment } =
          purchaseFrontSideTicket;

        if (payment == true) {
          const findIndexOfSelectedEvent = event.findIndex(
            (name) => name.eventName == options
          );
          let pay = frontTicket * event[findIndexOfSelectedEvent].frontPrice;
          console.log(pay);
          if (currentBalance >= pay) {
            const seats =
              event[findIndexOfSelectedEvent].frontSeats - frontTicket;
            event[findIndexOfSelectedEvent].frontSeats = seats;
            console.log("Transaction Successfull");
            let newticket = new Ticket(options, frontTicket, null);
            ticket.push(newticket);
            newticket.getID();
          } else {
            console.log("Insufficient Balance!");
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
          const findIndexOfSelectedEvent = event.findIndex(
            (name) => name.eventName == options
          );
          let pay2 = BackTicket * event[findIndexOfSelectedEvent].backprice;
          if (currentBalance >= pay2) {
            const seats =
              event[findIndexOfSelectedEvent].backSeats - BackTicket;
            event[findIndexOfSelectedEvent].backSeats = seats;
            console.log(
              "***************Transaction Successfull*******************"
            );
            let newticket1 = new Ticket(options, null, BackTicket);
            ticket.push(newticket1);
            newticket1.getID();
          } else {
            console.log("Insufficient Balance!");
          }
        }
      }
    } else if (selectOption == "View Ticket") {
      const showTicket = await inquirer.prompt([
        {
          type: "number",
          name: "idOFTicket",
          message: "Enter the Ticket Id for View?",
        },
      ]);

      const { idOFTicket } = showTicket;
      let findIndexOfTicket = ticket.findIndex((id) => id.id == idOFTicket);
      if (findIndexOfTicket !== -1) {
        console.log("Your Ticket");
        console.table(ticket[findIndexOfTicket]);
      } else {
        console.log("Please Enter valid Id");
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
        continueProgram2 = false;
        break CONTINUEPROGRAM;
      }
    }
  }
}

await select();
