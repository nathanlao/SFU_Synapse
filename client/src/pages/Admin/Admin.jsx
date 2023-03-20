import React, { useState } from "react"
import CourseListViewer from "../../components/CourseListViewer/CourseListViewer"
import './Admin.css'


export default function Admin() {
    // selector options
    const [years] = useState(() => {
        const time = new Date()
        const year = time.getFullYear()
        let years = []
        for(let i = 0; i < 3; i++) {
            years.push(year - i)
        }
        return years
    })
    const [terms] = useState([
        { value: 'fall', text: 'Fall' },
        { value: 'spring', text: 'Spring' },
        { value: 'summer', text: 'Summer' }
    ])


    // pass to listviewer component
    const [targetYear, setTargetYear] = useState(years[0])
    const [targetTerm, setTargetTerm] = useState(terms[0].value)


    function handleYearChange(event) {
        setTargetYear(event.target.value)
    }
    function handleTermChange(event) {
        setTargetTerm(event.target.value)
    }


    return (
        <div className="admin-dashboard">
            <h1>Manage courses</h1>
            <select name="academicYear" id="selectAcademicYear" onChange={handleYearChange}>
                {years.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <select name="academicTerm" id="selectAcademicTerm" onChange={handleTermChange}>
                {terms.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>

            <section className="workarea">
                <CourseListViewer year={targetYear} term={targetTerm}/>

                {/* <button type="button" id="aplyChanges">Apply changes</button> */}
            </section>
        </div>
    )
}