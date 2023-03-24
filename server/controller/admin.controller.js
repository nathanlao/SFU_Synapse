const { resolve } = require('path')
const { isMapIterator, isSetIterator } = require('util/types')
const { v4: uuidv4 } = require('uuid')

const db = require('../db/connection.db').pool


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
    fetch(url)
        .then(result => result.json())
        .then(list => {
            // console.log(list)

            if(typeof list[Symbol.iterator] === 'function') {
                if(level === viewLevel.deps) {
                    res.status(200).json(list)
                }else {
        
                    Promise.all(list.map(async (item) => {
                        var targetDep = dep
                        var targetCourse = ''
                        var targetSection = ''

                        if(level === viewLevel.courses) {
                            targetCourse = item.value
                        }else if(level === viewLevel.sections) {
                            targetCourse = num
                            targetSection = item.value
                        }

                        const recordCountPromise = getRecordCount(year, term, targetDep, targetCourse, targetSection)
                        const subCountPromise = getSubCount(year, term, targetDep, targetCourse, targetSection)
                        return Promise.all([recordCountPromise, subCountPromise])
                            .then(([recordCount, subCount]) => {
                                item.status = status(recordCount, subCount)
                                // console.log(item.value + '>> record: ' + recordCount + ', sub: ' + subCount + ', status: ' + status(recordCount, subCount))
                                return status(recordCount, subCount)
                            })
                    })).then(() => {
                        console.log('Sending back the following list to the frontend.')
                        console.log(list)
                        res.status(200).json(list)
                    })
                }
            }else {
                res.status(404).json("No data found.")
            }
        })
}


// helper function: computes the status by comparing rec-count and sub-count
function status(rec, sub) {
    if(rec === 0) {
        // none added to courses
        return 0
    }else if(rec === sub) {
        // all added to courses
        return 1
    }else {
        // partially added to courses
        return 2
    }
}


async function getSubCount(year, term, dep, num, section) {
    return new Promise(function(resolve, reject) {
        if(section !== '') {
            resolve(1)
        }else if(num !== '') {
            var url = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${dep}/${num}`
            fetch(url)
                .then(result => result.json())
                .then(list => {
                    if(typeof list[Symbol.iterator] === 'function') {
                        resolve(list.length)
                    }
                    // else {
                    //     reject()
                    // }
                })
        }else {
            resolve(0)
        }
    })
}


async function getRecordCount(year, term, dep, num, section) {
    return new Promise(function(resolve, reject) {

        var query = ''
        var params = []
    
        if(section !== '') {
            query = 'SELECT * FROM Courses WHERE offered_year=? AND offered_term=? AND dep=? AND num=? AND section=?'
            params = [year, term, dep, num, section]
        }else if(num !== '') {
            query = 'SELECT * FROM Courses WHERE offered_year=? AND offered_term=? AND dep=? AND num=?'
            params = [year, term, dep, num]
        }else {
            // return 0
            resolve(0)
        }
    
        db.query(query, params, (err, data) => {
            if(err) {
                // return reject(err)
                reject(err)
                // return 0
            }
            resolve(data.length)
        })
    })
}

// adds a single section in a course
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

// adds all sections in a course
const addCourse = async (req, res) => {
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const num = req.body.num
    var url = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${dep}/${num}`
    
    // TODO: for each section, add to database
    console.log('GET ' + url)
    const result = await fetch(url);
    const list = await result.json()

    if(typeof list[Symbol.iterator] === 'function') {
        const size = list.length
        var i = 0

        for(let item of list) {

            // add to database
            const result = await addSection_(year, term, dep, num, item.value, item.title)

            if(result) {
                i++
                if(i === size) {
                    res.status(200).json("Successfully added all sections for " + term.toUpperCase() + year.toString() + ' ' + dep.toUpperCase() + num.toUpperCase())
                }
            }

            // i++
            // if(i === size) {
            //     res.status(200).json(list)
            // }
        }
    }
}

// deletes a single section in a course
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

// deletes all sections in a course
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

// test function, to be integrated into others when refining code
async function addSection_(year, term, dep, num, section, title) {
    if(year && term && dep && num && section && title) {
        return new Promise(function(resolve) {
            const id = uuidv4()
            const groupName = `${term.toUpperCase() + year} ${dep.toUpperCase() + num.toUpperCase()} ${section.toUpperCase()}`
            const query1 = 'INSERT INTO `Groups`(group_id, group_name, group_description) VALUES(?, ?, ?);'
            const query2 = 'INSERT INTO Courses(course_id, offered_year, offered_term, dep, num, section, title) VALUES(?, ?, ?, ?, ?, ?, ?);'
            var params = [id, groupName, title, id, year, term, dep, num, section, title]
                
            db.query((query1 + query2), params, (err, data) => {
                if(err) {
                    return reject(err)
                }
                resolve(data)
            })
        })
    }else {
        return undefined
    }
}


module.exports = { fetchCourseInfo, addSection, addCourse, deleteSection, deleteCourse }