const tasksData = [
  {
    "id": 1,
    "task": "Complete project proposal",
    "priority": "High",
    "deadline": "2024-04-03",
    "list": "Work",
    "notes": "Review client requirements before starting",
    "subtasks": [
      {"id": 101, "task": "Research competitors"},
      {"id": 102, "task": "Draft project outline"}
    ],
    "timeline": "Upcoming"
  },
  {
    "id": 2,
    "task": "Review and respond to emails",
    "priority": "Medium",
    "deadline": "2024-03-06",
    "list": "Work",
    "notes": "Check for urgent messages first",
    "subtasks": [
      {"id": 201, "task": "Reply to client inquiries"},
      {"id": 202, "task": "Organize inbox"}
    ],
    "timeline": "Today"
  },
  {
    "id": 3,
    "task": "Prepare presentation slides",
    "priority": "High",
    "deadline": "2024-04-07",
    "list": "Work",
    "notes": "Include visual aids for better engagement",
    "subtasks": [
      {"id": 301, "task": "Gather data"},
      {"id": 302, "task": "Create slide templates"}
    ],
    "timeline": "Upcoming"
  },
  {
    "id": 4,
    "task": "Attend team meeting",
    "priority": "Low",
    "deadline": "2024-03-06",
    "list": "Work",
    "notes": "",
    "subtasks": null,
    "timeline": "Today"
  },
  {
    "id": 5,
    "task": "Complete coding assignment",
    "priority": "High",
    "deadline": "2024-03-08",
    "list": "Work",
    "notes": "Refer to coding guidelines",
    "subtasks": [
      {"id": 501, "task": "Write unit tests"},
      {"id": 502, "task": "Optimize code"}
    ],
    "timeline": "Upcoming"
  },
  {
    "id": 6,
    "task": "Organize files and folders",
    "priority": "Medium",
    "deadline": '2024-03-06',
    "list": "Personal",
    "notes": "Clean up unused files",
    "subtasks": null,
    "timeline": "Today"
  },
  {
    "id": 7,
    "task": "Read a chapter of a book",
    "priority": "Low",
    "deadline": null,
    "list": "Personal",
    "notes": "Select a book from the reading list",
    "subtasks": null,
    "timeline": "Upcoming"
  },
  {
    "id": 8,
    "task": "Exercise for 30 minutes",
    "priority": "Medium",
    "deadline": "2024-03-06",
    "list": "Personal",
    "notes": "Choose a workout routine",
    "subtasks": null,
    "timeline": "Today"
  },
  {
    "id": 9,
    "task": "Update resume",
    "priority": "High",
    "deadline": "2024-03-07",
    "list": "Work",
    "notes": "Highlight recent achievements",
    "subtasks": [
      {"id": 901, "task": "Update work experience"},
      {"id": 902, "task": "Add new skills"}
    ],
    "timeline": "Upcoming"
  },
  {
    "id": 10,
    "task": "Plan weekend activities",
    "priority": "Low",
    "deadline": null,
    "list": "Personal",
    "notes": "Consider outdoor and indoor options",
    "subtasks": [
      {"id": 1001, "task": "Check weather forecast"},
      {"id": 1002, "task": "Invite friends"}
    ],
    "timeline": "Someday"
  }
]

const lists = [
  'Personal',
  'Work',
  'Grocery List'
]

const data = {
  tasks: tasksData,
  lists: lists
}

export default data;