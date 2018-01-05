// BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) *100);
            console.log(this.percentage);
        } else {
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    
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
        },
        budget: 0,
        percentage: -1
    };
    
    var calculateTotal = function(type) {
        var sum = 0;
        
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        })
        
        // Save total to our data structure
        data.totals[type] = sum;
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
        },
        
        deleteItem: function(type, id) {
            var index, ids;
            
            // Traverse the array and return an array of ids of items
            ids = data.allItems[type].map(function(current, index) {
                return current.id;
            });
            
            // Get index of element we are looking for 
            index = ids.indexOf(id);
            
            
            // Remove element at the given id from the array of elements
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculateBudget: function() {
            
            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            
            // Calculate the budget (income-expenses)
            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculate the percentage of income spent (expenses/income)
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
      
        },
        
        calculatePercentages: function() {
            
            // Calculate the individual %s the expenses have of the income (expenses/income)
            data.allItems.exp.forEach(function(current) {
               current.calcPercentage(data.totals.inc); 
            });

        },
        
        getBudget: function() {
            return  {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            });
            return allPercentages;
        },
        
        testing: function() {
            console.log(data);
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
        
    };
    
     var formatNumber = function(num, type) {
            var numSplit, integer, decimal;
        /*  Formatting Rules
            1) Need +/-
            2) Exactly two trailing integers after decimal
            3) Comma separating the thousands */

            num = Math.abs(num);
            num = num.toFixed(2);
            numSplit = num.split('.');

            integer = numSplit[0];
            if (integer.length > 3) {
                integer = integer.substr(0 , integer.length-3) + ',' + integer.substr(integer.length-3 , integer.length);
            }

            decimal = numSplit[1];

           return (type === 'exp' ? '-' : '+') + ' ' + integer + '.' + decimal;
        };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text 
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value));
            
            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);          
            
        },
        
        deleteListItem: function(selectorID) {
            var element;
            
            // Get the element by id
            element =  document.getElementById(selectorID);
            
            // Traverse to the parent in order to delete the child node
            element.parentNode.removeChild(element);
            
            // Good resource: blog.garstasio.com/you-dont-need-jquery/dom-manipulation/
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
        
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type === 'inc' : type === 'exp';
            
            // Update the budget, inc, exp, and percentage text contents
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            // If percentage is less than zero, show dashes to represent null
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        displayPercentages: function(percentages) {
            var fields;
            
            // Returns node list of elements
            fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
            
            // Create forEach function for node list specifically
            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };
            
            // Use custom node list forEach function
            nodeListForEach(fields, function(current, index) {
                
                // If percentage is greater than 0, display with percentage sign, else show dashes
                if( percentages[index] > 0 ) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            }); 
            
        },
        
        displayDate: function() {
            var now, month, monthlist;
            
            now = new Date();
            month = now.getMonth();    
            monthlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            
            document.querySelector(DOMstrings.dateLabel).textContent = monthlist[month];
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
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    };  
    
    var updateBudget = function() {
        var budget;
        
        // 1. Calculate the budget
        budgetController.calculateBudget();
        
        // 2. Return the budget
        budget = budgetController.getBudget();

        // 3. Display budget in UI
        UICtrl.displayBudget(budget);
        
        
    };
    
    var updatePercentages = function() {
        var percentages;
        
        // 1. Calculate the percentages
        budgetController.calculatePercentages();
        
        // 2. Read percentages from budgetController
        percentages = budgetController.getPercentages();
        
        // 3. Display new percentages in UI
        UICtrl.displayPercentages(percentages);
        
    };
    
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the input value
        input = UICtrl.getInput();
        
        // Only perform actions 2-5 if there is valid input
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
           
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
            
            // 6. Calculate and update percentages
            updatePercentages();
        }
        
        
    };
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, id;
        
        // Get the id of the item to delete
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            // Splits inc-% into an array so we can access the type and id separately
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);
            
            // 1) Delete item from data structure
            budgetCtrl.deleteItem(type, id);
            
            // 2) Delete item from UI
            UICtrl.deleteListItem(itemID);
            
            // 3) Update and show new budget
            updateBudget();
        }
        
    };
    
    
    // Code that executes when application begins
    return {
        init: function() {
            // Call display budget to update UI
            UICtrl.displayDate();

            
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage:-1
            });
            
            
            // Setup event listeners
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);

controller.init();

