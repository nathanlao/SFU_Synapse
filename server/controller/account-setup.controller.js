// gets all (unique) departments from Courses table in database for a given year and term
const getDepartments = (req, res) => {
    var deps = []
    res.status(200).json(deps)
}

// gets all (unique) courses from Courses table in database for a given year, term, and department
const getCourses = (req, res) => {
    var courses = []

    res.status(200).json(courses)
}

// gets all sections from Courses table in database for a given year, term, department, and course number
const getSections = (req, res) => {
    var sections = []

    res.status(200).json(sections)
}

// adds a user to a course group
const addToCourses = (req, res) => {
    // get list of selected courses from request body
    // for each item in the list call addCourseMember()
    res.status(200).json('Successfully added to your selected courses!')
}

// adds user to a group (course)
async function addCourseMember(userID, year, term, dep, num, section) {
    // query database to get group id for the course (given: year, term, dep, num, section)
    // addMember() from member.controller.js
}