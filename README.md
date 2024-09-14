# lknic &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![npm version](https://img.shields.io/npm/v/lknic.svg?style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**lknic** is a library designed to handle Sri Lankan National Identity Card (NIC) information. It provides functionality for validating NIC numbers, extracting encoded birth details, determining gender, and identifying NIC generation. This library simplifies working with NIC data, making it easier for developers to integrate NIC-related functionality into their applications.

## Description

In Sri Lanka, the National Identity Card (NIC) number contains various encoded pieces of information, including the cardholder's date of birth, gender, and NIC generation. Despite advancements in technology, there are limited libraries available that cater specifically to Sri Lankan NIC data.

**lknic** addresses this gap by offering a robust set of tools for working with NIC numbers. Whether you are developing web applications or other software that needs to process NIC information, **lknic** provides a reliable and easy-to-use solution for validating NIC numbers and retrieving encoded data.

### Key Features

- **Validation**: Verify the authenticity and correctness of NIC numbers.
- **Date of Birth Extraction**: Retrieve the birth year, month, and day from the NIC number.
- **Gender Detection**: Determine the gender (male or female) based on the NIC number.
- **NIC Generation Identification**: Identify whether the NIC number is from the old or new generation format.

These features are designed to enhance the functionality of applications dealing with NIC data. Future versions may include additional features and support for other programming languages such as Python, PHP, and Java.

## Installation

You can install **lknic** as an npm package. It is built in JavaScript, with plans to support other languages in future releases.

```bash
npm install lknic
```

## Documentation

For detailed API documentation, refer to the following sections:

- **Documentation**: [Lknic](https://charitha-prabashwara.github.io/lk.nic/)

## Contributing

Contributions to **lknic** are welcome! If you find any issues or have suggestions for improvements, please submit a pull request or open an issue on [GitHub](https://github.com/Charitha-Prabashwara/lk.nic/issues).

## Usage

Here is a brief overview of how to use the lknic library:

##### Gender Class

The Gender class allows you to determine the gender of an individual based on their NIC number.

```js
import Gender from "lknic";

// Create an instance of Gender
const gender = new Gender("823456789V");

// Get gender as a string
console.log(gender.genderToStr()); // Outputs: 'male' or 'female'

// Get gender as an integer
console.log(gender.genderToInt()); // Outputs: 1 for male, 2 for female

// Check if the NIC belongs to a male or female
console.log(gender.isMale()); // Outputs: true or false
console.log(gender.isFemale()); // Outputs: true or false
```

##### BirthDay Class

The BirthDay class extracts and computes the birth details from a NIC number.

```js
import BirthDay from "lknic";

// Create an instance of BirthDay
const birthday = new BirthDay("199012345678");

// Get birth year
console.log(birthday.getBirthYear()); // Outputs: birth year

// Get the day of the year
console.log(birthday.getDays()); // Outputs: number of days since January 1

// Get the birth month and day
console.log(birthday.getMonth()); // Outputs: birth month (1-12)
console.log(birthday.getDay()); // Outputs: birth day (1-31)

// Get the name of the birth month and day
console.log(birthday.getMonthName()); // Outputs: birth month name
console.log(birthday.getDayName()); // Outputs: birth day name
```

##### Generation Class

This Generation class is responsible for identifying the generation of a Sri Lankan National Identity Card (NIC) based on its characteristics such as the length and the presence of specific characters like "V" or "X".

```js
// Importing the Generation class
import Generation from "./Generation.js";

// Example NIC numbers
const nicOldGen = "934562718V"; // First generation NIC
const nicNewGen = "200456271234"; // Second generation NIC

// Create an instance of the Generation class
const generationChecker = new Generation();

// Example 1: Determine generation of an old generation NIC
try {
  const generation1 = generationChecker.whichGeneration(nicOldGen);
  console.log(`NIC: ${nicOldGen} belongs to Generation: ${generation1}`); // Output: Generation 1
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Example 2: Determine generation of a new generation NIC
try {
  const generation2 = generationChecker.whichGeneration(nicNewGen);
  console.log(`NIC: ${nicNewGen} belongs to Generation: ${generation2}`); // Output: Generation 2
} catch (error) {
  console.error(`Error: ${error.message}`);
}
```

##### Validate Class

To validate a Sri Lankan National Identity Card (NIC) number, use the isValidNIC method. It checks the ID number for length, valid characters, "V/X" presence, and date of birth encoding.

```js
import Validate from "lknic";

let validate = new Validate();
let nic = "your-national-identity-card-number";

if (validate.isValidNIC(nic)) {
  console.log("NIC is valid");
} else {
  console.log("NIC is invalid");
}
```

## License

**lknic** is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## Contact

For any questions or support, please reach out to [prabhashwara.seu@gmail.com](mailto:prabhashwara.seu@gmai.com).
