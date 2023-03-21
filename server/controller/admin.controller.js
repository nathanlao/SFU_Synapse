const { isMapIterator, isSetIterator } = require('util/types')
const { v4: uuidv4 } = require('uuid')

const db = require('../db/connection.db').pool

class Course{
    constructor(year, term, dep, num, section, title) {
        this.offered_year = year
        this.offered_term = term
        this.dep = dep
        this.num = num
        this.section = section 
        this.title = title
    }
}

const viewLevel = { deps: 0, courses: 1, sections: 2 }

const fetchCourseInfo = async (req, res) => {
    console.log('fetching course information')
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const num = req.body.num
    var url = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}`
    var level = viewLevel.deps

    if(num) {
        // get sections given (year, term, dep, num)
        url += `/${dep}/${num}`
        level = viewLevel.sections
    }else if(dep) {
        // get courses given (year, term, dep)
        url += `/${dep}`
        level = viewLevel.courses
    }
    
    console.log(`GET ` + url)

    // fetching information
    const result = await fetch(url);
    const list = await result.json()

    if(typeof list[Symbol.iterator] === 'function') {

        const size = list.length
        var i = 0
        
        for(let item of list) {
            if(level !== viewLevel.deps) {
                var targetDep = ''
                var targetCourse = ''
                var targetSection = ''
                if(level === viewLevel.courses) {
                    targetDep = dep
                    targetCourse = item.value
                }else if(level === viewLevel.sections) {
                    targetDep = dep
                    targetCourse = num
                    targetSection = item.value
                }
                const recordCount = await countRecords(year, term, targetDep, targetCourse, targetSection)
                const totalCount = await getSubcount(year, term, targetDep, targetCourse, targetSection)

                if(recordCount === totalCount) {
                    // all added to courses
                    item.status = 1
                }else if(recordCount === 0) {
                    // none added to courses
                    item.status = 0
                }else {
                    // partially added to courses
                    item.status = 2
                }
            }

            i++
            
            if(i === size) {
                res.status(200).json(list)
            }
        }

    }else {
        res.status(404).json("No data found.")
    }
}


async function getSubcount(year, term, dep, num, section) {
    if(section !== '') {
        return 1
    }else if(num !== '') {
        var url = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${dep}/${num}`
        const result = await fetch(url);
        const list = await result.json()
    
        if(typeof list[Symbol.iterator] === 'function') {
            return list.length
        }else {
            return 0
        }
    }else {
        return 0
    }
}


async function countRecords(year, term, dep, num, section) {
    return new Promise(function(resolve) {

        var query = ''
        var params = []
    
        if(section !== '') {
            query = 'SELECT * FROM Courses WHERE offered_year=? AND offered_term=? AND dep=? AND num=? AND section=?'
            params = [year, term, dep, num, section]
        }else if(num !== '') {
            query = 'SELECT * FROM Courses WHERE offered_year=? AND offered_term=? AND dep=? AND num=?'
            params = [year, term, dep, num]
        }else {
            return 0
        }
    
            
        db.query(query, params, (err, data) => {
            if(err) {
                // return reject(err)
                return 0
            }
            resolve(data.length)
        })
    })
}

const addSection = (req, res) => {
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const num = req.body.num
    const section = req.body.section
    const title = req.body.title
    if(year && term && dep && num && section) {
        const entryID = uuidv4()
        const groupName = `${term.toUpperCase() + year} ${dep.toUpperCase() + num.toUpperCase()} ${section.toUpperCase()}`
        const query1 = 'INSERT INTO `Groups`(group_id, group_name, group_description) VALUES(?, ?, ?);'
        const query2 = 'INSERT INTO Courses(course_id, offered_year, offered_term, dep, num, section, title) VALUES(?, ?, ?, ?, ?, ?, ?);'

        db.query((query1 + query2), [
            entryID,
            groupName,
            title,
            entryID,
            year.toString(),
            term,
            dep,
            num,
            section,
            title
        ], (err, data) => {
            if(err) {
                console.log(err)
                res.status(500).json(err)
            }else {
                res.status(200).json(data)
                // res.status(200).json('Received request to add ' + year + term + ' ' + (dep + num) + ' ' + section)
            }
        })
    }else {
        res.status(400).json("Insufficient information. Please provide all parameters.")
    }
}
const addCourse = (req, res) => {
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const num = req.body.num
    res.status(200).json('Received request to add all sections of ' + year + term + ' ' + (dep + num))
    
    // TODO: for each section, add to database
}

const deleteSection = (req, res) => {
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const num = req.body.num
    const section = req.body.section

    if(year && term && dep && num && section) {
        const query = 'DELETE FROM `Groups` WHERE group_id IN (SELECT course_id FROM Courses WHERE offered_year=? AND offered_term=? AND dep=? AND num=? AND section=?)'

        db.query((query), [
            year.toString(),
            term,
            dep,
            num,
            section
        ], (err, data) => {
            if(err) {
                console.log(err)
                res.status(500).json(err)
            }else {
                res.status(200).json(data)
                // res.status(200).json('Received request to delete ' + year + term + ' ' + (dep + num) + ' ' + section)
            }
        })
    }else {
        res.status(400).json("Insufficient information. Please provide all parameters.")
    }
}

const deleteCourse = (req, res) => {
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const num = req.body.num
    // res.status(200).json('Received request to delete all sections of ' + year + term + ' ' + (dep + num))
    
    if(year && term && dep && num) {
        const query = 'DELETE FROM `Groups` WHERE group_id IN (SELECT course_id FROM Courses WHERE offered_year=? AND offered_term=? AND dep=? AND num=?)'

        db.query((query), [
            year.toString(),
            term,
            dep,
            num
        ], (err, data) => {
            if(err) {
                console.log(err)
                res.status(500).json(err)
            }else {
                res.status(200).json(data)
                // res.status(200).json('Received request to delete all sections of ' + year + term + ' ' + (dep + num) + ' ' + section)
            }
        })
    }else {
        res.status(400).json("Insufficient information. Please provide all parameters.")
    }
}


module.exports = { fetchCourseInfo, addSection, addCourse, deleteSection, deleteCourse }