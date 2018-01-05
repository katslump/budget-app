# budget-app 

## Planning
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
    
    

