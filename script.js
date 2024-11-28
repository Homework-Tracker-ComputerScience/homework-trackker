
// =============================================================================
// Global Variables
// =============================================================================

var Current_Screen = 0;

// Prototype Database

var homeworkTasks = [
    new TaskConstructor(0, "Example Task", "2025-1-1", 60, "This is an example of a task"),
];

// =============================================================================
// Screens
// =============================================================================

// Screen Handlers

function screenSwitch(screen) {
    console.log("Switching Screens to " + screen.name + "...");

    // Remove Current Screen
    console.log("Removing Current Screen...");
    var children = document.querySelector("main").children;
    while (children.length > 0) {
        children[0].remove();
    }

    // Add New Screen
    console.log("Adding New Screen...");
    screen.render();

    // Set Current Screen
    Current_Screen = screen.id;

    console.log("Switch Complete - Current Screen: " + Current_Screen);
}

//
// Screens
//

// Homepage
function construct_HP_Screen() {
    const HWL_Screen_Init_BTN = ButtonConstructor("Homework List", "HWL_Screen_Init_BTN", HWL_Screen_Init_BTN_Click);
    const HWT_Screen_Init_BTN = ButtonConstructor("Homework Timer", "HWT_Screen_Init_BTN", HWT_Screen_Init_BTN_Click);
    const R_Screen_Init_BTN = ButtonConstructor("Rewards", "R_Screen_Init_BTN", R_Screen_Init_BTN_Click);
    var HP_Elements = [HWL_Screen_Init_BTN, HWT_Screen_Init_BTN, R_Screen_Init_BTN];
    const HP_Screen = new ScreenConstructor(0, "Homepage", HP_Elements, "main");
    return HP_Screen;
}

// Homework List
function construct_HWL_Screen() {
    const HP_Screen_Init_BTN = ButtonConstructor("Back", "HP_Screen_Init_BTN", HP_Screen_Init_BTN_Click);
    // Create DIV for homework tasks
    const HWTL_Container = document.createElement("div");
    HWTL_Container.setAttribute("id", "HWTL_Container");
    HWTL_Container.setAttribute("class", "HWTL_Container");
    // Add all tasks into DIV
    for (let i = 0; i < homeworkTasks.length; i++) {
        const taskView = TaskViewConstructor(homeworkTasks[i]);
        HWTL_Container.appendChild(taskView);
    }
    // Add Tasks Button
    const HWL_Add_Task_BTN = ButtonConstructor("Add Task", "HWL_Add_Task_BTN", taskViewAddBtn_Click);
    // Continue Screen Construction
    var HWL_Elements = [HWTL_Container, HWL_Add_Task_BTN, HP_Screen_Init_BTN];
    const HWL_Screen = new ScreenConstructor(1, "Homework List", HWL_Elements, "main");
    return HWL_Screen;
}

// Homework Timer
function construct_HWT_Screen() {
    const HP_Screen_Init_BTN = ButtonConstructor("Back", "HP_Screen_Init_BTN", HP_Screen_Init_BTN_Click);

    // Create dropdown menu
    const HWT_Dropdown = DropdownConstructor("HWT_Dropdown", HWT_Dropdown_Click);

    var HWT_Elements = [HWT_Dropdown,HP_Screen_Init_BTN];
    const HWT_Screen = new ScreenConstructor(2, "Homework Timer", HWT_Elements, "main");
    return HWT_Screen;
}

// Homework Timer Page
function construct_HWT_Page_Screen(task) {
    const HP_Screen_Init_BTN = ButtonConstructor("Back", "HP_Screen_Init_BTN", HP_Screen_Init_BTN_Click);
    // Find Task
    console.log("Finding Task with ID " + task.id);
    for (let i = 0; i < homeworkTasks.length; i++) {
        if (homeworkTasks[i].id == task.id) {
            console.log("Found Task with ID " + task.id);
            task = homeworkTasks[i];
            break;
        }
    }
    // Create Timer
    const HWT_Timer = new TimerConstructor(task.allocatedTime);
    var HWT_Elements = [HWT_Timer.timer, HP_Screen_Init_BTN];
    const HWT_Screen = new ScreenConstructor(7, "Homework Timer", HWT_Elements, "main");
    return HWT_Screen;
}

// Rewards Page
function construct_R_Screen() {
    const HP_Screen_Init_BTN = ButtonConstructor("Back", "HP_Screen_Init_BTN", HP_Screen_Init_BTN_Click);
    var R_Elements = [HP_Screen_Init_BTN];
    const R_Screen = new ScreenConstructor(3, "Rewards", R_Elements, "main");
    return R_Screen;
}

// Task Create or Edit Form Page

function construct_TCE_Screen(task) {

    // Form Elements
    const TCE_TextInput_TaskName = TextInputConstructor("TCE_TextInput_TaskName", task.name, "text");
    const TCE_TextInput_DueDate = TextInputConstructor("TCE_TextInput_DueDate", task.dueDate, "date");
    const TCE_TextInput_AllocatedTime = TextInputConstructor("TCE_TextInput_AllocatedTime", task.allocatedTime, "number");
    const TCE_TextInput_Description = TextInputConstructor("TCE_TextInput_Description", task.description, "text");

    // Submit Button
    const TCE_Submit_BTN = ButtonConstructor("Submit", "TCE_Submit_BTN", TCE_Submit_BTN_Click, (task.id));

    // Back Button
    const HP_Screen_Init_BTN = ButtonConstructor("Back", "HP_Screen_Init_BTN", HWL_Screen_Init_BTN_Click);
    
    var TCE_Elements = [TCE_TextInput_TaskName, TCE_TextInput_DueDate, TCE_TextInput_AllocatedTime, TCE_TextInput_Description, TCE_Submit_BTN, HP_Screen_Init_BTN];
    const TCE_Screen = new ScreenConstructor(4, "Task Create or Edit Form", TCE_Elements, "main");
    return TCE_Screen;
}

// =============================================================================
// ToolBox
// =============================================================================

//
// Element Constructors
//

// TaskView Constructor

function TaskViewConstructor(task) {
    console.log("Constructing TaskView for " + task.name);
    // Display Task Information
    const taskView = document.createElement("div");
    taskView.setAttribute("class", "taskView");
    var taskViewName = document.createElement("p")
    taskViewName.innerHTML = task.name;
    var taskViewDueDate = document.createElement("p")
    taskViewDueDate.innerHTML = task.dueDate;
    var taskViewAllocatedTime = document.createElement("p")
    taskViewAllocatedTime.innerHTML = task.allocatedTime;
    var taskViewDescription = document.createElement("p")
    taskViewDescription.innerHTML = task.description;
    // Append Task Information
    taskView.appendChild(taskViewName);
    taskView.appendChild(taskViewDueDate);
    taskView.appendChild(taskViewAllocatedTime);
    taskView.appendChild(taskViewDescription);
    // Button Construction
    const taskViewEditBtn = ButtonConstructor("Edit", "taskViewEditBtn", taskViewEditBtn_Click, (task.id));
    taskView.appendChild(taskViewEditBtn);

    const taskViewDeleteBtn = ButtonConstructor("Delete", "taskViewDeleteBtn", taskViewDeleteBtn_Click, (task.id));
    taskView.appendChild(taskViewDeleteBtn);
    // Append Buttons
    taskView.appendChild(taskViewEditBtn);
    taskView.appendChild(taskViewDeleteBtn);

    return taskView;
}

// Button Constructor

function ButtonConstructor(text, id, click, args) {
    const btn = document.createElement("button");
    btn.setAttribute("id", id);
    btn.innerText = text;
    if (args == undefined) {
        args = null;
    }
    btn.addEventListener("click", function() {
        click(args);
    });
    return btn;
}

// Text Input Constructor

function TextInputConstructor(id, text, type) {
    const input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", type);
    input.setAttribute("value", text);
    return input;
}

// Dropdown Constructor

function DropdownConstructor(id, click) {
    const dropdown = document.createElement("select");
    // Set Dropdown Options
    var option = document.createElement("option");
    option.setAttribute("value", "0");
    option.innerText = "Select a Task";
    dropdown.appendChild(option);
    for (let i = 0; i < homeworkTasks.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", homeworkTasks[i].id);
        option.innerText = homeworkTasks[i].name;
        dropdown.appendChild(option);
    }
    dropdown.setAttribute("id", id);
    dropdown.addEventListener("change", function() {
        click(dropdown.value);
    });
    return dropdown;
}

// Timer Constructor

function TimerConstructor(time) {
    var calculatedTime = time * 60;
    this.time = time * 60;
    this.timer = document.createElement("p");
    this.timer.setAttribute("id", "timer");
    this.timer.innerText = this.time;
    console.log("Starting Timer");
    // Timer Loop
    for (let i = 0; i < this.time; i++) {
        setTimeout(function() {
            // Try to update the Text
            // Reason: If Screen is updated, this.timer will be undefined
            try {
                // Update Text
                this.timer.innerText = calculatedTime - i;
            } catch (error) {} // Ignore Error
        }, 1000*i);
    }
    // Timer End
    // Reason: Loop only reaches to time = 1s, This will be called after the timer reaches 1.
    setTimeout(function() {
        console.log("Timer Ended");
        try {
            this.timer.innerText = "Time's Up!";
        } catch (error) {} // Ignore Error
    },
    1000*this.time);
}

//
// Internal Constructors
//

// Screen Constructor

function ScreenConstructor(id, name, elements, parent) {
    console.log("Constructing Screen " + name);
    this.id = id;
    this.name = name;
    this.elements = elements;
    // Render Each Element in the Elements Stack in Order
    this.render = function() {
        for (let i = 0; i < this.elements.length; i++) {
            console.log("Adding " + this.elements[i].innerText + " to " + parent + "...");
            document.querySelector(parent).appendChild(this.elements[i]);
        }
    }
}

// Task Constructor

function TaskConstructor(taskID, taskName, dueDate, allocatedTime, taskDescription) {
    this.id = taskID;
    this.name = taskName;
    this.dueDate = dueDate;
    this.allocatedTime = allocatedTime;
    this.description = taskDescription;
}

// =============================================================================
// Button Handlers
// =============================================================================

function HWL_Screen_Init_BTN_Click() {
    console.log("Homework List Screen Button Clicked");
    screenSwitch(construct_HWL_Screen());
}

function HWT_Screen_Init_BTN_Click() {
    console.log("Homework Timer Screen Button Clicked");
    screenSwitch(construct_HWT_Screen());
}

function R_Screen_Init_BTN_Click() {
    console.log("Rewards Screen Button Clicked");
    screenSwitch(construct_R_Screen());
}

function HP_Screen_Init_BTN_Click() {
    console.log("Homepage Screen Button Clicked");
    screenSwitch(construct_HP_Screen());
}

function taskViewEditBtn_Click(ID_In) {
    console.log("Task View Edit Button Clicked");
    // Find Task with ID
    console.log("Finding Task with ID " + ID_In);
    for (let i = 0; i < homeworkTasks.length; i++) {
        if (homeworkTasks[i].id == ID_In) {
            console.log("Found Task with ID " + ID_In);
            console.log("Editing Task with ID " + ID_In);
            // Switch to Task Edit Screen
            screenSwitch(construct_TCE_Screen(homeworkTasks[i]));
            break;
        }
    }
}

function TCE_Submit_BTN_Click(ID_In) {
    console.log("Task Create or Edit Form Submit Button Clicked");
    console.log("Submitting Task with ID " + ID_In);
    // Fetch Data from Form
    var taskName = document.querySelector("#TCE_TextInput_TaskName").value;
    var dueDate = document.querySelector("#TCE_TextInput_DueDate").value;
    var allocatedTime = document.querySelector("#TCE_TextInput_AllocatedTime").value;
    var description = document.querySelector("#TCE_TextInput_Description").value;
    // Get Old Task
    for (let i = 0; i < homeworkTasks.length; i++) {
        if (homeworkTasks[i].id == ID_In) {
            console.log("Found Task with ID " + ID_In);
            console.log("Editing Task with ID " + ID_In);
            // Switch to Task Edit Screen
            homeworkTasks[i].name = taskName;
            homeworkTasks[i].dueDate = dueDate;
            homeworkTasks[i].allocatedTime = allocatedTime;
            homeworkTasks[i].description = description;
            break;
        }
    }
    screenSwitch(construct_HWL_Screen());
}

function taskViewDeleteBtn_Click(ID_In) {
    console.log("Task View Delete Button Clicked");
    console.log("Deleting Task with ID " + ID_In);
    // Find the Task with the ID
    for (let i = 0; i < homeworkTasks.length; i++) {
        if (homeworkTasks[i].id == ID_In) {
            console.log("Found Task with ID " + ID_In);
            console.log("Splicing from" + i + " to " + (i + 1));
            // Remove the Task from the Homework Tasks
            homeworkTasks.splice(i, i+1);
            break;
        }
    }
    // Update the Homework Task IDs
    for (let i = 0; i < homeworkTasks.length; i++) {
        homeworkTasks[i].id = i;
    }
    // Refresh the Homework Task View
    screenSwitch(construct_HWL_Screen());
}

function taskViewAddBtn_Click() {
    console.log("Task View Add Button Clicked");
    // Get the Task ID
    var taskID = homeworkTasks.length + 1;
    // Create a new Task Object
    const newTask = new TaskConstructor(taskID, "New Task!", "2025-1-1", 15, "This is a brand new task!");
    // Add the Task to the Homework Tasks
    homeworkTasks.push(newTask);
    // Refresh the Homework Task View
    screenSwitch(construct_HWL_Screen());
}

function HWT_Dropdown_Click(taskID) {
    console.log("Homework Timer Dropdown Clicked");
    console.log("Switching to Task View for Task with ID " + taskID);
    // Find the Task with the ID
    for (let i = 0; i < homeworkTasks.length; i++) {
        if (homeworkTasks[i].id == taskID) {
            console.log("Found Task with ID " + taskID);
            var HWT_Page = construct_HWT_Page_Screen(homeworkTasks[i])
            screenSwitch(HWT_Page);
            break;
        }
    }
}

// =============================================================================
// On Page Load
// =============================================================================

function onPageLoad() {
    console.log("Page Has Completely Loaded");
    screenSwitch(construct_HP_Screen());
}

onPageLoad();