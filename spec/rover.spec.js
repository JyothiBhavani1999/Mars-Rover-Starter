const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

it("constructor sets position and default values for mode and generatorWatts",function(){
  const roverPosition = new Rover(98382);
  expect(roverPosition.position).toEqual(98382);
  expect(roverPosition.mode).toEqual('NORMAL')
  expect(roverPosition.generatorWatts).toEqual(110);
});

it("response returned by receiveMessage contains the name of the message",function(){
const commands = [ new Command('STATUS_CHECK')];
const message = new Message('Test message', commands);
const rover = new Rover(98382);   
const response = rover.receiveMessage(message);
expect(response.message).toBe('Test message');

});

it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
  const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
const message = new Message('Test message with two commands', commands);
  const rover = new Rover(98382); 
  const response = rover.receiveMessage(message);
  expect(response.results.length).toEqual(2);
});

it("responds correctly to the status check command",function(){
  const commands = [new Command('STATUS_CHECK')];
  const message = new Message('Test Status check', commands);
  const rover = new Rover(98382);
  const response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus).toEqual({
    mode : 'NORMAL',
    generatorWatts : 110,
    position : 98382
    });
  
});

it("responds correctly to the mode change command",function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test mode change to LOW POWER', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true)
  expect(rover.mode).toBe('LOW_POWER');

  commands = [new Command('MODE_CHANGE', 'NORMAL')];
  message = new Message('Test mode change to NORMAL', commands);
  rover = new Rover(98382);
  response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true)
  expect(rover.mode).toBe('NORMAL');

});


it("responds with a false completed value when attempting to move in LOW_POWER mode",function(){
  const commands = [ new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 4321)];
  const message = new Message('Test movein LOW_POWER', commands);
  const rover = new Rover(98382);
  response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(response.results[1].completed).toBe(false);
  expect(rover.position).toEqual(98382);

});

it("responds with position for move command",function(){
  let rover = new Rover(98382);
  let commands = [new Command('MOVE', 253622)];
  let message = new Message('Test move command', commands);
  let response = rover.receiveMessage(message);

  expect(response.results[0].completed).toBe(true);
  expect(rover.position).toEqual(253622);
});

});
