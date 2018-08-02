# Notes on testing strategies


## Skill in Skills Map:
Name:
Understands different testing strategies

Criteria: Understands the difference between unit tests, acceptance tests, smoke/end-to-end tests. Can articulate the difference between them.

Questions:
* Can you describe the test pyramid?
* Can you quantify the benefits or drawbacks of the various test types?
* Can you explain why we don't follow the test pyramid and where we should?
* Do you understand the difference between testing outcomes (yay!) vs interactions (boo)?

These are my notes about Testing Strategies for the above skill in the Tes Skills Map. I thought I share it here. 
Enjoy. :)
Edit Olah


## Basics about test types

### Why? What is the purpose?
Verification (act of confirmation - Does it do what it supposed to? Are the calculations right? Does it break due to the update of a module?) is different to testing (act of gaining insight: Is the application usable and intuitive? What’s the user experience like? Does the workflow make sense; are there steps that can be removed? observer effect - to gain insight not to verify).

### Types:
#### How?
- Human testers - manual testing. Usually flows like: Test script (steps) -> human tester -> interact and obtain results then report to someone.
- Automated tests: Usually flows like: Test code -> automated test -> interact and obtain results then report.

#### Where?
What layer/level of your application?
Internal or external to your application?

#### What?
Output? Interaction? Class? Function? Do the components work together? Was a feature or a use case correctly implemented?


## Basics about testing strategies

Benefits of testing: Naturally forces the code to be modular, cohesive, and loosely coupled and promotes a single level of abstraction.
We need: rapid, short, automated feedback loops.
It isn’t about automated testing instead of manual testing. The right combination of both is necessary.


## Understands the difference between unit tests, acceptance tests, smoke/end-to-end tests and the difference between them.

### 1. Unit test: 
Aims to answers the question: ‘Does this one little bit (as isolated as possible) work?’
An automatic test to test the internal workings of a class. It should be a stand-alone test which is not related to other resources. This should have a very narrow and well defined scope.

### 2. Acceptance test: 
To test that a feature or use case is correctly implemented. It is similar to an integration test, but with a focus on the use case to provide rather than on the components involved.

### 3. Integration- / smoke test: 
Integration tests:
Aims to answers the question: ‘Do these two (or more) components work together?’
There is a whole spectrum there, from testing integration between two classes, to testing integration with the production environment. It could mean testing the correct inter-operation of multiple subsystems or testing the integration of your application with all the parts that live outside of your application. Some sources define it as an automatic test that is done on an environment, so similar to unit tests but with external resources (db, disk access).

Smoke test (aka Sanity check): 
Aims to answers the question: ‘Does this whole system (as close to being a production system as possible) hang together reasonably well? (i.e. are we reasonably confident it won't create a black hole?)’
First tests on which testers can conclude if they will continue testing.
A simple integration test where we just check that when the system under test is invoked it returns normally and does not blow up.
The term derives from electronics and plumbing. Electronics: where the first test occurs when powering up a circuit (if it smokes, it's bad!); plumbing: where a system of pipes is literally filled by smoke and then checked visually. If anything smokes, the system is leaky.

### Other types of tests:

#### Regression test: 
Aims to answers the question: ‘Have we inadvertently re-introduced any bugs we'd previously fixed?’
A test that was written when a bug was fixed. It ensures that this specific bug will not occur again. The full name is "non-regression test". It can also be a test made prior to changing an application to make sure the application provides the same outcome.

#### System test: 
Tests a system as a black box. Dependencies on other systems are often mocked or stubbed during the test (otherwise it would be more of an integration test).

#### Pre-flight check: 
Tests that are repeated in a production-like environment, to alleviate the 'builds on my machine' syndrome. Often this is realised by doing an acceptance or smoke test in a production like environment.


## Can you quantify the benefits or drawbacks of the various test types?

**Unit tests:** Isolated, fast, well-defined scope, good for verification, but won’t show you higher-level issues, problems with usability etc.

For some people **integration testing** means to test through the entire stack of your application connected to other applications within your system. You might want to treat integration testing more narrowly and test one integration point at a time by replacing separate services and databases with test doubles. Together with contract testing and running contract tests against test doubles, as well as the real implementations, you can come up with integration tests that are faster, more independent and usually easier to reason about.
Narrow integration tests live at the boundary of your service. Conceptually they're always about triggering an action that leads to integrating with the outside part (filesystem, database, separate service). 
With regards to the test pyramid, integration tests are on a higher level than your unit tests. Integrating slow parts like filesystems and databases tends to be much slower than running unit tests with these parts stubbed out. They can also be harder to write than small and isolated unit tests, after all you have to take care of spinning up an external part as part of your tests. Still, they have the advantage of giving you the confidence that your application can correctly work with all the external parts it needs to talk to. Unit tests can't help you with that.

**UI Tests** and **end-to-end tests** are sometimes (as in Mike Cohn's case) said to be the same thing, but:
Testing your user interface doesn't have to be done in an end-to-end fashion. Depending on the technology you use, testing your user interface can be as simple as writing some unit tests for your frontend javascript code with your backend stubbed out.
With traditional web applications testing the user interface can be achieved with tools like Selenium. If you consider a REST API to be your user interface you should have everything you need by writing proper integration tests around your API.
With web interfaces there's multiple aspects that you probably want to test around your UI: behaviour, layout, usability or adherence to your corporate design are only a few.
Fortunately, testing the behaviour of your user interface is pretty simple. You click here, enter data there and want the state of the user interface to change accordingly. Modern single page application frameworks (react, vue.js, Angular and the like) often come with their own tools and helpers that allow you to thoroughly test these interactions in a pretty low-level (unit test) fashion. Even if you roll your own frontend implementation using vanilla javascript you can use your regular testing tools like Jasmine or Mocha. With a more traditional, server-side rendered application, Selenium-based tests will be your best choice.


## Can you describe the test pyramid?

The test pyramid is about the different layers of testing. It also tells you how much testing to do on each layer.

Graphic from Mike Cohn’s ‘Succeeding with Agile: Software Development Using Scrum’:
Test pyramid:
https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png

￼
Mike Cohn's original test pyramid consists of three layers (various levels of the application) that your test suite should consist of (bottom to top):
1. Unit Tests
2. Service Tests
3. User Interface Tests

The right approach / The right combination: short feedback loops at various levels of the application, with more tests at lower levels.

3 levels: ‘GUI level’, ‘Service level’, and ‘Unit level’.

### GUI level: 
The most fluid part of the application. 
Characteristics:
- Keeping tests in sync with the changes is a lot of hard work; 
- multiple browsers require multiple dependencies - maintenance; 
- tests running on GUI level require the entire application to be up and running - slow, resource-hungry; 
- doesn’t isolates the problem area; 
- it doesn’t prevent logic in the UI; 
- it does not influence a better design.

### Service level:
All applications are made up of various services. Depends on the way you are using it, a service can be something the application does in response to some input or set of inputs. Service-level testing is about testing the services of an application separately from its user interface. Where many organisations have gone wrong in their test automation efforts over the years has been in ignoring this whole middle layer of service testing. Although automated unit testing is wonderful, it can cover only so much of an application’s testing needs. Without service-level testing to fill the gap between unit and user interface testing, all other testing ends up being performed through the user interface, resulting in tests that are expensive to run, expensive to write, and brittle.
Source: https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid

### Unit level:
Unit can mean many things according to different people working in different systems/applications.
If you're working in a functional language a unit will most likely be a single function. Your unit tests will call a function with different parameters and ensure that it returns the expected values. In an object-oriented language a unit can range from a single method to an entire class.
The foundation of your test suite will be made up of unit tests. Your unit tests make sure that a certain unit (your subject under test) of your codebase works as intended. Unit tests have the narrowest scope of all the tests in your test suite.



## Can you explain why we don't follow the test pyramid and where we should?

The test pyramid serves as a good rule of thumb, but seems overly simplistic and can therefore be misleading.
Your best bet is to remember two things from Cohn's original test pyramid:
1. Write tests with different granularity.
2. The more high-level you get the fewer tests you should have.

Don't become too attached to the names of the individual layers in Cohn's test pyramid. In fact they can be quite misleading: service test is a term that is hard to grasp (Cohn himself talks about the observation that a lot of developers completely ignore this layer). In the days of single page application frameworks like react, angular, ember.js and others it becomes apparent that UI tests don't have to be on the highest level of your pyramid - you're perfectly able to unit test your UI in all of these frameworks.
Source: https://martinfowler.com/articles/practical-test-pyramid.html



## Do you understand the difference between testing outcomes (yay!) vs interactions (boo)?

There are two ways a unit test can verify the behaviour of production code: testing state or testing interaction.
Testing state means you’re verifying that the code under test returns the right results.
Testing interactions means you’re verifying that the code under test calls certain methods properly.
In most situations testing state is preferred.
Just because a test that uses interactions is passing doesn’t mean the code is working properly. This is why in most cases, you want to test state, not interactions.
But then goes on to examine the specific situations where it may be more useful to test interactions.
The code under test calls a method where differences in the number or order of calls would cause undesired behavior…
You’re testing a UI where the rendering details of the UI are abstracted away from the UI logic (e.g. using MVC or MVP)…
Source: https://medium.com/android-testing-daily/testing-state-vs-testing-interaction-c5d7fe0bf247


## Sources:
- Chapter 1 of ‘Test-Driving JavaScript Applications’ - Venkat Subramaniam (The Pragmatic Programmers). 
- Ham Vocke: The Practical Test Pyramid: https://martinfowler.com/articles/practical-test-pyramid.html
- Stack overflow: https://stackoverflow.com/questions/520064/what-is-unit-test-integration-test-smoke-test-regression-test
- Mike Cohn: The Forgotten Layer of the Test Automation Pyramid: https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid
- Chuck Greb: Testing state vs. testing interaction: https://medium.com/android-testing-daily/testing-state-vs-testing-interaction-c5d7fe0bf247
