# budget-app 

## Planning - Stage 1
  1) Break up mockup into different actions
  
    + Add the event handler
    + Get the input values
    + Add the new item to our data structure
    + Add the new item to the UI
    + Calculate the budget
    + Update the UI
  
  2) Split up processes in modules (UI vs Data vs Controller)
  
    UI Module (any UI changes)
    + Get the input values
    + Add the new item to the UI
    + Update the UI
  
    Data Module (any data manipulation)
    + Add the new item to our data structure
    + Calculate the budget
    
    Controller Module (any control actions)
    + Add the event handler

  3) Implement the Module Pattern
    
    Use closures and IIFE's to implement this pattern.
    Example:
    
    var budgetController = (function() {
      
    })();
    
    var UIController = (function() {
    
    })();
    
    var controller = (function(budgetCtrl, UICtrl) {
    
    }(budgetController, UIController);
    
## Planning - Stage 2
  1) Remaining actions

	+ Add event handler to delete items
	+ Remove the item from the structure
	+ Remove the item from the UI
	+ Recalculate budget
	+ Update UI with new budget

  2) Using Event Delegation

	Event Bubbling --> Target Element --> Event Delegation
	* We will use this to our advantage as event bubbles up

	Use Cases:
	1) We are interested in an element with lots of child elements
	2) When we want an event handler attached to an element that is not yet in the DOM when our page is loaded


## Planning - Stage 3
  1) Remaining actions
	+ Calculate percentages
	+ Update percentages in UI
	+ Display current month and year
	+ Fix number formatting
	+ Improve input field UX
