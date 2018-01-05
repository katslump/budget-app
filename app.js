// BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // Create new ID
            if(data.allItems[type].length > 1){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID=1;
            }
               
            // Create new item based on ID
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it onto the data structure
            data.allItems[type].push(newItem);
            console.log(data);
            // Return the new element
            return newItem;
        }
    };
    
})();

// UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
    
    
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    

    var setupEventListeners = function() {
        
        var DOM = UICtrl.getDOMstrings();

        // Add event listener for button click
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // Add event listener on return
        document.addEventListener('keypress', function(event) {
            // Enter keyCode is 13
            // FYI: The which property is for older browsers
            if(event.keyCode === 13 || event.which === 13) {
                 ctrlAddItem();
            }
        });
        
    };
    
    
    var ctrlAddItem = function() {
        
        // 1. Get the input value
        var input = UICtrl.getInput();
        
        // 2. Add the item to the budget controller
        budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the new item to the UI
        
        
        // 4. Calculate the budget
        
        // 5. Display budget in UI

    };
    
    
    // Code that executes when application begins
    return {
        init: function() {
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);

controller.init();

