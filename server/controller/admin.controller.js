const db = require('../db/connection.db').pool
const { v4: uuidv4 } = require('uuid')


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


var courseCatalog = new Array()
var allQueries = ''


function queryString(year, term, dep, num, section, title) {
    return `INSERT INTO CourseCatalog (offered_year, offered_term, dep, num, section, title) VALUES ("${year}", "${term}", "${dep}", "${num}", "${section}", "${title}");`
}

const getCourseCatalog = async (req, res) => {
    console.log('getting courses catalog')
    const year = req.body.year
    const term = req.body.term
    

    const query = 'SELECT * FROM CourseCatalog WHERE offered_year=? AND offered_term=? ORDER BY dep, num, section LIMIT 100'// add order by

    db.query(query, [year, term], async (err, data) => {
        if(err) {
            res.status(500).json(err)
        }else {
            if(data.length > 0) {
                res.status(200).json(data)
            }else {
                // get from SFU Course REST API and store in database (then returned that)
                console.log("Data did not exist in database. Fetching data from API")

                const catalog = await getCourses(year, term)

                db.query(allQueries, (err, data) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json("Internal server error. Please try again later.")
                    }else {
                        db.query('SELECT * FROM CourseCatalog WHERE offered_year=? AND offered_term=? ORDER BY dep, num', [year, term], (err, data) => {
                            if(err) {
                                res.status(500).json("Internal server error. Please try again later.")
                            }else {
                                res.status(200).json(data)
                            }
                        })
                        // res.status(200).json(JSON.stringify(catalog))
                    }
                })
            }
        }
    })
}


async function getCourses(year, term) {
    try {
        // get departments
        const result1 = await fetch(`http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}`);
        const deps = await result1.json()

        if(typeof deps[Symbol.iterator] === 'function') {
            for(let dep of deps) {
                const result2 = await fetch(`http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${dep.value}`);
                const courses = await result2.json();
    
                if(typeof courses[Symbol.iterator] === 'function') {
                    for(let course of courses) {
        
                        const result3 = await fetch(`http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${dep.value}/${course.value}`);
                        const sections = await result3.json();
        
                        if(typeof sections[Symbol.iterator] === 'function') {
                            for(let section of sections) {
                                process.stdout.write('.')

                                courseCatalog.push(new Course(year, term, dep.value, course.value, section.value, section.title))
                                allQueries += queryString(year, term, dep.value, course.value, section.value, section.title)
                            }
                        }
                    }
                }
            }
        }
        return courseCatalog
    }catch(error) {
        return error.message
    }
}

const fetchCourseInfo = async (req, res) => {
    console.log('fetching course information')
    const year = req.body.year
    const term = req.body.term
    const dep = req.body.dep
    const section = req.body.section
    const extraPath1 = dep ? `/${dep}` : ''
    const extraPath2 = (extraPath1 !== '' && section) ? extraPath1 + `/${section}` : extraPath1
    
    console.log(`GET http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}${extraPath2}`)

    // fetching information
    const result = await fetch(`http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}${extraPath2}`);
    const deps = await result.json()

    if(typeof deps[Symbol.iterator] === 'function') {
        // var list = []
        // for(let dep of deps) {
        //     list.push(dep.value)
        // }
        // res.status(200).json(list)
        
        res.status(200).json(deps)
    }else {
        res.status(404).json("No data found.")
    }
}



module.exports = { getCourseCatalog, fetchCourseInfo }