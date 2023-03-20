import React, { useState } from "react"
import './Admin.css'


export default function Admin() {

    var semester = []
    const [targetSemester, setTargetSemester] = useState('')
    const [targetCourseCatalog, setCourseCatalog] = useState([])

    
    setSemesterOptions()

    
    
    function setSemesterOptions() {
        const time = new Date()
        const year = time.getFullYear()
        const month = time.getMonth() + 1

        if(month >= 9) {
            // fall
            semester.push({
                value: `fall${year}`,
                text: `Fall ${year}`
            })
            setTargetSemester(`Fall ${year}`)
        }
        if(month >= 5) {
            // summer
            semester.push({
                value: `summer${year}`,
                text: `Summer ${year}`
            })
            if(targetSemester === '') {
                setTargetSemester(`Summer ${year}`)
            }
        }
        // spring
        semester.push({
            value: `spring${year}`,
            text: `Spring ${year}`
        })
        if(targetSemester === '') {
            setTargetSemester(`Spring ${year}`)
        }
        
    
        for(let i = 1; i < 3; i++) {
            semester.push({
                value: `fall${year - i}`,
                text: `Fall ${year - i}`
            })
            semester.push({
                value: `summer${year - i}`,
                text: `Summer ${year - i}`
            })
            semester.push({
                value: `spring${year - i}`,
                text: `Spring ${year - i}`
            })
        }
        console.log(semester)
        console.log(targetSemester)
    }

    function handleSemesterChange(event) {
        const selector = document.getElementById('selectAcademicYear')
        
        console.log(selector)
        setTargetSemester(selector.options[selector.selectedIndex].text)

        const sem = event.target.value
        getCourses(sem.slice(0, sem.length - 4), sem.slice(-4))
    }

    function getCourses(term, year) {
        console.log(`get list of courses for ${term}-${year}`)

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year: year, term: term})
        }

        fetch('http://localhost:3000/admin', options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    setCourseCatalog(data)
                    console.log(data)
                })
            }else {
                // show error message in view
                console.log('failed')
            }
        })
    }


    return (
        <div className="admin-dashboard">
            <h1>Manage courses</h1>
            <select name="academicYear" id="selectAcademicYear" onChange={handleSemesterChange}>
                {semester.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>

            <section className="workarea">
                <h2>{targetSemester}</h2>
                <div className="course-listing">

                    <ul>
                        {targetCourseCatalog.map((course, index) => (
                            <li>
                                <input type="checkbox" key={course.id} id={course.id} />
                                <label htmlFor={course.id}>{course.dep.toUpperCase()}{course.num.toUpperCase()} {course.section}: {course.title}</label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="button" id="aplyChanges">Apply changes</button>
            </section>
        </div>
    )
}