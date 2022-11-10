# Whats the command(s) for setting up and running your application?

1. npm install
2. npm start

If you want to run the unit tests then run:

1. npm install
2. npm test

# Q. If you had more time, what improvement or features would you add?

1. I feel like this solution may run into performance issues with loads of data
   I would like to split the file processing into multiple async threads using a map-reduce style approach to process

2. Use some kind of relational DB to host this data and implement as much of the logic as i can in the query statement to improve performance

3. I would like to have hosted this solution with an express api wrapped in TSOA inside a docker container - this would be more close to a production scenario

4. Following on from point 3 there would be a swagger doc to go with the api.

# Q. Which part(s) of your solution are you most proud of? And why

1. I like how easy it was to test due to dependancy injection
2. I feel like you can add to this solution without having to modify existing code.
3. Took this as an opertunity to learn re-learn jest (i typically use jasmin for testing) - so im proud of the working tests

# Q. Which part of the challenge did you find most difficult? And why?

1. The actual calculation logic of the portfolios - it picked my brain a bit trying to avoid any O(n\*n) algorithms

# Q. If a stakeholder was present, what questions might you ask them?

1. What format would you like the Portfolio information outputted in?
2. What is the Mathematical definition of a portfolio in this case (assumed it was budget + (daily interest + promotion) / 360)?
3. Id repeat my understanding of the solution and get his/her confirmation before proceeding
4. Does this output look correct?

# Q. How did you find the challenge overall? We would love to hear any feedback you might have.

1. The challenge was fine enjoyed the brain tease
2. Felt a bit unsure of my solution because the (daily interest + promotion) / 360 didnt make that much of a difference to the overall portfolio outputted.
   Maybe if the interest was larger on the numbers id feel better (really small thing i know)?

# Q. Do you have any other comments we should read before evaluating your solution?

1. I implemented dependency injection via a constructor pattern - but this pattern not needed in node due to it leveraging a module pattern - i just used it to help show i know what DI is.
2. I tried to introduce a config file with nodes config lib but it was throwing errors and i didnt have time so the config for now is under the constants folder
3. Despite there being alot of methods and only one test for the calculator service - they are all covered through this test
