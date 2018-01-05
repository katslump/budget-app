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
    };
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID=0;
            }
               
            // Create new item based on ID
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it onto the data structure
            data.allItems[type].push(newItem);

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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text 
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);          
            
        },
        
        clearFields: function() {
            var fields, fieldsArr;
            
            // Select fields you want to clear
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            
            // Convert list to array
            // Tricks slice method into thinking we are giving it an array when we are actually giving it a list
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            // Iterates over area and sets current element values to empty
            fieldsArr.forEach(function(current, index, array) {
                current.value = '';
                current.description = '';
            });
            
            //Reset focus back to description
            fieldsArr[0].focus();
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
    
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
        var input, newItem;
        
        // 1. Get the input value
        input = UICtrl.getInput();
        
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
        UICtrl.clearFields();
        
        // 5. Calculate the budget
        
        
        // 6. Display budget in UI
        
        
    };
    
    
    // Code that executes when application begins
    return {
        init: function() {
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);

controller.init();

